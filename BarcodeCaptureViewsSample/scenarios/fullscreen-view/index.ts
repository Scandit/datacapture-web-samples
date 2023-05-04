import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCBarcode from "scandit-web-datacapture-barcode";

declare global {
  interface Window {
    continueScanning: () => void;
  }
}

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view = new SDCCore.DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(document.getElementById("data-capture-view")!);

  // Show the progress bar
  view.showProgressBar();

  // Set the progress bar message
  view.setProgressBarMessage("Loading...");

  // Configure and load the library using your license key. The passed parameter represents the location of the wasm
  // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
  await SDCCore.configure({
    licenseKey: "YOUR_LICENSE_KEY_HERE",
    libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
    moduleLoaders: [SDCBarcode.barcodeCaptureLoader()],
  });

  // Hide the progress bar
  view.hideProgressBar();

  // Create the data capture context.
  const context: SDCCore.DataCaptureContext = await SDCCore.DataCaptureContext.create();

  // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  await view.setContext(context);

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  const camera: SDCCore.Camera = SDCCore.Camera.default;
  await context.setFrameSource(camera);

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
    didScan: async (barcodeCaptureMode: SDCBarcode.BarcodeCapture, session: SDCBarcode.BarcodeCaptureSession) => {
      const barcode: SDCBarcode.Barcode = session.newlyRecognizedBarcodes[0];
      const symbology: SDCBarcode.SymbologyDescription = new SDCBarcode.SymbologyDescription(barcode.symbology);
      // Hide the viewfinder.
      await barcodeCaptureOverlay.setViewfinder(null);
      // Disable the capture of barcodes until the user closes the displayed result.
      await barcodeCapture.setEnabled(false);
      showResult(`${barcode.data!} (${symbology.readableName})`);
    },
  });

  // Add a control to be able to switch cameras.
  view.addControl(new SDCCore.CameraSwitchControl());

  // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  const barcodeCaptureOverlay = await SDCBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
    barcodeCapture,
    view,
    SDCBarcode.BarcodeCaptureOverlayStyle.Frame
  );
  const viewfinder: SDCCore.Viewfinder = new SDCCore.RectangularViewfinder(
    SDCCore.RectangularViewfinderStyle.Square,
    SDCCore.RectangularViewfinderLineStyle.Light
  );
  await barcodeCaptureOverlay.setViewfinder(viewfinder);

  // Switch the camera on to start streaming frames.
  await camera.switchToDesiredState(SDCCore.FrameSourceState.On);
  await barcodeCapture.setEnabled(true);

  function showResult(result: string): void {
    const resultElement = document.createElement("div");
    resultElement.className = "result";
    resultElement.innerHTML = `<p class="result-text"></p><button onclick="continueScanning()">OK</button>`;
    resultElement.querySelector(".result-text")!.textContent = result;
    document.querySelector("#data-capture-view")!.append(resultElement);
  }

  window.continueScanning = async function continueScanning() {
    for (const r of document.querySelectorAll(".result")!) r.remove();
    await barcodeCapture.setEnabled(true);
    await barcodeCaptureOverlay.setViewfinder(viewfinder);
  };
}

run().catch((error) => {
  console.error(error);
  alert(error);
});
