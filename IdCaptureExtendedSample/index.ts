import * as Scandit from "scandit-web-datacapture-barcode";

/* eslint-disable-next-line import/extensions */
import * as UI from "./ui.js";

const LICENSE_KEY = "YOUR_LICENSE_KEY_HERE";

type Mode = "barcode" | "mrz" | "viz";

let context: Scandit.DataCaptureContext;
let idCapture: Scandit.IdCapture;
let view: Scandit.DataCaptureView;
let overlay: Scandit.IdCaptureOverlay;
let camera: Scandit.Camera;
let currentMode: Mode;

// A map defining which document types we enable depending on the selected mode.
const supportedDocumentsByMode: { [key in Mode]: Scandit.IdDocumentType[] } = {
  barcode: [
    Scandit.IdDocumentType.AAMVABarcode,
    Scandit.IdDocumentType.ColombiaIdBarcode,
    Scandit.IdDocumentType.USUSIdBarcode,
    Scandit.IdDocumentType.ArgentinaIdBarcode,
    Scandit.IdDocumentType.SouthAfricaDlBarcode,
    Scandit.IdDocumentType.SouthAfricaIdBarcode,
  ],
  mrz: [
    Scandit.IdDocumentType.VisaMRZ,
    Scandit.IdDocumentType.PassportMRZ,
    Scandit.IdDocumentType.SwissDLMRZ,
    Scandit.IdDocumentType.IdCardMRZ,
  ],
  viz: [Scandit.IdDocumentType.DLVIZ, Scandit.IdDocumentType.IdCardVIZ],
};

// Apply the newly selected mode.
// eslint-disable-next-line sonarjs/cognitive-complexity
function applyNewMode(mode: Mode): void {
  currentMode = mode;
  // We need to remove the current idCapture mode, as it is immutable
  context.removeMode(idCapture);

  // Create the IdCapture settings needed for the selected mode
  const settings = new Scandit.IdCaptureSettings();
  settings.supportedDocuments = supportedDocumentsByMode[mode];
  // For VIZ documents, we enable scanning both sides and want to get the ID image
  if (mode === "viz") {
    settings.supportedSides = Scandit.SupportedSides.FrontAndBack;
    settings.setShouldPassImageTypeToResult(Scandit.IdImageType.Face, true);
  }
  // Create the IdCapture mode with the new settings
  idCapture = Scandit.IdCapture.forContext(context, settings);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: (idCaptureInstance: Scandit.IdCapture, session) => {
      // Disable the IdCapture mode to handle the current result
      idCapture.isEnabled = false;

      const capturedId = session.newlyCapturedId;
      if (!capturedId) {
        return;
      }

      // Handle US Driver license case
      if (capturedId.vizResult?.documentType === Scandit.DocumentType.DrivingLicense) {
        if (
          capturedId.capturedResultTypes.includes(Scandit.CapturedResultType.VIZResult) &&
          capturedId.capturedResultTypes.includes(Scandit.CapturedResultType.AAMVABarcodeResult)
        ) {
          UI.showResult(capturedId);
          void idCapture.reset();
        } else {
          UI.confirmScanningBackside(capturedId);
        }
        return;
      }

      if (capturedId.vizResult?.isBackSideCaptureSupported === true) {
        if (capturedId.vizResult.capturedSides === Scandit.SupportedSides.FrontAndBack) {
          UI.showResult(capturedId);
          void idCapture.reset();
        } else {
          UI.confirmScanningBackside(capturedId);
        }
      } else {
        UI.showResult(capturedId);
        void idCapture.reset();
      }
    },
    didRejectId: () => {
      idCapture.isEnabled = false;
      UI.showWarning("Document type not supported.");
    },
  });

  // Apply a new overlay for the newly created IdCapture mode
  view.removeOverlay(overlay);
  overlay = Scandit.IdCaptureOverlay.withIdCaptureForView(idCapture, view);
}

async function run(): Promise<void> {
  // Configure the library
  await Scandit.configure(LICENSE_KEY, {
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    enableIdCapture: true,
  });

  // Create the context (it will use the license key passed to configure by default)
  context = Scandit.DataCaptureContext.create();
  // Monitor the context's status for errors
  context.addListener({
    didChangeStatus: (contextInstance: Scandit.DataCaptureContext, status) => {
      if (!status.isValid) {
        throw new Error(status.message);
      }
    },
  });

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = Scandit.Camera.default;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const settings: Scandit.CameraSettings = Scandit.IdCapture.recommendedCameraSettings;
  await camera.applySettings(settings);
  await context.setFrameSource(camera);

  // Create the view and connect it to the DOM
  view = Scandit.DataCaptureView.forContext(context);
  view.connectToElement(UI.elements.dataCaptureView);
  view.addControl(new Scandit.CameraSwitchControl());

  // Enable the mode selected by default
  currentMode = UI.getSelectedMode() as Mode;

  applyNewMode(currentMode);
  // Disable the IdCapture mode until the camera is accessed
  idCapture.isEnabled = false;

  // Finally, switch on the camera
  await camera.switchToDesiredState(Scandit.FrameSourceState.On);
  idCapture.isEnabled = true;
}

window.dispatchAction = (...arguments_) => {
  const [action] = arguments_;
  switch (action) {
    case UI.Action.SWITCH_MODE:
      {
        const [, mode, buttonElement] = arguments_;
        if (mode === currentMode) {
          return;
        }
        applyNewMode(mode);
        UI.onModeSwitched(buttonElement);
      }
      break;
    case UI.Action.CLOSE_RESULT:
      UI.closeResults();
      idCapture.isEnabled = true;
      break;
    case UI.Action.CLOSE_WARNING:
      UI.closeDialog();
      idCapture.isEnabled = true;
      break;
    case UI.Action.SCAN_BACKSIDE:
      idCapture.isEnabled = true;
      UI.closeDialog();
      break;
    case UI.Action.SKIP_BACKSIDE: {
      UI.closeDialog();
      const [, capturedId] = arguments_;
      UI.showResult(capturedId);
      void idCapture.reset();
      break;
    }
  }
};

run().catch((error) => {
  alert(error);
});

type ActionParameters<A extends UI.Action> = A extends UI.Action.SWITCH_MODE
  ? [mode: Mode, button: HTMLButtonElement]
  : A extends UI.Action.SKIP_BACKSIDE
  ? [Scandit.CapturedId]
  : never;

declare global {
  interface Window {
    dispatchAction: <A extends UI.Action>(
      ...arguments: A extends UI.Action.SKIP_BACKSIDE | UI.Action.SWITCH_MODE
        ? [action: A, ...args: ActionParameters<A>]
        : [action: A]
    ) => void;
  }
}
