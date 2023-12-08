import type { Viewfinder } from "scandit-web-datacapture-core";
import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  LaserlineViewfinder,
  LaserlineViewfinderStyle,
  MarginsWithUnit,
  MeasureUnit,
  NumberWithUnit,
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

  // There is a Scandit sample license key set below here.
  // This license key is enabled for sample evaluation only.
  // If you want to build your own application, get your license key by signing up for a trial at https://ssl.scandit.com/dashboard/sign-up?p=test
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  await configure({
    licenseKey: "AW7z5wVbIbJtEL1x2i7B3/cet/ClBNVHZTfPtvJ2n3L/LY6/FDbqtzYItFO0DmhIJ2JP1Vxu7po1f74HqF9UTtRB/1DHY+CJdTiq/6dQ8vFgd9rzwlVfSYFgWPp9fK5nVUmnHyt9W5oRMcXObjYeC7Q/FO0NA0yRHUEtt/aBpnv/AxYTKG8wyVNqZKMJn+bhz/CFbH5pjtdj2aE85TlPGfQK4sBP/K2ONcx2ndbmY82SOquLlcZ55uAFuj4yCuQEI6iuokblpDVsql+vDiw3XMOmqwbmuGnAuCtGbtjyyWyQCKeiKWtZzdy+Cz7NnW/yRdwKY1xBjkaMA+A+NWeBxp9O2Ou6dBCPsRPg0Nqfv92sbv050dQc/+xccvEXWSi8UnD+AQoKp5V3gR/Yae/5+4fII9X3Tqjf/aNvXDw3m7YDQ+b+IJnkzLN5EgwGnzUmI8z3qMx9xcqhkWwBE/SSuIP47tBp5xwz02kN6qb+vZc/1p5EUQ/VtGVBfD1e+5Dii56BHsfPId/JpKpGUX1FFAYuT1uEbf7xLREDtFobn05tDxYPLrCa0hciRwCdWxHbUnYR1BF3zQQHih5Dd5qGyA5yKsgCsg7Na+9gC8O6hxpWlB4SbIFMEDluvJ+0v0ww5nnP2PWAO7v4k+Sgn7cQa7gDhQNee+pfuDvUlprUufio+dUmOUYNbn2TVwRVATmPx4U+p8Acg+Ohj85bSwPk+cNoq3Te6N0Ts5JnwrjCvVq6yrfbqyGFbgIhJiSxtgiZOfMZu8KoCvBfIUFE2A5WlNNaMZmQAtPozR31iX/Z2LuCIBhkFXGdd9CW/YPKhs8m25jlbOKnl0DWiBnM",
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
      const barcode: Barcode = session.newlyRecognizedBarcodes[0];
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
  const viewfinder: Viewfinder = new LaserlineViewfinder(LaserlineViewfinderStyle.Animated);
  await barcodeCaptureOverlay.setViewfinder(viewfinder);

  // Restrict the active scan area to the laser's area.
  // Note: you could visualize the scan area for debug purpose by setting the "shouldShowScanAreaGuides" property
  // on the overlay to true.
  const margins = new MarginsWithUnit(
    new NumberWithUnit(0, MeasureUnit.Fraction),
    new NumberWithUnit(0.4, MeasureUnit.Fraction),
    new NumberWithUnit(0, MeasureUnit.Fraction),
    new NumberWithUnit(0.4, MeasureUnit.Fraction)
  );
  view.scanAreaMargins = margins;

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

run().catch((error) => {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
});
