import * as SDCCore from "scandit-web-datacapture-core";
import * as SDCBarcode from "scandit-web-datacapture-barcode";

// Main DOM elements in the page.
const pageElements = {
  input: document.getElementById("input") as HTMLInputElement,
  modal: document.getElementById("modal") as HTMLInputElement,
  overlay: document.querySelector("#modal .overlay")!,
  captureHost: document.getElementById("data-capture-view")!,
};

async function run(): Promise<void> {
  // Keep a reference to the context object.
  let context: SDCCore.DataCaptureContext;
  // Keep a reference to the barcode capture mode object.
  let barcodeCapture: SDCBarcode.BarcodeCapture;

  async function loadAndPrepareLibrary(): Promise<void> {
    // Configure and load the library using your license key. The passed parameter represents the location of the wasm
    // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
    await SDCCore.configure({
      licenseKey: "YOUR_LICENSE_KEY_HERE",
      libraryLocation: new URL("../../library/engine/", document.baseURI).toString(),
      moduleLoaders: [SDCBarcode.barcodeCaptureLoader({ highEndBlurryRecognition: false })],
    });

    // Create the data capture context.
    context = await SDCCore.DataCaptureContext.create();

    // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
    // default and must be turned on to start streaming frames to the data capture context for recognition.
    await context.setFrameSource(SDCCore.Camera.default);

    // The barcode capturing process is configured through barcode capture settings,
    // they are then applied to the barcode capture instance that manages barcode recognition.
    const settings: SDCBarcode.BarcodeCaptureSettings = new SDCBarcode.BarcodeCaptureSettings();

    // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
    // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
    // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
    settings.enableSymbologies([
      SDCBarcode.Symbology.EAN13UPCA,
      SDCBarcode.Symbology.EAN8,
      SDCBarcode.Symbology.UPCE,
      SDCBarcode.Symbology.QR,
      SDCBarcode.Symbology.DataMatrix,
      SDCBarcode.Symbology.Code39,
      SDCBarcode.Symbology.Code128,
      SDCBarcode.Symbology.InterleavedTwoOfFive,
    ]);

    // Create a new barcode capture mode with the settings from above.
    barcodeCapture = await SDCBarcode.BarcodeCapture.forContext(context, settings);
    // Disable the barcode capture mode until the camera is accessed.
    await barcodeCapture.setEnabled(false);

    // Register a listener to get informed whenever a new barcode got recognized.
    barcodeCapture.addListener({ didScan });

    // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
    // camera preview. The view must be connected to the data capture context.
    const view = await SDCCore.DataCaptureView.forContext(context);

    // Connect the data capture view to the HTML element.
    view.connectToElement(pageElements.captureHost);

    // Add a control to be able to switch cameras.
    view.addControl(new SDCCore.CameraSwitchControl());
  }

  // Open our modal and start the camera to scan a barcode.
  async function openModal(): Promise<void> {
    pageElements.modal.classList.remove("hidden");
    // This is just to allow a nice CSS transition when opening the modal.
    await wait(1);
    pageElements.modal.classList.add("open");
    // Start the camera. This can potentially fail, so we use try/catch.
    try {
      await context.frameSource!.switchToDesiredState(SDCCore.FrameSourceState.On);
      await barcodeCapture.setEnabled(true);
    } catch (error: unknown) {
      const reason: string =
        typeof error === "object" && error != null && typeof error["toString"] === "function"
          ? error.toString()
          : "unknown error";
      alert(`Could not start camera: ${reason}`);
      closeModal();
    }
  }

  // Close the modal and switch off the camera.
  function closeModal(): void {
    pageElements.modal.classList.remove("open");
    pageElements.modal.classList.add("hidden");
    void context.frameSource!.switchToDesiredState(SDCCore.FrameSourceState.Off);
  }

  // When a scan happened, we populate the input and close the modal.
  async function didScan(
    barcodeCaptureMode: SDCBarcode.BarcodeCapture,
    session: SDCBarcode.BarcodeCaptureSession
  ): Promise<void> {
    const barcode: SDCBarcode.Barcode = session.newlyRecognizedBarcodes[0];
    await barcodeCapture.setEnabled(false);
    pageElements.input.value = barcode.data ?? "";
    pageElements.input.select();
    closeModal();
  }

  // Wait for X milliseconds
  async function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // Load the library as soon as possible. This will make the user experience faster.
  await loadAndPrepareLibrary();

  // At this point the library was loaded, set up the UI elements (progressive enhancement).
  pageElements.input.placeholder = "Click to scan";
  pageElements.input.addEventListener("click", openModal);
  pageElements.overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

run().catch((error) => {
  console.error(error);
  alert(error);
  pageElements.input.placeholder = "Enter code manually";
});
