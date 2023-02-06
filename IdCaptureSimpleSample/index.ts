/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCId from "scandit-web-datacapture-id";
import * as UI from "./ui";

const LICENSE_KEY = "YOUR_LICENSE_KEY_HERE";

let context: SDCCore.DataCaptureContext;
let idCapture: SDCId.IdCapture;
let view: SDCCore.DataCaptureView;
let camera: SDCCore.Camera;
//
// Array of enabled document types
const supportedDocuments: SDCId.IdDocumentType[] = [SDCId.IdDocumentType.DLVIZ, SDCId.IdDocumentType.IdCardVIZ];

async function run(): Promise<void> {
  // Configure the library
  await SDCCore.configure({
    licenseKey: LICENSE_KEY,
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [SDCId.idCaptureLoader({ enableVIZDocuments: true })],
  });

  // Create the context (it will use the license key passed to configure by default)
  context = await SDCCore.DataCaptureContext.create();

  // Set the default camera as frame source. Apply the recommended settings from the IdCapture mode.
  camera = SDCCore.Camera.default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await camera.applySettings(SDCId.IdCapture.recommendedCameraSettings);
  await context.setFrameSource(camera);

  // Create the view and connect it to the DOM
  view = await SDCCore.DataCaptureView.forContext(context);
  view.connectToElement(UI.elements.dataCaptureView);
  view.addControl(new SDCCore.CameraSwitchControl());

  // Create the IdCapture settings needed for the selected mode
  const settings = new SDCId.IdCaptureSettings();
  settings.supportedDocuments = supportedDocuments;

  // Create the IdCapture mode with the new settings
  idCapture = await SDCId.IdCapture.forContext(context, settings);

  // Setup the listener to get notified about results
  idCapture.addListener({
    didCaptureId: async (idCaptureInstance: SDCId.IdCapture, session) => {
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
  await SDCId.IdCaptureOverlay.withIdCaptureForView(idCapture, view);

  // Disable the IdCapture mode until the camera is accessed
  await idCapture.setEnabled(false);

  // Finally, switch on the camera
  await camera.switchToDesiredState(SDCCore.FrameSourceState.On);
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
  alert(error);
});

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatchAction: (action: UI.Action, ...arguments_: any) => void;
  }
}
