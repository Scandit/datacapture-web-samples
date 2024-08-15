import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "scandit-web-datacapture-core";
import type { BarcodeTrackingSession, TrackedBarcode } from "scandit-web-datacapture-barcode";
import {
  BarcodeTracking,
  BarcodeTrackingBasicOverlay,
  BarcodeTrackingBasicOverlayStyle,
  BarcodeTrackingSettings,
  Symbology,
  SymbologyDescription,
  barcodeCaptureLoader,
} from "scandit-web-datacapture-barcode";

import { SdcUiButton } from "./components/sdcUiButton.js";
import { SdcUiDrawerBottom } from "./components/sdcUiDrawerBottom.js";
import { SdcUiBarcodeList, SdcUiBarcodeListItem } from "./components/sdcUiBarcodeList.js";
import { define, removeAllChildNodes } from "./utils.js";

async function run(): Promise<void> {
  define({
    "sdc-ui-button": SdcUiButton,
    "sdc-ui-drawer-bottom": SdcUiDrawerBottom,
    "sdc-ui-barcode-list": SdcUiBarcodeList,
    "sdc-ui-barcode-list-item": SdcUiBarcodeListItem,
  });
  document.body.classList.add("componentsDefined");

  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view: DataCaptureView = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(document.getElementById("data-capture-view")!);

  // Show the loading layer
  view.showProgressBar();
  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
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
  const settings: BarcodeTrackingSettings = new BarcodeTrackingSettings();

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  settings.enableSymbologies([
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.Code39,
    Symbology.Code128,
  ]);

  // Create a new barcode tracking mode with the settings from above.
  const barcodeTracking = await BarcodeTracking.forContext(context, settings);
  // Disable the barcode tracking mode until the camera is accessed.
  await barcodeTracking.setEnabled(true);

  let trackedBarcodes: Record<string, TrackedBarcode>;
  // Register a listener to get updates about tracked barcodes.
  barcodeTracking.addListener({
    didUpdateSession: (barcodeTrackingMode: BarcodeTracking, session: BarcodeTrackingSession) => {
      trackedBarcodes = session.trackedBarcodes;
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
  await context.frameSource?.switchToDesiredState(FrameSourceState.On);
  await barcodeTracking.setEnabled(true);
  view.hideProgressBar();

  const doneButton = document.querySelector<SdcUiButton>("sdc-ui-button")!;
  const drawer = document.querySelector<SdcUiDrawerBottom>("sdc-ui-drawer-bottom")!;
  const continueButton = drawer.querySelector("sdc-ui-button")!;
  const list = drawer.querySelector("sdc-ui-barcode-list")!;

  function addBarcodesToList(listElement: SdcUiBarcodeList, barcodes: IterableIterator<TrackedBarcode>): void {
    removeAllChildNodes(listElement);
    const fragment = document.createDocumentFragment();
    for (const trackedBarcode of barcodes) {
      const { barcode } = trackedBarcode;
      const symbology: SymbologyDescription = new SymbologyDescription(barcode.symbology);
      const li = document.createElement("sdc-ui-barcode-list-item");
      const value = document.createElement("div");
      const type = document.createElement("div");
      value.slot = "value";
      type.slot = "type";
      value.textContent = barcode.data ?? "???";
      type.textContent = symbology.readableName;
      li.append(value, type);
      fragment.append(li);
    }
    list.append(fragment);
  }

  doneButton.addEventListener("click", async () => {
    await barcodeTracking.setEnabled(false);
    const noDuplicated = new Map<string, TrackedBarcode>();
    for (const trackedBarcode of Object.values(trackedBarcodes)) {
      const { data, symbology } = trackedBarcode.barcode;
      const key = `${symbology}${data ?? "??"}`;
      if (!noDuplicated.has(key)) {
        noDuplicated.set(key, trackedBarcode);
      }
    }
    addBarcodesToList(list, noDuplicated.values());
    drawer.open = true;
    document.getElementById("data-capture-view")!.classList.add("scaled");
  });

  const onContinue = async (): Promise<void> => {
    await barcodeTracking.setEnabled(true);
    drawer.open = false;
    document.getElementById("data-capture-view")!.classList.remove("scaled");
  };
  continueButton.addEventListener("click", onContinue);
  drawer.addEventListener("onbackdropclick", onContinue);
}

run().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  alert((error as Error).toString());
});
