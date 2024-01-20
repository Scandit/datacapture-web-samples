/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "scandit-web-datacapture-core";
import {
  IdCapture,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdDocumentType,
  IdImageType,
  idCaptureLoader,
} from "scandit-web-datacapture-id";
import * as UI from "./ui";

const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: DataCaptureContext;
let idCapture: IdCapture;
let view: DataCaptureView;
let camera: Camera;

// Array of enabled document types
const supportedDocuments: IdDocumentType[] = [IdDocumentType.DLVIZ, IdDocumentType.IdCardVIZ];

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
  settings.supportedDocuments = supportedDocuments;
  settings.setShouldPassImageTypeToResult(IdImageType.Face, true);

  // Create the IdCapture mode with the new settings
  idCapture = await IdCapture.forContext(context, settings);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (idCaptureInstance: IdCapture, session) => {
      // Disable the IdCapture mode to handle the current result
      await idCapture.setEnabled(false);

      const capturedId = session.newlyCapturedId!;
      UI.showResult(capturedId);
      void idCapture.reset();
    },
    didRejectId: async () => {
      await idCapture.setEnabled(false);
      UI.showWarning("Document type not supported.");
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

run().catch((error) => {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
});

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatchAction: (action: UI.Action, ...arguments_: any) => void;
  }
}
