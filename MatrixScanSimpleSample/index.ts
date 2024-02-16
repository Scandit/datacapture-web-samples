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

import { SdcUiButton } from "./components/sdcUiButton";
import { SdcUiDrawerBottom } from "./components/sdcUiDrawerBottom";
import { SdcUiBarcodeList, SdcUiBarcodeListItem } from "./components/sdcUiBarcodeList";
import { define, removeAllChildNodes } from "./utils";

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
  // There is a Scandit sample license key set below here.
  // This license key is enabled for sample evaluation only.
  // If you want to build your own application, get your license key by signing up for a trial at https://ssl.scandit.com/dashboard/sign-up?p=test
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  await configure({
    licenseKey: "AfUkdmKlRiP5FdlOFQnOhu4V3j5LFKttPGTWXFd7CkuRaTAstDqq78RrBm2ZG9LRu1T8CNgP6oLScGrUoEwfmP1TUXonIGCl2g9Fo5NYtmK/aEV8FX/YcdRKfWS5bJrTcWGDHdcsJxT6Me5C3RMdWZkdqeR5GEjDzT6dO4ZPWOBbNLjpkgZ0/MjtYQPKqSV+bSZC7+ekFaXovSKWfXV89BXtta/6sZHFJOMKxyvzh6zw5yA+NDR67OXoWKCrrNq4AOuBlt1ZelIHCqjQgTy/SZG110eJr5e4pth38Bx0fXE8FGX92BoxwJr1EG+P5CEJF8EFMy2zf87aJQYuzHmg0nM7czcNqLUd9F23uxntZYjKlwgWmmSzev/ozaumEvbW9RVW1bUQmV8pQ1SWILBuzQPeAw8iWOWgnTH18tH7cT+fUJumvM2rn7LWx9JYLAKBKRuwe2sDh3l5eqobZKdarIRsKVgXa4pw+gkYKuplzTo+Bzh70rbmtgq3IJ8hSpdoZITzfUQSwXkrgdQa5Cmrpxz9gXManBRt01h3eFXG7znZU9w0+uzzV/b5e6MQcPncODrCQOq0kfEBYgRoLAwVCOKnxyWQkqRbUpsTN2wy2MTg10flYhR/zf1eXdiUjgPUhWj8LtmgxJELYky7uMu46abfCkAw73e+12iJmlf9/tmTFk34La9ZQiF/BYps5h327ZW8qobay+Esx1i9dsaFKYt/nCN8jZdUYD/df+/vApyK4PMbph9EPRe5u0alg8BqpEExnkQsy1W7r85yngO/rxSXsY6rTMoTXb/87ul8uQnsrD41ZLtFdzo0OlbNTeNOI1mJz/E6/SOLbRRK",
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
  await camera.switchToDesiredState(FrameSourceState.On);
  await barcodeTracking.setEnabled(true);
  view.hideProgressBar();

  const doneButton = document.querySelector<SdcUiButton>("sdc-ui-button")!;
  const drawer = document.querySelector<SdcUiDrawerBottom>("sdc-ui-drawer-bottom")!;
  const continueButton = drawer.querySelector("sdc-ui-button")!;
  const list = drawer.querySelector("sdc-ui-barcode-list")!;

  function addBarcodesToList(listElement: SdcUiBarcodeList, barcodes: TrackedBarcode[]): void {
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
    addBarcodesToList(list, Object.values(trackedBarcodes));
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
  alert(JSON.stringify(error, null, 2));
});
