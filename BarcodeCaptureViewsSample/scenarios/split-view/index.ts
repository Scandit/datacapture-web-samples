import * as Scandit from "scandit-web-datacapture-barcode";
import {
  DataCaptureContext,
  Camera,
  BarcodeCaptureSettings,
  BarcodeCapture,
  BarcodeCaptureSession,
  Barcode,
  SymbologyDescription,
  BarcodeCaptureOverlay,
  Viewfinder,
} from "scandit-web-datacapture-barcode";

declare global {
  interface Window {
    continueScanning: any;
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

async function run() {
  // Configure and load the library using your license key. The passed parameter represents the location of the wasm
  // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
  await Scandit.configure("YOUR_LICENSE_KEY_HERE", {
    libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
  });

  // Create the data capture context.
  const context: DataCaptureContext = Scandit.DataCaptureContext.create();

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  context.setFrameSource(Scandit.Camera.default);

  // The barcode capturing process is configured through barcode capture settings,
  // they are then applied to the barcode capture instance that manages barcode recognition.
  const settings: BarcodeCaptureSettings = new Scandit.BarcodeCaptureSettings();

  // Filter out duplicate barcodes for 1 second.
  settings.codeDuplicateFilter = 1000;

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  settings.enableSymbologies([
    Scandit.Symbology.EAN13UPCA,
    Scandit.Symbology.EAN8,
    Scandit.Symbology.UPCE,
    Scandit.Symbology.QR,
    Scandit.Symbology.DataMatrix,
    Scandit.Symbology.Code39,
    Scandit.Symbology.Code128,
    Scandit.Symbology.InterleavedTwoOfFive,
  ]);

  // Create a new barcode capture mode with the settings from above.
  const barcodeCapture = Scandit.BarcodeCapture.forContext(context, settings);
  // Disable the barcode capture mode until the camera is accessed.
  barcodeCapture.isEnabled = false;

  // Register a listener to get informed whenever a new barcode got recognized.
  barcodeCapture.addListener({
    didScan: (barcodeCapture: BarcodeCapture, session: BarcodeCaptureSession) => {
      // Restart the timer when activity is detected.
      startTimer();
      const barcode: Barcode = session.newlyRecognizedBarcodes[0];
      const symbology: SymbologyDescription = new Scandit.SymbologyDescription(barcode.symbology);
      showResult(barcode.data!, symbology.readableName);
    },
  });

  // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  const view = Scandit.DataCaptureView.forContext(context);

  // Connect the data capture view to the HTML element.
  view.connectToElement(pageElements.captureHost);

  // Add a control to be able to switch cameras.
  view.addControl(new Scandit.CameraSwitchControl());

  // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  const barcodeCaptureOverlay: BarcodeCaptureOverlay = Scandit.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
    barcodeCapture,
    view,
    Scandit.BarcodeCaptureOverlayStyle.Frame
  );
  const viewfinder: Viewfinder = new Scandit.LaserlineViewfinder(Scandit.LaserlineViewfinderStyle.Animated);
  barcodeCaptureOverlay.viewfinder = viewfinder;

  // Restrict the active scan area to the laser's area.
  // Note: you could visualize the scan area for debug purpose by setting the "shouldShowScanAreaGuides" property
  // on the overlay to true.
  const margins = new Scandit.MarginsWithUnit(
    new Scandit.NumberWithUnit(0, Scandit.MeasureUnit.Fraction),
    new Scandit.NumberWithUnit(0.4, Scandit.MeasureUnit.Fraction),
    new Scandit.NumberWithUnit(0, Scandit.MeasureUnit.Fraction),
    new Scandit.NumberWithUnit(0.4, Scandit.MeasureUnit.Fraction)
  );
  view.scanAreaMargins = margins;

  // Switch the camera on to start streaming frames.
  await switchCameraOn();

  // Whenever the camera is switched on, we start a timer to switch it off after a while to save power.
  async function switchCameraOn() {
    // Restore view visibility.
    pageElements.captureHost.style.opacity = "1";
    pageElements.tapToContinue.style.opacity = "0";
    pageElements.tapToContinue.style.pointerEvents = "none";
    // The camera is started asynchronously and will take some time to completely turn on.
    await getCurrentCamera().switchToDesiredState(Scandit.FrameSourceState.On);
    barcodeCapture.isEnabled = true;
    startTimer();
  }

  function switchCameraOff() {
    barcodeCapture.isEnabled = false;
    // Show the "tap to continue" overlay.
    pageElements.captureHost.style.opacity = "0";
    pageElements.tapToContinue.style.opacity = "1";
    pageElements.tapToContinue.style.pointerEvents = "all";
    getCurrentCamera().switchToDesiredState(Scandit.FrameSourceState.Off);
  }

  function startTimer() {
    clearTimeout(timer);
    timer = window.setTimeout(switchCameraOff, 10000);
  }

  function showResult(data: string, symbology: string) {
    const resultElement = document.createElement("div");
    resultElement.className = "result-row";
    resultElement.innerHTML = `
      <div>${data}</div>
      <div class="symbology">${symbology}</div>
    `;
    pageElements.results.prepend(resultElement);
  }

  // Get the current camera from the context.
  function getCurrentCamera() {
    return context.frameSource as Camera;
  }

  // Set up the clear button.
  pageElements.clearResults.addEventListener("click", () => {
    pageElements.results.innerHTML = "";
  });
  // Set up the tap to continue functionality.
  pageElements.tapToContinue.addEventListener("click", switchCameraOn);
}

run().catch((e) => alert(e));
