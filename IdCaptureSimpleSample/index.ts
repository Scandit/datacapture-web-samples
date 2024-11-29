/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "@scandit/web-datacapture-core";
import type { CapturedId } from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  DriverLicense,
  IdCapture,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdCard,
  IdImageType,
  Passport,
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

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = Camera.default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await camera.applySettings(IdCapture.recommendedCameraSettings);
  await context.setFrameSource(camera);

  await view.setContext(context);

  view.addControl(new CameraSwitchControl());

  // Create the IdCapture settings needed for the selected mode
  const settings = new IdCaptureSettings();
  settings.scannerType = new FullDocumentScanner();
  settings.acceptedDocuments = [new IdCard(Region.Any), new Passport(Region.Any), new DriverLicense(Region.Any)];
  settings.setShouldPassImageTypeToResult(IdImageType.Face, true);

  // Create the IdCapture mode with the new settings
  idCapture = await IdCapture.forContext(context, settings);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (capturedId: CapturedId) => {
      // Disable the IdCapture mode to handle the current result
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
        return;
      }
      UI.showWarning("Document not supported. Try scanning another document.");
    },
  });

  // Apply a new overlay for the newly created IdCapture mode
  await IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Disable the IdCapture mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Finally, switch on the camera
  await camera.switchToDesiredState(FrameSourceState.On);
  await idCapture.setEnabled(true);
}

window.dispatchAction = async (action: UI.Action) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatchAction: (action: UI.Action, ...arguments_: any) => void;
  }
}
