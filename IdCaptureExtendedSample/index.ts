import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCId from "scandit-web-datacapture-id";
import * as UI from "./ui";

const LICENSE_KEY = "YOUR_LICENSE_KEY_HERE";

type Mode = "barcode" | "mrz" | "viz";

let context: SDCCore.DataCaptureContext;
let idCapture: SDCId.IdCapture;
let view: SDCCore.DataCaptureView;
let overlay: SDCId.IdCaptureOverlay;
let camera: SDCCore.Camera;
let currentMode: Mode;

// A map defining which document types we enable depending on the selected mode.
const supportedDocumentsByMode: { [key in Mode]: SDCId.IdDocumentType[] } = {
  barcode: [
    SDCId.IdDocumentType.AAMVABarcode,
    SDCId.IdDocumentType.ColombiaIdBarcode,
    SDCId.IdDocumentType.ColombiaDlBarcode,
    SDCId.IdDocumentType.USUSIdBarcode,
    SDCId.IdDocumentType.ArgentinaIdBarcode,
    SDCId.IdDocumentType.SouthAfricaDlBarcode,
    SDCId.IdDocumentType.SouthAfricaIdBarcode,
  ],
  mrz: [
    SDCId.IdDocumentType.VisaMRZ,
    SDCId.IdDocumentType.PassportMRZ,
    SDCId.IdDocumentType.SwissDLMRZ,
    SDCId.IdDocumentType.IdCardMRZ,
    SDCId.IdDocumentType.ChinaMainlandTravelPermitMRZ,
    SDCId.IdDocumentType.ChinaExitEntryPermitMRZ,
  ],
  viz: [SDCId.IdDocumentType.DLVIZ, SDCId.IdDocumentType.IdCardVIZ],
};

// Apply the newly selected mode.
// eslint-disable-next-line sonarjs/cognitive-complexity
async function applyNewMode(mode: Mode): Promise<void> {
  currentMode = mode;
  // We need to remove the current idCapture mode, as it is immutable
  await context.removeMode(idCapture);

  // Create the IdCapture settings needed for the selected mode
  const settings = new SDCId.IdCaptureSettings();
  settings.supportedDocuments = supportedDocumentsByMode[mode];
  // For VIZ documents, we enable scanning both sides and want to get the ID image
  if (mode === "viz") {
    settings.supportedSides = SDCId.SupportedSides.FrontAndBack;
    settings.setShouldPassImageTypeToResult(SDCId.IdImageType.Face, true);
  }
  // Create the IdCapture mode with the new settings
  idCapture = await SDCId.IdCapture.forContext(context, settings);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (idCaptureInstance: SDCId.IdCapture, session) => {
      // Disable the IdCapture mode to handle the current result
      await idCapture.setEnabled(false);

      const capturedId = session.newlyCapturedId;
      if (!capturedId) {
        return;
      }

      if (capturedId.vizResult?.isBackSideCaptureSupported === true) {
        if (capturedId.vizResult.capturedSides === SDCId.SupportedSides.FrontAndBack) {
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
    didRejectId: async () => {
      await idCapture.setEnabled(false);
      UI.showWarning("Document type not supported.");
    },
    didFailWithError: (_, error: SDCId.IdCaptureError) => {
      // If an error occured and the SDK recovered from it, we need to inform the user and reset the process.
      if (error.type === SDCId.IdCaptureErrorCode.RecoveredAfterFailure) {
        UI.showWarning("Oops, something went wrong. Please start over by scanning the front-side of your document.");
        void idCapture.reset();
      }
    },
  });

  // Apply a new overlay for the newly created IdCapture mode
  await view.removeOverlay(overlay);
  overlay = await SDCId.IdCaptureOverlay.withIdCaptureForView(idCapture, view);
}

async function run(): Promise<void> {
  // Configure the library
  await SDCCore.configure({
    licenseKey: LICENSE_KEY,
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [SDCId.idCaptureLoader()],
  });

  // Create the context (it will use the license key passed to configure by default)
  context = await SDCCore.DataCaptureContext.create();

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = SDCCore.Camera.default;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const settings: SDCCore.CameraSettings = SDCId.IdCapture.recommendedCameraSettings;
  await camera.applySettings(settings);
  await context.setFrameSource(camera);

  // Create the view and connect it to the DOM
  view = await SDCCore.DataCaptureView.forContext(context);
  view.connectToElement(UI.elements.dataCaptureView);
  view.addControl(new SDCCore.CameraSwitchControl());

  // Enable the mode selected by default
  currentMode = UI.getSelectedMode() as Mode;

  await applyNewMode(currentMode);
  // Disable the IdCapture mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Finally, switch on the camera
  await camera.switchToDesiredState(SDCCore.FrameSourceState.On);
  await idCapture.setEnabled(true);
}

window.dispatchAction = async (...arguments_) => {
  const [action] = arguments_;
  switch (action) {
    case UI.Action.SWITCH_MODE:
      {
        const [, mode, buttonElement] = arguments_;
        if (mode === currentMode) {
          return;
        }
        UI.onModeSwitched(buttonElement);
        await applyNewMode(mode);
      }
      break;
    case UI.Action.CLOSE_RESULT:
      UI.closeResults();
      await idCapture.setEnabled(true);
      break;
    case UI.Action.CLOSE_WARNING:
      UI.closeDialog();
      await idCapture.setEnabled(true);
      break;
    case UI.Action.SCAN_BACKSIDE:
      await idCapture.setEnabled(true);
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
  console.error(error);
  alert(error);
});

type ActionParameters<A extends UI.Action> = A extends UI.Action.SWITCH_MODE
  ? [mode: Mode, button: HTMLButtonElement]
  : A extends UI.Action.SKIP_BACKSIDE
  ? [SDCId.CapturedId]
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
