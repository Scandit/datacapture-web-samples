/* eslint-disable max-classes-per-file */
import type {
  DataCaptureContextListener,
  FrameSource,
  FrameSourceListener,
  Quadrilateral,
} from "@scandit/web-datacapture-core";
import {
  Anchor,
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
  PointWithUnit,
  MeasureUnit,
  NumberWithUnit,
} from "@scandit/web-datacapture-core";
import {
  BarcodeBatchBasicOverlay,
  BarcodeBatchBasicOverlayStyle,
  BarcodeBatch,
  BarcodeBatchAdvancedOverlay,
  BarcodeBatchSettings,
  Symbology,
  barcodeCaptureLoader,
  TrackedBarcodeView,
} from "@scandit/web-datacapture-barcode";
import type { BarcodeBatchSession, TrackedBarcode, TrackedBarcodeViewOptions } from "@scandit/web-datacapture-barcode";

import { SdcUiButton } from "./components/sdcUiButton.js";
import { BubbleComponent } from "./BubbleComponent.js";
import { define } from "./utils.js";

async function run(): Promise<void> {
  let state: "freeze" | "unfreeze" = "unfreeze";
  const viewsForIdentifier: Map<
    number,
    {
      state: "alternateView" | "defaultView";
      defaultView: Promise<TrackedBarcodeView>;
      alternateView: Promise<TrackedBarcodeView>;
    }
  > = new Map<
    number,
    {
      state: "alternateView" | "defaultView";
      defaultView: Promise<TrackedBarcodeView>;
      alternateView: Promise<TrackedBarcodeView>;
    }
  >();

  define({
    "sdc-ui-button": SdcUiButton,
  });
  document.body.classList.add("componentsDefined");

  const doneButton = document.querySelector<SdcUiButton>("sdc-ui-button")!;
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
  const cameraSettings = BarcodeBatch.recommendedCameraSettings;
  await camera.applySettings(cameraSettings);
  await context.setFrameSource(camera);

  // The barcode tracking process is configured through barcode tracking settings,
  // they are then applied to the barcode tracking instance that manages barcode recognition.
  const settings: BarcodeBatchSettings = new BarcodeBatchSettings();

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
  const barcodeBatch = await BarcodeBatch.forContext(context, settings);
  // Disable the barcode tracking mode until the camera is accessed.
  await barcodeBatch.setEnabled(true);

  // Add a control to be able to switch cameras.
  view.addControl(new CameraSwitchControl());

  // Add a basic barcode tracking overlay to the data capture view to render the location of tracked barcodes on top of
  // the video preview.
  await BarcodeBatchBasicOverlay.withBarcodeBatchForViewWithStyle(
    barcodeBatch,
    view,
    BarcodeBatchBasicOverlayStyle.Dot
  );

  // Add advanced overlay with custom info
  const advancedOverlay = await BarcodeBatchAdvancedOverlay.withBarcodeBatchForView(barcodeBatch, view);

  // Get the information you want to show from your back end system/database.
  const info = { title: "Report Stock Count", subtitle: "Shelf: 4, BackRoom: 8" };

  const shouldShowBarcode = (dataCaptureView: DataCaptureView, trackedBarcode: TrackedBarcode): boolean => {
    const viewLocation: Quadrilateral = dataCaptureView.viewQuadrilateralForFrameQuadrilateral(trackedBarcode.location);
    const width = Math.max(
      viewLocation.topRight.x - viewLocation.topLeft.x,
      viewLocation.bottomRight.x - viewLocation.bottomLeft.x
    );
    // Show the barcode overlay only when is more than 20% of the screen width.
    return width > window.innerWidth * 0.2;
  };

  // To get the best possible AR view quality, it is suggested to set AR view sizes with taking into account
  // the device pixel ratio and scale them down based on it.
  const options: TrackedBarcodeViewOptions = { scale: 1 / window.devicePixelRatio };

  async function update(
    overlay: BarcodeBatchAdvancedOverlay,
    trackedBarcode: TrackedBarcode,
    viewToShow: "alternateView" | "defaultView" = "defaultView"
  ): Promise<void> {
    if (shouldShowBarcode(view, trackedBarcode)) {
      if (!viewsForIdentifier.has(trackedBarcode.identifier)) {
        const stateForBarcode = {
          state: viewToShow,
          defaultView: TrackedBarcodeView.withHTMLElement(BubbleComponent(info), options),
          alternateView: TrackedBarcodeView.withHTMLElement(
            BubbleComponent({ title: trackedBarcode.barcode.data ?? "" }),
            options
          ),
        };
        viewsForIdentifier.set(trackedBarcode.identifier, stateForBarcode);
        await overlay.setViewForTrackedBarcode(stateForBarcode[viewToShow], trackedBarcode);
      } else {
        const viewForState = viewsForIdentifier.get(trackedBarcode.identifier)!;
        if (viewForState.state !== viewToShow) {
          viewForState.state = viewToShow;
          await overlay.setViewForTrackedBarcode(viewForState[viewToShow], trackedBarcode);
        }
      }
    } else {
      await overlay.setViewForTrackedBarcode(null, trackedBarcode);
      viewsForIdentifier.delete(trackedBarcode.identifier);
    }
  }

  advancedOverlay.listener = {
    didTapViewForTrackedBarcode: (overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode) => {
      const currentView = viewsForIdentifier.get(trackedBarcode.identifier)!.state;
      void update(overlay, trackedBarcode, currentView === "defaultView" ? "alternateView" : "defaultView");
    },
    // The offset of our overlay will be calculated from the top center anchoring point.
    anchorForTrackedBarcode: () => Anchor.TopCenter,
    // We set the offset's height to be equal of the 20 percent of our overlay.
    // The minus sign means that the overlay will be above the barcode.
    offsetForTrackedBarcode: () =>
      new PointWithUnit(new NumberWithUnit(0, MeasureUnit.Fraction), new NumberWithUnit(-0.2, MeasureUnit.Fraction)),
  };

  barcodeBatch.addListener({
    // This function is called whenever objects are updated and it's the right place to react to the tracking results.
    didUpdateSession: (_barcodeBatch: BarcodeBatch, session: BarcodeBatchSession) => {
      // Remove information about tracked barcodes that are no longer tracked.
      for (const identifier of session.removedTrackedBarcodes) {
        viewsForIdentifier.delete(Number.parseInt(identifier, 10));
      }

      for (const trackedBarcode of Object.values(session.trackedBarcodes)) {
        void update(
          advancedOverlay,
          trackedBarcode,
          viewsForIdentifier.get(trackedBarcode.identifier)?.state ?? "defaultView"
        );
      }
    },
  });

  // Switch the camera on to start streaming frames.
  // The camera is started asynchronously and will take some time to completely turn on.
  await context.frameSource?.switchToDesiredState(FrameSourceState.On);
  await barcodeBatch.setEnabled(true);
  view.hideProgressBar();

  const unfreeze = async (): Promise<void> => {
    await context.frameSource?.switchToDesiredState(FrameSourceState.On);
    await barcodeBatch.setEnabled(true);
  };

  const freeze = async (): Promise<void> => {
    await context.frameSource?.switchToDesiredState(FrameSourceState.Standby);
    await barcodeBatch.setEnabled(false);
  };

  doneButton.addEventListener("click", async () => {
    await (state === "freeze" ? unfreeze() : freeze());
  });

  const onFrameSourceStateChange: FrameSourceListener = {
    didChangeState(_: FrameSource, newState: FrameSourceState) {
      state = newState === FrameSourceState.Standby ? "freeze" : "unfreeze";
      doneButton.frozen = newState === FrameSourceState.Standby;
    },
  };

  const onFrameSourceChange: DataCaptureContextListener = {
    didChangeFrameSource(_context: DataCaptureContext, frameSource: FrameSource | null) {
      frameSource?.addListener(onFrameSourceStateChange);
    },
  };
  context.addListener(onFrameSourceChange);
  context.frameSource?.addListener(onFrameSourceStateChange);
}

run().catch((error: unknown) => {
  let errorMessage = (error as Error).toString();
  if (error instanceof Error && error.name === "NoLicenseKeyError") {
    errorMessage = `
        NoLicenseKeyError:

        Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:
        - running \`SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run build\`
        - placing your license key in a \`.env\` file at the root of the sample directory
        — or by inserting your license key into \`index.ts\`, replacing the placeholder \`-- ENTER YOUR SCANDIT LICENSE KEY HERE --\` with the key.
    `;
  }
  // eslint-disable-next-line no-console
  console.error(error);
  alert(errorMessage);
});
