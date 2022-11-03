import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCBarcode from "scandit-web-datacapture-barcode";

declare global {
  interface Window {
    continueScanning: () => void;
  }
}

let timer: number = 0;

// Main DOM elements in the page.
const pageElements = {
  captureHost: document.getElementById("data-capture-view") as HTMLElement,
  results: document.querySelector("#results") as HTMLElement,
  clearResults: document.querySelector("#clear") as HTMLElement,
  tapToContinue: document.querySelector("#tap-to-continue") as HTMLElement,
};

async function run(): Promise<void> {
  // Configure and load the library using your license key. The passed parameter represents the location of the wasm
  // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
  await SDCCore.configure({
    licenseKey: "YOUR_LICENSE_KEY_HERE",
    libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
    moduleLoaders: [SDCBarcode.barcodeCaptureLoader({ highEndBlurryRecognition: false })],
  });

  // Create the data capture context.
  const context: SDCCore.DataCaptureContext = await SDCCore.DataCaptureContext.create();

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  await context.setFrameSource(SDCCore.Camera.default);

  // The barcode capturing process is configured through barcode capture settings,
  // they are then applied to the barcode capture instance that manages barcode recognition.
  const settings: SDCBarcode.BarcodeCaptureSettings = new SDCBarcode.BarcodeCaptureSettings();

  // Filter out duplicate barcodes for 1 second.
  settings.codeDuplicateFilter = 1000;

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  settings.enableSymbologies([
    SDCBarcode.Symbology.EAN13UPCA,
    SDCBarcode.Symbology.EAN8,
    SDCBarcode.Symbology.UPCE,
    SDCBarcode.Symbology.QR,
    SDCBarcode.Symbology.DataMatrix,
    SDCBarcode.Symbology.Code39,
    SDCBarcode.Symbology.Code128,
    SDCBarcode.Symbology.InterleavedTwoOfFive,
  ]);

  // Create a new barcode capture mode with the settings from above.
  const barcodeCapture = await SDCBarcode.BarcodeCapture.forContext(context, settings);
  // Disable the barcode capture mode until the camera is accessed.
  await barcodeCapture.setEnabled(false);

  // Register a listener to get informed whenever a new barcode got recognized.
  barcodeCapture.addListener({
    didScan: (barcodeCaptureMode: SDCBarcode.BarcodeCapture, session: SDCBarcode.BarcodeCaptureSession) => {
      // Restart the timer when activity is detected.
      startTimer();
      const barcode: SDCBarcode.Barcode = session.newlyRecognizedBarcodes[0];
      const symbology: SDCBarcode.SymbologyDescription = new SDCBarcode.SymbologyDescription(barcode.symbology);
      showResult(barcode.data!, symbology.readableName);
    },
  });

  // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  const view = await SDCCore.DataCaptureView.forContext(context);

  // Connect the data capture view to the HTML element.
  view.connectToElement(pageElements.captureHost);

  // Add a control to be able to switch cameras.
  view.addControl(new SDCCore.CameraSwitchControl());

  // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  const barcodeCaptureOverlay: SDCBarcode.BarcodeCaptureOverlay =
    await SDCBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
      barcodeCapture,
      view,
      SDCBarcode.BarcodeCaptureOverlayStyle.Frame
    );
  const viewfinder: SDCCore.Viewfinder = new SDCCore.LaserlineViewfinder(SDCCore.LaserlineViewfinderStyle.Animated);
  await barcodeCaptureOverlay.setViewfinder(viewfinder);

  // Restrict the active scan area to the laser's area.
  // Note: you could visualize the scan area for debug purpose by setting the "shouldShowScanAreaGuides" property
  // on the overlay to true.
  const margins = new SDCCore.MarginsWithUnit(
    new SDCCore.NumberWithUnit(0, SDCCore.MeasureUnit.Fraction),
    new SDCCore.NumberWithUnit(0.4, SDCCore.MeasureUnit.Fraction),
    new SDCCore.NumberWithUnit(0, SDCCore.MeasureUnit.Fraction),
    new SDCCore.NumberWithUnit(0.4, SDCCore.MeasureUnit.Fraction)
  );
  view.scanAreaMargins = margins;

  // Switch the camera on to start streaming frames.
  await switchCameraOn();

  // Whenever the camera is switched on, we start a timer to switch it off after a while to save power.
  async function switchCameraOn(): Promise<void> {
    // Restore view visibility.
    pageElements.captureHost.style.opacity = "1";
    pageElements.tapToContinue.style.opacity = "0";
    pageElements.tapToContinue.style.pointerEvents = "none";
    // The camera is started asynchronously and will take some time to completely turn on.
    await getCurrentCamera().switchToDesiredState(SDCCore.FrameSourceState.On);
    await barcodeCapture.setEnabled(true);
    startTimer();
  }

  async function switchCameraOff(): Promise<void> {
    await barcodeCapture.setEnabled(false);
    // Show the "tap to continue" overlay.
    pageElements.captureHost.style.opacity = "0";
    pageElements.tapToContinue.style.opacity = "1";
    pageElements.tapToContinue.style.pointerEvents = "all";
    void getCurrentCamera().switchToDesiredState(SDCCore.FrameSourceState.Off);
  }

  function startTimer(): void {
    clearTimeout(timer);
    timer = window.setTimeout(switchCameraOff, 10000);
  }

  function showResult(data: string, symbology: string): void {
    const resultElement = document.createElement("div");
    resultElement.className = "result-row";
    resultElement.innerHTML = `
      <div class="data-text"></div>
      <div class="symbology"></div>
    `;
    resultElement.querySelector(".data-text")!.textContent = data;
    resultElement.querySelector(".symbology")!.textContent = symbology;
    pageElements.results.prepend(resultElement);
  }

  // Get the current camera from the context.
  function getCurrentCamera(): SDCCore.Camera {
    return context.frameSource as SDCCore.Camera;
  }

  // Set up the clear button.
  pageElements.clearResults.addEventListener("click", () => {
    pageElements.results.innerHTML = "";
  });
  // Set up the tap to continue functionality.
  pageElements.tapToContinue.addEventListener("click", switchCameraOn);
}

run().catch((error) => {
  console.error(error);
  alert(error);
});
