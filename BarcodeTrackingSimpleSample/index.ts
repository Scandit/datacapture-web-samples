import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "scandit-web-datacapture-core";
import type { BarcodeTrackingSession, SymbologySettings, TrackedBarcode } from "scandit-web-datacapture-barcode";
import {
  BarcodeTracking,
  BarcodeTrackingBasicOverlay,
  BarcodeTrackingBasicOverlayStyle,
  BarcodeTrackingScenario,
  BarcodeTrackingSettings,
  Symbology,
  SymbologyDescription,
  barcodeCaptureLoader,
} from "scandit-web-datacapture-barcode";

function removeAllChildNodes(parent: Node): void {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(document.getElementById("data-capture-view")!);

  // Show the loading layer
  view.showProgressBar();
  // There is a Scandit sample license key set below here.
  // This license key is enabled for sample evaluation only.
  // If you want to build your own application, get your license key by signing up for a trial at https://ssl.scandit.com/dashboard/sign-up?p=test
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  await configure({
    licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [barcodeCaptureLoader({ highEndBlurryRecognition: false })],
  });

  // Set the progress bar to be in an indeterminate state
  view.setProgressBarPercentage(null);
  view.setProgressBarMessage("Accessing Camera...");

  // Create the data capture context.
  const context: DataCaptureContext = await DataCaptureContext.create();

  // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  await view.setContext(context);

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  const camera: Camera = Camera.default;
  const cameraSettings = BarcodeTracking.recommendedCameraSettings;
  await camera.applySettings(cameraSettings);
  await context.setFrameSource(camera);

  // The barcode tracking process is configured through barcode tracking settings,
  // they are then applied to the barcode tracking instance that manages barcode recognition.
  // TODO: temporary, the final variation should be the one using scenario A
  // const settings: BarcodeTrackingSettings = new BarcodeTrackingSettings();
  const settings: BarcodeTrackingSettings = BarcodeTrackingSettings.forScenario(BarcodeTrackingScenario.A);

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

  // Some linear/1D barcode symbologies allow you to encode variable-length data. By default, the Scandit
  // Data Capture SDK only scans barcodes in a certain length range. If your application requires scanning of one
  // of these symbologies, and the length is falling outside the default range, you may need to adjust the "active
  // symbol counts" for this symbology. This is shown in the following few lines of code for one of the
  // variable-length symbologies.
  const symbologySettings: SymbologySettings = settings.settingsForSymbology(Symbology.Code39);
  symbologySettings.activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  // Create a new barcode tracking mode with the settings from above.
  const barcodeTracking = await BarcodeTracking.forContext(context, settings);
  // Disable the barcode tracking mode until the camera is accessed.
  await barcodeTracking.setEnabled(true);

  // Register a listener to get updates about tracked barcodes.
  barcodeTracking.addListener({
    didUpdateSession: (barcodeTrackingMode: BarcodeTracking, session: BarcodeTrackingSession) => {
      const trackedBarcodes: TrackedBarcode[] = Object.values(session.trackedBarcodes);
      const addedTrackedBarcodes: TrackedBarcode[] = Object.values(session.addedTrackedBarcodes);
      const removedTrackedBarcodes: string[] = Object.values(session.removedTrackedBarcodes);
      const updatedTrackedBarcodes: TrackedBarcode[] = Object.values(session.updatedTrackedBarcodes);

      const barcodeResultContainer = document.querySelector("#result-text")!;
      removeAllChildNodes(barcodeResultContainer);
      const fragment = document.createDocumentFragment();
      for (const trackedBarcode of trackedBarcodes) {
        const { barcode, identifier } = trackedBarcode;
        const symbology: SymbologyDescription = new SymbologyDescription(barcode.symbology);
        const li = document.createElement("li");
        li.id = `${identifier}`;
        li.textContent = `${barcode.data ?? "???"} (${symbology.readableName})`;
        fragment.append(li);
      }
      barcodeResultContainer.append(fragment);

      if (addedTrackedBarcodes.length > 0) {
        console.log("Added tracked barcodes:", addedTrackedBarcodes);
      }
      if (removedTrackedBarcodes.length > 0) {
        console.log("Removed tracked barcodes:", removedTrackedBarcodes);
      }
      if (updatedTrackedBarcodes.length > 0) {
        console.log("Updated tracked barcodes:", updatedTrackedBarcodes);
      }
    },
  });

  // Add a control to be able to switch cameras.
  view.addControl(new CameraSwitchControl());

  // Add a barcode tracking overlay to the data capture view to render the location of tracked barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  await BarcodeTrackingBasicOverlay.withBarcodeTrackingForViewWithStyle(
    barcodeTracking,
    view,
    BarcodeTrackingBasicOverlayStyle.Frame
  );

  // Switch the camera on to start streaming frames.
  // The camera is started asynchronously and will take some time to completely turn on.
  await camera.switchToDesiredState(FrameSourceState.On);
  await barcodeTracking.setEnabled(true);
  view.hideProgressBar();
}

run().catch((error: unknown) => {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
});
