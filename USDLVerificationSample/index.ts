import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCId from "scandit-web-datacapture-id";

import * as UI from "./ui";

const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: SDCCore.DataCaptureContext;
let idCapture: SDCId.IdCapture;
let view: SDCCore.DataCaptureView;
let camera: SDCCore.Camera;

export interface VerificationResult {
  isExpired: boolean;
  aamvaVizBarcodeComparisonResult: SDCId.AamvaVizBarcodeComparisonResult | null;
  aamvaBarcodeVerificationResult: Promise<SDCId.AamvaBarcodeVerificationResult>;
}

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  view = new SDCCore.DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(UI.elements.dataCaptureView);

  // Show the progress bar
  view.showProgressBar();

  // Set the progress bar message
  view.setProgressBarMessage("Loading...");

  // Configure the library
  await SDCCore.configure({
    licenseKey: LICENSE_KEY,
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [SDCId.idCaptureLoader({ enableVIZDocuments: true })],
  });

  // Hide the progress bar
  view.hideProgressBar();

  // Create the context (it will use the license key passed to configure by default)
  context = await SDCCore.DataCaptureContext.create();

  // connect the view with the newly created context
  await view.setContext(context);

  // Add a camera switcher icon to the view
  view.addControl(new SDCCore.CameraSwitchControl());

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = SDCCore.Camera.default;
  await camera.applySettings(SDCId.IdCapture.recommendedCameraSettings);
  await context.setFrameSource(camera);

  // Create the IdCapture mode with the required settings
  const settings = new SDCId.IdCaptureSettings();
  settings.supportedDocuments = [SDCId.IdDocumentType.DLVIZ];
  settings.supportedSides = SDCId.SupportedSides.FrontAndBack;
  settings.setShouldPassImageTypeToResult(SDCId.IdImageType.Face, true);
  idCapture = await SDCId.IdCapture.forContext(context, settings);

  // Disable the mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Add the ID Capture overlay
  await SDCId.IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Create an instance of the verifier, to be used later when a document has been scanned
  const comparisonVerifier = SDCId.AamvaVizBarcodeComparisonVerifier.create();
  const barcodeVerifier = await SDCId.AamvaBarcodeVerifier.create(context);

  async function verifyDriverLicense(capturedId: SDCId.CapturedId): Promise<VerificationResult> {
    const capturedDateOfExpiry = capturedId.dateOfExpiry;
    let isExpired: boolean;
    if (capturedDateOfExpiry) {
      const expiryDate = new Date(capturedDateOfExpiry.year, capturedDateOfExpiry.month, capturedDateOfExpiry.day);
      isExpired = expiryDate < new Date();
    } else {
      // Suspicious absence of expiration date in capture, we declare it as expired.
      isExpired = true;
    }

    return {
      isExpired,
      aamvaVizBarcodeComparisonResult: await comparisonVerifier.verify(capturedId),
      aamvaBarcodeVerificationResult: barcodeVerifier.verify(capturedId),
    };
  }

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (idCaptureInstance: SDCId.IdCapture, session: SDCId.IdCaptureSession) => {
      // Disable the IdCapture mode to handle the current result
      await idCapture.setEnabled(false);

      const capturedId = session.newlyCapturedId;
      if (!capturedId) {
        return;
      }

      if (capturedId.documentType !== SDCId.DocumentType.DrivingLicense || capturedId.issuingCountryIso !== "USA") {
        await idCapture.reset();
        UI.showWarning("Document is not a US driver's license.");
        return;
      }

      if (capturedId.vizResult?.capturedSides === SDCId.SupportedSides.FrontAndBack) {
        const verificationResult = await verifyDriverLicense(capturedId);
        UI.showResult(capturedId, verificationResult);
        await idCapture.reset();
      } else {
        await idCapture.setEnabled(true);
      }
    },
    didRejectId: async () => {
      await idCapture.setEnabled(false);
      await idCapture.reset();
      UI.showWarning("Document is not a US driver's license.");
    },
  });

  // Finally, switch on the camera and enable the ID Capture mode
  await camera.switchToDesiredState(SDCCore.FrameSourceState.On);
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

run().catch((error) => {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
});

declare global {
  interface Window {
    dispatchAction: <A extends UI.Action>(...arguments: [action: A]) => void;
  }
}
