import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
} from "@scandit/web-datacapture-core";
import type { CapturedId } from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  AamvaBarcodeVerifier,
  DriverLicense,
  IdCapture,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdImageType,
  Region,
  idCaptureLoader,
  FullDocumentScanner,
  IdCaptureScanner,
} from "@scandit/web-datacapture-id";

import * as UI from "./ui";

// Enter your Scandit License key here.
// Your Scandit License key is available via your Scandit SDK web account.
const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: DataCaptureContext;
let idCapture: IdCapture;
let view: DataCaptureView;
let camera: Camera;

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

  // Create the IdCapture mode with the required settings
  const settings = new IdCaptureSettings();
  settings.scanner = new IdCaptureScanner({ physicalDocument: new FullDocumentScanner() });
  settings.acceptedDocuments = [new DriverLicense(Region.Us)];
  settings.setShouldPassImageTypeToResult(IdImageType.Face, true);

  // Enable automatic rejection of expired and inconsistent documents
  settings.rejectExpiredIds = true;
  settings.rejectInconsistentData = true;

  // Required for DataConsistencyResult frontReviewImage()
  settings.setShouldPassImageTypeToResult(IdImageType.CroppedDocument, true);
  idCapture = await IdCapture.forContext(context, settings);

  // Disable the mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Add the ID Capture overlay
  await IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Create an instance of the AAMVA barcode verifier, to be used later when a valid document has been scanned
  const barcodeVerifier = await AamvaBarcodeVerifier.create(context);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (capturedId: CapturedId) => {
      await idCapture.setEnabled(false);

      // Documents reaching this callback have passed all built-in checks
      // (not expired, data consistent). Now run manual AAMVA verification.
      const aamvaVerificationPromise = barcodeVerifier.verify(capturedId);

      void UI.showDocumentResult(capturedId, undefined, aamvaVerificationPromise);
    },
    didRejectId: async (capturedId: CapturedId, reason: RejectionReason) => {
      await idCapture.setEnabled(false);

      // Check if this is a verification failure that should show detailed results
      if (reason === RejectionReason.DocumentExpired || reason === RejectionReason.InconsistentData) {
        void UI.showDocumentResult(capturedId, reason);
      } else {
        // Handle other rejection reasons with warning dialogs
        let warningMessage: string;

        switch (reason) {
          case RejectionReason.Timeout:
            warningMessage =
              "Document capture failed. Make sure the document is well lit and free of glare. Alternatively, try scanning another document.";
            break;
          case RejectionReason.NotAcceptedDocumentType:
            warningMessage =
              capturedId.issuingCountry !== Region.Us
                ? "Document is not a US driver's license"
                : "Document not supported. Try scanning another document";
            break;
          default:
            warningMessage = "Document not supported. Try scanning another document";
            break;
        }

        UI.showWarning(warningMessage);
      }
    },
  });

  // Finally, switch on the camera and enable the ID Capture mode
  await camera.switchToDesiredState(FrameSourceState.On);
  await idCapture.setEnabled(true);
}

window.dispatchAction = async (...arguments_) => {
  const [action] = arguments_;
  switch (action) {
    case UI.Action.CLOSE_RESULT:
      UI.closeResults();
      await idCapture.setEnabled(true);
      break;
    case UI.Action.CLOSE_WARNING:
      UI.closeDialog();
      await idCapture.setEnabled(true);
      break;
  }
};

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
