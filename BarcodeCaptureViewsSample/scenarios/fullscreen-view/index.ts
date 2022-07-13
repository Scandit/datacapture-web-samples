import * as Scandit from "scandit-web-datacapture-barcode";
import {
  DataCaptureContext,
  Camera,
  BarcodeCaptureSettings,
  BarcodeCapture,
  BarcodeCaptureSession,
  Barcode,
  SymbologyDescription,
} from "scandit-web-datacapture-barcode";

declare global {
  interface Window {
    continueScanning: any;
  }
}

async function run() {
  // Configure and load the library using your license key. The passed parameter represents the location of the wasm
  // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
  await Scandit.configure("YOUR_LICENSE_KEY_HERE", {
    libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
  });

  // Create the data capture context.
  const context: DataCaptureContext = Scandit.DataCaptureContext.create();

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  const camera: Camera = Scandit.Camera.default;
  context.setFrameSource(camera);

  // The barcode capturing process is configured through barcode capture settings,
  // they are then applied to the barcode capture instance that manages barcode recognition.
  const settings: BarcodeCaptureSettings = new Scandit.BarcodeCaptureSettings();

  // Filter out duplicate barcodes for 1 second.
  settings.codeDuplicateFilter = 1000;

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  settings.enableSymbologies([
    Scandit.Symbology.EAN13UPCA,
    Scandit.Symbology.EAN8,
    Scandit.Symbology.UPCE,
    Scandit.Symbology.QR,
    Scandit.Symbology.DataMatrix,
    Scandit.Symbology.Code39,
    Scandit.Symbology.Code128,
    Scandit.Symbology.InterleavedTwoOfFive,
  ]);

  // Create a new barcode capture mode with the settings from above.
  const barcodeCapture = Scandit.BarcodeCapture.forContext(context, settings);
  // Disable the barcode capture mode until the camera is accessed.
  barcodeCapture.isEnabled = false;

  // Register a listener to get informed whenever a new barcode got recognized.
  barcodeCapture.addListener({
    didScan: (barcodeCapture: BarcodeCapture, session: BarcodeCaptureSession) => {
      const barcode: Barcode = session.newlyRecognizedBarcodes[0];
      const symbology: SymbologyDescription = new Scandit.SymbologyDescription(barcode.symbology);
      showResult(`${barcode.data!} (${symbology.readableName})`);
    },
  });

  // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  const view = Scandit.DataCaptureView.forContext(context);

  // Connect the data capture view to the HTML element.
  view.connectToElement(document.getElementById("data-capture-view")!);

  // Add a control to be able to switch cameras.
  view.addControl(new Scandit.CameraSwitchControl());

  // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  Scandit.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
    barcodeCapture,
    view,
    Scandit.BarcodeCaptureOverlayStyle.Frame
  );

  // Switch the camera on to start streaming frames.
  await camera.switchToDesiredState(Scandit.FrameSourceState.On);
  barcodeCapture.isEnabled = true;

  function showResult(result: string) {
    const resultElement = document.createElement("div");
    resultElement.className = "result";
    resultElement.innerHTML = `<p>${result}</p><button onclick="continueScanning()">OK</button>`;
    document.querySelector("#data-capture-view")!.appendChild(resultElement);
  }

  window.continueScanning = function continueScanning() {
    document.querySelectorAll(".result")!.forEach((r) => r.remove());
    barcodeCapture.isEnabled = true;
  };
}

run().catch((e) => alert(e));
