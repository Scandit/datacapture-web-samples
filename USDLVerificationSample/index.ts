import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "@scandit/web-datacapture-core";
import type { AamvaBarcodeVerificationResult, CapturedId } from "@scandit/web-datacapture-id";
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
} from "@scandit/web-datacapture-id";

import * as UI from "./ui";

const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: DataCaptureContext;
let idCapture: IdCapture;
let view: DataCaptureView;
let camera: Camera;

export interface VerificationResult {
  isExpired: boolean;
  aamvaBarcodeVerificationResult: Promise<AamvaBarcodeVerificationResult>;
}

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  view = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(UI.elements.dataCaptureView);

  // Show the progress bar
  view.showProgressBar();

  // Configure the library
  await configure({
    licenseKey: LICENSE_KEY,
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [idCaptureLoader({ enableVIZDocuments: true })],
  });

  // Hide the progress bar
  view.hideProgressBar();

  // Create the context (it will use the license key passed to configure by default)
  context = await DataCaptureContext.create();

  // connect the view with the newly created context
  await view.setContext(context);

  // Add a camera switcher icon to the view
  view.addControl(new CameraSwitchControl());

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = Camera.default;
  await camera.applySettings(IdCapture.recommendedCameraSettings);
  await context.setFrameSource(camera);

  // Create the IdCapture mode with the required settings
  const settings = new IdCaptureSettings();
  settings.scannerType = new FullDocumentScanner();
  settings.acceptedDocuments = [new DriverLicense(Region.Us)];
  settings.setShouldPassImageTypeToResult(IdImageType.Face, true);
  idCapture = await IdCapture.forContext(context, settings);

  // Disable the mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Add the ID Capture overlay
  await IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Create an instance of the verifier, to be used later when a document has been scanned
  const barcodeVerifier = await AamvaBarcodeVerifier.create(context);

  function verifyDriverLicense(capturedId: CapturedId): VerificationResult {
    const capturedDateOfExpiry = capturedId.dateOfExpiry;
    let isExpired: boolean;
    if (capturedDateOfExpiry) {
      const expiryDate = new Date(
        capturedDateOfExpiry.year,
        capturedDateOfExpiry.month ?? 0,
        capturedDateOfExpiry.day ?? 1
      );
      isExpired = expiryDate < new Date();
    } else {
      // Suspicious absence of expiration date in capture, we declare it as expired.
      isExpired = true;
    }

    return {
      isExpired,
      aamvaBarcodeVerificationResult: barcodeVerifier.verify(capturedId),
    };
  }

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (capturedId: CapturedId) => {
      await idCapture.setEnabled(false);
      const verificationResult = verifyDriverLicense(capturedId);
      void UI.showResult(capturedId, verificationResult);
      await idCapture.reset();
    },
    didRejectId: async (capturedId: CapturedId, reason: RejectionReason) => {
      await idCapture.setEnabled(false);
      await idCapture.reset();
      if (reason === RejectionReason.Timeout) {
        UI.showWarning(
          "Document capture failed. Make sure the document is well lit and free of glare. Alternatively, try scanning another document."
        );
      } else if (reason === RejectionReason.NotAcceptedDocumentType && capturedId.issuingCountry !== Region.Us) {
        UI.showWarning("Document is not a US driver’s license");
      } else {
        UI.showWarning("Document not supported. Try scanning another document");
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
