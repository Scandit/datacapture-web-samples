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
        licenseKey: "AWHjFzlFHa+fLq/kfS8GCBU/hT60NkQeVGQOWhhtRVcDZxJfsD0OY9NK0YErLuxTtTKLC1BLdrvDdsJ1dnxmcx9fDIeeaQlxawtkiq1pmEFxHOvYa3emcbAfOeiwbFPtQEWCWvdc95KoIFxAuDiYcfccdywzH2KONgwmnV9cEcX11FhIPLtX74RLua7VkOukFfNTOGExxhiCq96qZnzGgrgViuagpL0ekK6xv8K4bYt7lVkxloUMM6dFRSZ4aummJ2Q1uZNR78kSGCpCn/uJjaf/5lyNbYWpnxYvsYRPI7jOFYZykI0nIjhjt/ncukCEsz4BQLAh5hp1qocvQ2+dw3ADD8LJLXcnX7JaCOKV5cfHEHGSLR4moTxNtxPXdUNlM5w75iHZub5BsIfkJCknKrLn5oJ15k5Rx4/JnFj11tGLqtfRs+jdtXSGxAb86BxwPM1mEBO/Va1yV//CGku5UWR5MwspCf7pl8OUH7frkCtV4kDB6y5jusSMSIEGnKCLd2sWKE04mAURrpWt8pgsIB89xXPPTgPh1C+nAeMuuEN3dPYAJYrJKvy44w130JrUvxWLcTM1oFVWikC6CluLC7WGgRhZCew0eROnv9neITolB6Gmy04dlF0euA595dJcw2lLTwwxEydGp5gGIIDtofviho7JdHtPrMer/Ptz1/LOVeF55OY9eg8z1Lq2CkZf6cgWZBPa1uakuZzxWXZUprJMdTquhInmqP4ELLxGXhv+CXoT2n0p022+wyiWAXatmhvcK+n2uCWX30SL0Sri1qPmf6Ldtgqj2aFEMLM+LouJg6Ukv0PKUTXlgPW7L0vYrNGtPjvRlaR7Nwph",
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
