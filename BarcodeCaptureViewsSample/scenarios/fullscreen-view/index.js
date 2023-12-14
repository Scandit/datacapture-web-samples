import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCBarcode from "scandit-web-datacapture-barcode";
async function run() {
    // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
    const view = new SDCCore.DataCaptureView();
    // Connect the data capture view to the HTML element.
    view.connectToElement(document.getElementById("data-capture-view"));
    // Show the progress bar
    view.showProgressBar();
    // Set the progress bar message
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
    // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
    // camera preview. The view must be connected to the data capture context.
    await view.setContext(context);
    // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
    // default and must be turned on to start streaming frames to the data capture context for recognition.
    const camera = SDCCore.Camera.default;
    await context.setFrameSource(camera);
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
        didScan: async (barcodeCaptureMode, session) => {
            const barcode = session.newlyRecognizedBarcodes[0];
            const symbology = new SDCBarcode.SymbologyDescription(barcode.symbology);
            // Hide the viewfinder.
            await barcodeCaptureOverlay.setViewfinder(null);
            // Disable the capture of barcodes until the user closes the displayed result.
            await barcodeCapture.setEnabled(false);
            showResult(`${symbology.readableName}: ${barcode.data}\nSymbol count: ${barcode.symbolCount}`);
        },
    });
    // Add a control to be able to switch cameras.
    view.addControl(new SDCCore.CameraSwitchControl());
    // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
    // the video preview. This is optional, but recommended for better visual feedback.
    const barcodeCaptureOverlay = await SDCBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(barcodeCapture, view, SDCBarcode.BarcodeCaptureOverlayStyle.Frame);
    const viewfinder = new SDCCore.RectangularViewfinder(SDCCore.RectangularViewfinderStyle.Square, SDCCore.RectangularViewfinderLineStyle.Light);
    await barcodeCaptureOverlay.setViewfinder(viewfinder);
    // Switch the camera on to start streaming frames.
    await camera.switchToDesiredState(SDCCore.FrameSourceState.On);
    await barcodeCapture.setEnabled(true);
    function showResult(result) {
        const resultElement = document.createElement("div");
        resultElement.className = "result";
        // eslint-disable-next-line no-unsanitized/property
        resultElement.innerHTML = `
      <p class="result-header">Scan Results</p>
      <p class="result-text">${result}</p>
      <button onclick="continueScanning()">OK</button>
    `;
        document.querySelector("#data-capture-view").append(resultElement);
    }
    window.continueScanning = async function continueScanning() {
        for (const r of document.querySelectorAll(".result"))
            r.remove();
        await barcodeCapture.setEnabled(true);
        await barcodeCaptureOverlay.setViewfinder(viewfinder);
    };
}
run().catch((error) => {
    console.error(error);
    alert(error);
});
