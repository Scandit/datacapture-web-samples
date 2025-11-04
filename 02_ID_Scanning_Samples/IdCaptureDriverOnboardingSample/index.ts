import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
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
let capturedId: CapturedId | undefined;
let manualUploadMode = false;

async function setIdCaptureEnabled(enabled: boolean): Promise<void> {
  await singleimageuploader.switchToDesiredState(enabled ? FrameSourceState.On : FrameSourceState.Off);
  await idCapture.setEnabled(enabled);
}

async function resetFrameSource(): Promise<void> {
  if (manualUploadMode) {
    await camera.switchToDesiredState(FrameSourceState.On);
    await context.setFrameSource(camera);
    UI.showManualUpload();
    manualUploadMode = false;
  }
}

async function resetProgress(): Promise<void> {
  capturedId = undefined;
  await idCapture.reset();
  await resetFrameSource();
}

async function run(): Promise<void> {
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
  settings.setShouldPassImageTypeToResult(IdImageType.Face, true);
  settings.setShouldPassImageTypeToResult(IdImageType.CroppedDocument, true);
  idCapture = await IdCapture.forContext(context, settings);

  await setIdCaptureEnabled(false);

  // Add the ID Capture overlay
  await IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (newCapturedId: CapturedId) => {
      // Disable the IdCapture mode to handle the current result
      await setIdCaptureEnabled(false);
      capturedId = newCapturedId;
      await UI.showLoader();
      UI.showResult(capturedId);
    },
    didRejectId: async (_capturedId: CapturedId, reason: RejectionReason) => {
      await setIdCaptureEnabled(false);
      switch (reason) {
        case RejectionReason.Timeout: {
          UI.showWarning("Can't scan?", "Upload picture or try a different document", [
            { action: UI.Action.MANUAL_UPLOAD, label: "Upload Picture" },
            { action: UI.Action.CLOSE_WARNING_RESET, label: "Retry" },
          ]);
          break;
        }
        case RejectionReason.SingleImageNotRecognized: {
          // @TODO save frame data, blocked by SDC-23806
          if (capturedId) {
            UI.showResult(capturedId);
          }
          await setIdCaptureEnabled(true);
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
  await singleimageuploader.switchToDesiredState(FrameSourceState.On);
  await setIdCaptureEnabled(true);

  UI.showManualUpload();
}

window.dispatchAction = async (...arguments_) => {
  const [action] = arguments_;
  switch (action) {
    case UI.Action.CLOSE_RESULT: {
      UI.closeResults();
      await resetProgress();
      await setIdCaptureEnabled(true);
      break;
    }
    case UI.Action.CLOSE_WARNING: {
      UI.closeDialog();
      await setIdCaptureEnabled(true);
      break;
    }
    case UI.Action.CLOSE_WARNING_RESET: {
      UI.closeDialog();
      await resetProgress();
      await setIdCaptureEnabled(true);
      break;
    }
    case UI.Action.MANUAL_UPLOAD: {
      UI.closeDialog();
      UI.closeManualUpload();
      await camera.switchToDesiredState(FrameSourceState.Off);
      await context.setFrameSource(singleimageuploader);
      await setIdCaptureEnabled(true);
      manualUploadMode = true;
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
