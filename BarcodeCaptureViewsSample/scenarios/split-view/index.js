import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCBarcode from "scandit-web-datacapture-barcode";
let timer = 0;
// Main DOM elements in the page.
const pageElements = {
    captureHost: document.getElementById("data-capture-view"),
    results: document.querySelector("#results"),
    clearResults: document.querySelector("#clear"),
    tapToContinue: document.querySelector("#tap-to-continue"),
};
async function run() {
    // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
    const view = new SDCCore.DataCaptureView();
    // Connect the data capture view to the HTML element.
    view.connectToElement(pageElements.captureHost);
    // Show the progress bar
    view.showProgressBar();
    // Set progress bar message
    view.setProgressBarMessage("Loading...");
    // There is a Scandit sample license key set below here.
    // This license key is enabled for sample evaluation only.
    // If you want to build your own application, get your license key by signing up for a trial at https://ssl.scandit.com/dashboard/sign-up?p=test
    // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
    // You must `await` the returned promise to be able to continue.
    await SDCCore.configure({
        licenseKey: "AW7z5wVbIbJtEL1x2i7B3/cet/ClBNVHZTfPtvJ2n3L/LY6/FDbqtzYItFO0DmhIJ2JP1Vxu7po1f74HqF9UTtRB/1DHY+CJdTiq/6dQ8vFgd9rzwlVfSYFgWPp9fK5nVUmnHyt9W5oRMcXObjYeC7Q/FO0NA0yRHUEtt/aBpnv/AxYTKG8wyVNqZKMJn+bhz/CFbH5pjtdj2aE85TlPGfQK4sBP/K2ONcx2ndbmY82SOquLlcZ55uAFuj4yCuQEI6iuokblpDVsql+vDiw3XMOmqwbmuGnAuCtGbtjyyWyQCKeiKWtZzdy+Cz7NnW/yRdwKY1xBjkaMA+A+NWeBxp9O2Ou6dBCPsRPg0Nqfv92sbv050dQc/+xccvEXWSi8UnD+AQoKp5V3gR/Yae/5+4fII9X3Tqjf/aNvXDw3m7YDQ+b+IJnkzLN5EgwGnzUmI8z3qMx9xcqhkWwBE/SSuIP47tBp5xwz02kN6qb+vZc/1p5EUQ/VtGVBfD1e+5Dii56BHsfPId/JpKpGUX1FFAYuT1uEbf7xLREDtFobn05tDxYPLrCa0hciRwCdWxHbUnYR1BF3zQQHih5Dd5qGyA5yKsgCsg7Na+9gC8O6hxpWlB4SbIFMEDluvJ+0v0ww5nnP2PWAO7v4k+Sgn7cQa7gDhQNee+pfuDvUlprUufio+dUmOUYNbn2TVwRVATmPx4U+p8Acg+Ohj85bSwPk+cNoq3Te6N0Ts5JnwrjCvVq6yrfbqyGFbgIhJiSxtgiZOfMZu8KoCvBfIUFE2A5WlNNaMZmQAtPozR31iX/Z2LuCIBhkFXGdd9CW/YPKhs8m25jlbOKnl0DWiBnM",
        libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
        moduleLoaders: [SDCBarcode.barcodeCaptureLoader()],
    });
    // Hide the progress bar
    view.hideProgressBar();
    // Create the data capture context.
    const context = await SDCCore.DataCaptureContext.create();
    await view.setContext(context);
    // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
    // default and must be turned on to start streaming frames to the data capture context for recognition.
    await context.setFrameSource(SDCCore.Camera.default);
    // The barcode capturing process is configured through barcode capture settings,
    // they are then applied to the barcode capture instance that manages barcode recognition.
    const settings = new SDCBarcode.BarcodeCaptureSettings();
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
        didScan: (barcodeCaptureMode, session) => {
            // Restart the timer when activity is detected.
            startTimer();
            const barcode = session.newlyRecognizedBarcodes[0];
            const symbology = new SDCBarcode.SymbologyDescription(barcode.symbology);
            showResult(barcode.data, symbology.readableName);
        },
    });
    // Add a control to be able to switch cameras.
    view.addControl(new SDCCore.CameraSwitchControl());
    // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
    // the video preview. This is optional, but recommended for better visual feedback.
    const barcodeCaptureOverlay = await SDCBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(barcodeCapture, view, SDCBarcode.BarcodeCaptureOverlayStyle.Frame);
    const viewfinder = new SDCCore.LaserlineViewfinder(SDCCore.LaserlineViewfinderStyle.Animated);
    await barcodeCaptureOverlay.setViewfinder(viewfinder);
    // Restrict the active scan area to the laser's area.
    // Note: you could visualize the scan area for debug purpose by setting the "shouldShowScanAreaGuides" property
    // on the overlay to true.
    const margins = new SDCCore.MarginsWithUnit(new SDCCore.NumberWithUnit(0, SDCCore.MeasureUnit.Fraction), new SDCCore.NumberWithUnit(0.4, SDCCore.MeasureUnit.Fraction), new SDCCore.NumberWithUnit(0, SDCCore.MeasureUnit.Fraction), new SDCCore.NumberWithUnit(0.4, SDCCore.MeasureUnit.Fraction));
    view.scanAreaMargins = margins;
    // Switch the camera on to start streaming frames.
    await switchCameraOn();
    // Reset the timeout when clicking on the host element.
    pageElements.captureHost.addEventListener("click", () => {
        startTimer();
    });
    // Whenever the camera is switched on, we start a timer to switch it off after a while to save power.
    async function switchCameraOn() {
        // Restore view visibility.
        pageElements.captureHost.style.opacity = "1";
        pageElements.tapToContinue.style.opacity = "0";
        pageElements.tapToContinue.style.pointerEvents = "none";
        // The camera is started asynchronously and will take some time to completely turn on.
        await getCurrentCamera().switchToDesiredState(SDCCore.FrameSourceState.On);
        await barcodeCapture.setEnabled(true);
        startTimer();
    }
    async function switchCameraOff() {
        await barcodeCapture.setEnabled(false);
        // Show the "tap to continue" overlay.
        pageElements.captureHost.style.opacity = "0";
        pageElements.tapToContinue.style.opacity = "1";
        pageElements.tapToContinue.style.pointerEvents = "all";
        void getCurrentCamera().switchToDesiredState(SDCCore.FrameSourceState.Off);
    }
    function startTimer() {
        clearTimeout(timer);
        timer = window.setTimeout(switchCameraOff, 10000);
    }
    function showResult(data, symbology) {
        const resultElement = document.createElement("div");
        resultElement.className = "result-row";
        resultElement.innerHTML = `
      <div class="data-text"></div>
      <div class="symbology"></div>
    `;
        resultElement.querySelector(".data-text").textContent = data;
        resultElement.querySelector(".symbology").textContent = symbology;
        pageElements.results.prepend(resultElement);
    }
    // Get the current camera from the context.
    function getCurrentCamera() {
        return context.frameSource;
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