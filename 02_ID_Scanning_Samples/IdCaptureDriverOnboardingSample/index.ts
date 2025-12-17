import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  Localization,
  SingleImageUploader,
} from "@scandit/web-datacapture-core";
import type { CapturedId } from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  IdCapture,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdImageType,
  idCaptureLoader,
  DriverLicense,
  Region,
  FullDocumentScanner,
  IdCaptureScanner,
  IdSide,
} from "@scandit/web-datacapture-id";

import * as UI from "./ui";

// Enter your Scandit License key here.
// Your Scandit License key is available via your Scandit SDK web account.
const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: DataCaptureContext;
let idCapture: IdCapture;
let settings: IdCaptureSettings;
let view: DataCaptureView;
let camera: Camera;
let singleimageuploader: SingleImageUploader;
let firstSideCapture: CapturedId | null = null;

async function run(): Promise<void> {
  Localization.getInstance().update({ "core.singleImageUploader.button": "Choose image for FRONT side" });

  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  view = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(UI.elements.dataCaptureView);

  // Show the progress bar
  view.showProgressBar();

  // Hide the progress bar
  view.hideProgressBar();

  // Configure the library and create the context
  context = await DataCaptureContext.forLicenseKey(LICENSE_KEY, {
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [idCaptureLoader({ enableVIZDocuments: true })],
  });

  // connect the view with the newly created context
  await view.setContext(context);

  // Add a camera switcher icon to the view
  view.addControl(new CameraSwitchControl());

  // Let the SDK select the best camera. Apply the recommended settings from the IdCapture mode.
  camera = Camera.pickBestGuess();
  await camera.applySettings(IdCapture.recommendedCameraSettings);
  await context.setFrameSource(camera);

  // Create a default single image frame source
  singleimageuploader = SingleImageUploader.default;

  // Create the IdCapture mode with the required settings
  settings = new IdCaptureSettings();
  settings.scanner = new IdCaptureScanner({ physicalDocument: new FullDocumentScanner() });
  settings.acceptedDocuments = [new DriverLicense(Region.Us)];
  settings.notifyOnSideCapture = true;
  settings.setShouldPassImageTypeToResult(IdImageType.Face, true);
  settings.setShouldPassImageTypeToResult(IdImageType.CroppedDocument, true);
  settings.setShouldPassImageTypeToResult(IdImageType.Frame, true);
  idCapture = await IdCapture.forContext(context, settings);

  // Add the ID Capture overlay
  await IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (capturedId: CapturedId) => {
      // we captured both sides of the document, show results
      if (capturedId.isCapturingComplete) {
        await idCapture.setEnabled(false);
        await UI.showLoader();
        UI.showResult(capturedId);
      } else {
        await idCapture.setEnabled(false);
        await UI.showLoader();
        firstSideCapture = capturedId;
        // update the button text
        Localization.getInstance().update({ "core.singleImageUploader.button": "Choose image for BACK side" });
        await idCapture.setEnabled(true);
      }
    },
    didRejectId: async (capturedId: CapturedId, reason: RejectionReason) => {
      switch (reason) {
        case RejectionReason.Timeout: {
          await idCapture.setEnabled(false);
          UI.showWarning("Can't scan?", "Upload picture or try a different document", [
            { action: UI.Action.MANUAL_UPLOAD, label: "Upload Picture" },
            { action: UI.Action.CLOSE_WARNING_RESET, label: "Retry" },
          ]);
          break;
        }
        case RejectionReason.SingleImageNotRecognized: {
          if (firstSideCapture == null) {
            UI.showWarning("Unrecognized document", "Please try again with a different document", [
              { action: UI.Action.CLOSE_WARNING, label: "Ok" },
            ]);
            return;
          }

          const backImage =
            capturedId.images.getCroppedDocument(IdSide.Back) ?? capturedId.images.getFrame(IdSide.Back) ?? null;
          if (backImage != null) {
            // we could not capture the back side, but we still want to proceed with the results we have
            await idCapture.setEnabled(false);
            await UI.showLoader();
            UI.showResult(firstSideCapture, backImage);
          }
          break;
        }
        case RejectionReason.DocumentVoided: {
          UI.showWarning("Verification failed!", "Document is voided", [
            { action: UI.Action.CLOSE_WARNING_RESET, label: "Ok" },
          ]);
          break;
        }
        default: {
          UI.showWarning("Verification failed!", "Document is not supported", [
            { action: UI.Action.CLOSE_WARNING_RESET, label: "Ok" },
          ]);
        }
      }
    },
  });

  // Finally, switch on the frame sources and enable the ID Capture mode
  await camera.switchToDesiredState(FrameSourceState.On);

  UI.showManualUploadOption();
}

async function resetToInitialState(resetFrameSource: boolean = false): Promise<void> {
  Localization.getInstance().update({ "core.singleImageUploader.button": "Choose image for FRONT side" });
  firstSideCapture = null;
  if (resetFrameSource) {
    await context.frameSource?.switchToDesiredState(FrameSourceState.Off);
    await context.setFrameSource(camera);
    await camera.switchToDesiredState(FrameSourceState.On);
  }
}

window.dispatchAction = async (...arguments_) => {
  const [action] = arguments_;
  switch (action) {
    case UI.Action.CLOSE_RESULT: {
      UI.closeResults();
      await resetToInitialState(true);
      UI.showManualUploadOption();
      await idCapture.setEnabled(true);
      break;
    }
    case UI.Action.CLOSE_WARNING:
    case UI.Action.CLOSE_WARNING_RESET: {
      UI.closeDialog();
      await idCapture.setEnabled(true);
      break;
    }
    case UI.Action.MANUAL_UPLOAD: {
      await idCapture.setEnabled(false);
      await camera.switchToDesiredState(FrameSourceState.Off);
      UI.closeDialog();
      UI.hideManualUploadOption();
      await resetToInitialState();
      await context.setFrameSource(singleimageuploader);
      await idCapture.setEnabled(true);
      await context.frameSource?.switchToDesiredState(FrameSourceState.On);
      break;
    }
  }
};

// eslint-disable-next-line unicorn/prefer-top-level-await
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

declare global {
  interface Window {
    dispatchAction: <A extends UI.Action>(...arguments: [action: A]) => void;
  }
}
