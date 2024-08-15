import type { Viewfinder } from "scandit-web-datacapture-core";
import {
  AimerViewfinder,
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "scandit-web-datacapture-core";
import type { Barcode, BarcodeCaptureSession } from "scandit-web-datacapture-barcode";
import {
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureOverlayStyle,
  BarcodeCaptureSettings,
  Symbology,
  SymbologyDescription,
  barcodeCaptureLoader,
} from "scandit-web-datacapture-barcode";

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
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(pageElements.captureHost);

  // Show the progress bar
  view.showProgressBar();

  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  await configure({
    licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
    moduleLoaders: [barcodeCaptureLoader()],
  });

  // Hide the progress bar
  view.hideProgressBar();

  // Create the data capture context.
  const context: DataCaptureContext = await DataCaptureContext.create();

  await view.setContext(context);

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  await context.setFrameSource(Camera.default);

  // The barcode capturing process is configured through barcode capture settings,
  // they are then applied to the barcode capture instance that manages barcode recognition.
  const settings: BarcodeCaptureSettings = new BarcodeCaptureSettings();

  // Filter out duplicate barcodes for 1 second.
  settings.codeDuplicateFilter = 1000;

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  settings.enableSymbologies([
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.QR,
    Symbology.DataMatrix,
    Symbology.Code39,
    Symbology.Code128,
    Symbology.InterleavedTwoOfFive,
  ]);

  // Create a new barcode capture mode with the settings from above.
  const barcodeCapture = await BarcodeCapture.forContext(context, settings);
  // Disable the barcode capture mode until the camera is accessed.
  await barcodeCapture.setEnabled(false);

  // Register a listener to get informed whenever a new barcode got recognized.
  barcodeCapture.addListener({
    didScan: (barcodeCaptureMode: BarcodeCapture, session: BarcodeCaptureSession) => {
      // Restart the timer when activity is detected.
      startTimer();
      const barcode: Barcode | null = session.newlyRecognizedBarcode;
      if (!barcode) {
        return;
      }
      const symbology: SymbologyDescription = new SymbologyDescription(barcode.symbology);
      showResult(barcode.data!, symbology.readableName);
    },
  });

  // Add a control to be able to switch cameras.
  view.addControl(new CameraSwitchControl());

  // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  const barcodeCaptureOverlay: BarcodeCaptureOverlay = await BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
    barcodeCapture,
    view,
    BarcodeCaptureOverlayStyle.Frame
  );
  const viewfinder: Viewfinder = new AimerViewfinder();
  await barcodeCaptureOverlay.setViewfinder(viewfinder);

  // Switch the camera on to start streaming frames.
  await switchCameraOn();

  // Reset the timeout when clicking on the host element.
  pageElements.captureHost.addEventListener("click", () => {
    startTimer();
  });

  // Whenever the camera is switched on, we start a timer to switch it off after a while to save power.
  async function switchCameraOn(): Promise<void> {
    // Restore view visibility.
    pageElements.captureHost.style.opacity = "1";
    pageElements.tapToContinue.style.opacity = "0";
    pageElements.tapToContinue.style.pointerEvents = "none";
    // The camera is started asynchronously and will take some time to completely turn on.
    await getCurrentCamera().switchToDesiredState(FrameSourceState.On);
    await barcodeCapture.setEnabled(true);
    startTimer();
  }

  async function switchCameraOff(): Promise<void> {
    await barcodeCapture.setEnabled(false);
    // Show the "tap to continue" overlay.
    pageElements.captureHost.style.opacity = "0";
    pageElements.tapToContinue.style.opacity = "1";
    pageElements.tapToContinue.style.pointerEvents = "all";
    void getCurrentCamera().switchToDesiredState(FrameSourceState.Off);
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
  function getCurrentCamera(): Camera {
    return context.frameSource as Camera;
  }

  // Set up the clear button.
  pageElements.clearResults.addEventListener("click", () => {
    pageElements.results.innerHTML = "";
  });
  // Set up the tap to continue functionality.
  pageElements.tapToContinue.addEventListener("click", switchCameraOn);
}

run().catch((error: unknown) => {
  console.error(error);
  alert((error as Error).toString());
});
