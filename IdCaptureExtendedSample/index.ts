import type { CameraSettings, Translations as CoreTranslations } from "scandit-web-datacapture-core";
import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  Localization,
  configure,
} from "scandit-web-datacapture-core";
import type {
  CapturedId,
  IdCaptureError,
  IdCaptureSession,
  Translations as IdTranslations,
} from "scandit-web-datacapture-id";
import {
  IdCapture,
  IdCaptureErrorCode,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdDocumentType,
  IdImageType,
  SupportedSides,
  idCaptureLoader,
} from "scandit-web-datacapture-id";
import * as UI from "./ui";

const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

type Mode = "barcode" | "mrz" | "viz";

let context: DataCaptureContext;
let idCapture: IdCapture;
let view: DataCaptureView;
let overlay: IdCaptureOverlay;
let camera: Camera;
let currentMode: Mode;

// Here is how to update some translations
Localization.getInstance().update<IdTranslations | CoreTranslations>({
  "core.view.loading": "Loading ID Capture...",
  // "id.idCaptureOverlay.scanFrontSideHint": "Custom text for front of document",
  // "id.idCaptureOverlay.scanBackSideHint": "Custom text for back of document",
});

// A map defining which document types we enable depending on the selected mode.
const supportedDocumentsByMode: { [key in Mode]: IdDocumentType[] } = {
  barcode: [
    IdDocumentType.AAMVABarcode,
    IdDocumentType.ColombiaIdBarcode,
    IdDocumentType.ColombiaDlBarcode,
    IdDocumentType.USUSIdBarcode,
    IdDocumentType.ArgentinaIdBarcode,
    IdDocumentType.SouthAfricaDlBarcode,
    IdDocumentType.SouthAfricaIdBarcode,
    IdDocumentType.CommonAccessCardBarcode,
  ],
  mrz: [
    IdDocumentType.VisaMRZ,
    IdDocumentType.PassportMRZ,
    IdDocumentType.SwissDLMRZ,
    IdDocumentType.IdCardMRZ,
    IdDocumentType.ChinaMainlandTravelPermitMRZ,
    IdDocumentType.ChinaExitEntryPermitMRZ,
    IdDocumentType.ChinaOneWayPermitFrontMRZ,
    IdDocumentType.ChinaOneWayPermitBackMRZ,
    IdDocumentType.ApecBusinessTravelCardMRZ,
  ],
  viz: [IdDocumentType.DLVIZ, IdDocumentType.IdCardVIZ],
};

function createIdCaptureSettingsFor(mode: Mode): IdCaptureSettings {
  const settings = new IdCaptureSettings();
  settings.supportedDocuments = supportedDocumentsByMode[mode];
  // For VIZ documents, we enable scanning both sides and want to get the ID image
  if (mode === "viz") {
    settings.supportedSides = SupportedSides.FrontAndBack;
    settings.setShouldPassImageTypeToResult(IdImageType.Face, true);
  }

  return settings;
}

// Apply the newly selected mode.
// eslint-disable-next-line sonarjs/cognitive-complexity
async function createIdCapture(settings: IdCaptureSettings): Promise<void> {
  idCapture = await IdCapture.forContext(context, settings);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (idCaptureInstance: IdCapture, session: IdCaptureSession) => {
      // Disable the IdCapture mode to handle the current result
      await idCapture.setEnabled(false);

      const capturedId = session.newlyCapturedId;
      if (!capturedId) {
        return;
      }

      if (capturedId.vizResult?.isBackSideCaptureSupported === true) {
        if (capturedId.vizResult.capturedSides === SupportedSides.FrontAndBack) {
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
      void idCapture.reset();
    },
    didFailWithError: (_: IdCapture, error: IdCaptureError) => {
      // If an error occured and the SDK recovered from it, we need to inform the user and reset the process.
      if (error.type === IdCaptureErrorCode.RecoveredAfterFailure) {
        UI.showWarning("Oops, something went wrong. Please start over by scanning the front-side of your document.");
        void idCapture.reset();
      }
    },
  });

  // Apply a new overlay for the newly created IdCapture mode
  await view.removeOverlay(overlay);
  overlay = await IdCaptureOverlay.withIdCaptureForView(idCapture, view);
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

  // Hide progress bar
  view.hideProgressBar();

  // Create the context (it will use the license key passed to configure by default)
  context = await DataCaptureContext.create();

  await view.setContext(context);

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = Camera.default;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const settings: CameraSettings = IdCapture.recommendedCameraSettings;
  await camera.applySettings(settings);
  await context.setFrameSource(camera);

  view.addControl(new CameraSwitchControl());

  // Enable the mode selected by default
  currentMode = UI.getSelectedMode() as Mode;

  await createIdCapture(createIdCaptureSettingsFor(currentMode));
  // Disable the IdCapture mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Finally, switch on the camera
  await camera.switchToDesiredState(FrameSourceState.On);
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
        currentMode = mode;
        await idCapture.applySettings(createIdCaptureSettingsFor(currentMode));
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

run().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  alert((error as Error).toString());
});

type ActionParameters<A extends UI.Action> = A extends UI.Action.SWITCH_MODE
  ? [mode: Mode, button: HTMLButtonElement]
  : A extends UI.Action.SKIP_BACKSIDE
  ? [CapturedId]
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
