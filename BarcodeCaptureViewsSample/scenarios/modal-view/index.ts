import * as Scandit from "scandit-web-datacapture-barcode";
import {
  DataCaptureContext,
  BarcodeCaptureSettings,
  BarcodeCapture,
  BarcodeCaptureSession,
  Barcode,
} from "scandit-web-datacapture-barcode";

// Main DOM elements in the page.
const pageElements = {
  input: document.getElementById("input") as HTMLInputElement,
  modal: document.getElementById("modal") as HTMLInputElement,
  overlay: document.querySelector("#modal .overlay") as HTMLElement,
  captureHost: document.getElementById("data-capture-view") as HTMLElement,
};

async function run() {
  // Keep a reference to the context object.
  let context: DataCaptureContext;
  // Keep a reference to the barcode capture mode object.
  let barcodeCapture: BarcodeCapture;

  async function loadAndPrepareLibrary() {
    // Configure and load the library using your license key. The passed parameter represents the location of the wasm
    // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
    await Scandit.configure("YOUR_LICENSE_KEY_HERE", {
      libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
    });

    // Create the data capture context.
    context = Scandit.DataCaptureContext.create();

    // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
    // default and must be turned on to start streaming frames to the data capture context for recognition.
    context.setFrameSource(Scandit.Camera.default);

    // The barcode capturing process is configured through barcode capture settings,
    // they are then applied to the barcode capture instance that manages barcode recognition.
    const settings: BarcodeCaptureSettings = new Scandit.BarcodeCaptureSettings();

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
    barcodeCapture = Scandit.BarcodeCapture.forContext(context, settings);
    // Disable the barcode capture mode until the camera is accessed.
    barcodeCapture.isEnabled = false;

    // Register a listener to get informed whenever a new barcode got recognized.
    barcodeCapture.addListener({ didScan });

    // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
    // camera preview. The view must be connected to the data capture context.
    const view = Scandit.DataCaptureView.forContext(context);

    // Connect the data capture view to the HTML element.
    view.connectToElement(pageElements.captureHost);

    // Add a control to be able to switch cameras.
    view.addControl(new Scandit.CameraSwitchControl());
  }

  // Open our modal and start the camera to scan a barcode.
  async function openModal() {
    pageElements.modal.classList.remove("hidden");
    // This is just to allow a nice CSS transition when opening the modal.
    await wait(1);
    pageElements.modal.classList.add("open");
    // Start the camera. This can potentially fail, so we use try/catch.
    try {
      await context.frameSource!.switchToDesiredState(Scandit.FrameSourceState.On);
      barcodeCapture.isEnabled = true;
    } catch (e: any) {
      alert(`Could not start camera: ${e.toString()}`);
      closeModal();
    }
  }

  // Close the modal and switch off the camera.
  function closeModal() {
    pageElements.modal.classList.remove("open");
    pageElements.modal.classList.add("hidden");
    context.frameSource!.switchToDesiredState(Scandit.FrameSourceState.Off);
  }

  // When a scan happened, we populate the input and close the modal.
  function didScan(barcodeCapture: BarcodeCapture, session: BarcodeCaptureSession) {
    const barcode: Barcode = session.newlyRecognizedBarcodes[0];
    pageElements.input.value = barcode.data ?? "";
    pageElements.input.select();
    closeModal();
  }

  // Wait for X milliseconds
  async function wait(ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  // Load the library as soon as possible. This will make the user experience faster.
  await loadAndPrepareLibrary();

  // At this point the library was loaded, set up the UI elements (progressive enhancement).
  pageElements.input.placeholder = "Click to scan";
  pageElements.input.addEventListener("click", openModal);
  pageElements.overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

run().catch((e) => {
  alert(e);
  pageElements.input.placeholder = "Enter code manually";
});
