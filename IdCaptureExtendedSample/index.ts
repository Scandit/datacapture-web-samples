import type { CameraSettings, Translations as CoreTranslations } from "@scandit/web-datacapture-core";
import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  Localization,
  configure,
} from "@scandit/web-datacapture-core";
import type { CapturedId, IdCaptureError, Translations as IdTranslations } from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  DriverLicense,
  IdCapture,
  IdCaptureErrorCode,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdCard,
  IdImageType,
  Passport,
  Region,
  SingleSideScanner,
  idCaptureLoader,
} from "@scandit/web-datacapture-id";
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

function createIdCaptureSettingsFor(mode: Mode): IdCaptureSettings {
  const settings = new IdCaptureSettings();
  settings.scannerType = new SingleSideScanner(mode === "barcode", mode === "mrz", mode === "viz");
  settings.acceptedDocuments = [new IdCard(Region.Any), new DriverLicense(Region.Any), new Passport(Region.Any)];

  // For VIZ documents, we want to get the Face image
  if (mode === "viz") {
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
    didCaptureId: async (capturedId: CapturedId) => {
      await idCapture.setEnabled(false);
      UI.showResult(capturedId);
      void idCapture.reset();
    },
    didRejectId: async (_capturedId: CapturedId, reason: RejectionReason) => {
      await idCapture.setEnabled(false);
      if (reason === RejectionReason.Timeout) {
        UI.showWarning(
          "Document capture failed. Make sure the document is well lit and free of glare. Alternatively, try scanning another document."
        );
      } else {
        UI.showWarning("Document not supported. Try scanning another document.");
      }
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
