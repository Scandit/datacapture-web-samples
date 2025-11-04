import type { Barcode, BarcodeCaptureSession, SymbologySettings } from "@scandit/web-datacapture-barcode";
import {
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureSettings,
  Symbology,
  SymbologyDescription,
  barcodeCaptureLoader,
} from "@scandit/web-datacapture-barcode";
import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  RectangularViewfinder,
  RectangularViewfinderLineStyle,
  RectangularViewfinderStyle,
} from "@scandit/web-datacapture-core";

declare global {
  interface Window {
    continueScanning: () => Promise<void>;
  }
}

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view = new DataCaptureView();

  // Let the SDK select the best camera. Apply the recommended settings for barcode capture.
  const camera: Camera = Camera.pickBestGuess();
  const cameraSettings = BarcodeCapture.recommendedCameraSettings;
  await camera.applySettings(cameraSettings);

  // The camera is off by default and must be turned on. We start the stream before the configure phase.
  void camera.switchToDesiredState(FrameSourceState.On);

  // Connect the data capture view to the HTML element, passing it the camera to show it running as soon as possible.
  view.connectToElement(document.getElementById("data-capture-view")!, { camera });

  view.showProgressBar();

  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  const context: DataCaptureContext = await DataCaptureContext.forLicenseKey(
    "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    {
      libraryLocation: new URL("library/engine/", document.baseURI).toString(),
      moduleLoaders: [barcodeCaptureLoader()],
    }
  );

  view.hideProgressBar();

  // To visualize the ongoing barcode capturing process on screen, attach the data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  await view.setContext(context);

  // Set the camera as the frame source of the context to start streaming frames to the data capture context for recognition.
  await context.setFrameSource(camera);

  // The barcode capturing process is configured through barcode capture settings,
  // they are then applied to the barcode capture instance that manages barcode recognition.
  const settings: BarcodeCaptureSettings = new BarcodeCaptureSettings();

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  settings.enableSymbologies([
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.QR,
    Symbology.DataMatrix,
    Symbology.Code39,
    Symbology.Code128,
    Symbology.InterleavedTwoOfFive,
  ]);

  // Some linear/1D barcode symbologies allow you to encode variable-length data. By default, the Scandit
  // Data Capture SDK only scans barcodes in a certain length range. If your application requires scanning of one
  // of these symbologies, and the length is falling outside the default range, you may need to adjust the "active
  // symbol counts" for this symbology. This is shown in the following few lines of code for one of the
  // variable-length symbologies.
  const symbologySettings: SymbologySettings = settings.settingsForSymbology(Symbology.Code39);
  symbologySettings.activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  // Create a new barcode capture mode with the settings from above.
  const barcodeCapture = await BarcodeCapture.forContext(context, settings);
  // Disable the barcode capture mode until the camera is accessed.
  await barcodeCapture.setEnabled(false);

  // Add a control to be able to switch cameras.
  view.addControl(new CameraSwitchControl());

  // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
  // the video preview. This is optional, but recommended for better visual feedback.
  const barcodeCaptureOverlay: BarcodeCaptureOverlay = await BarcodeCaptureOverlay.withBarcodeCaptureForView(
    barcodeCapture,
    view
  );

  // Register a listener to get informed whenever a new barcode got recognized.
  barcodeCapture.addListener({
    didScan: async (barcodeCaptureMode: BarcodeCapture, session: BarcodeCaptureSession) => {
      // Disable the mode to avoid unwanted scan until the user closes the displayed result.
      await barcodeCaptureMode.setEnabled(false);
      // Hide the viewfinder.
      await barcodeCaptureOverlay.setViewfinder(null);
      const barcode: Barcode | null = session.newlyRecognizedBarcode;
      if (!barcode) {
        return;
      }
      const symbology: SymbologyDescription = new SymbologyDescription(barcode.symbology);
      showResult(`Scanned: ${barcode.data ?? ""}\n(${symbology.readableName})`);
    },
  });

  const viewfinder: RectangularViewfinder = new RectangularViewfinder(
    RectangularViewfinderStyle.Square,
    RectangularViewfinderLineStyle.Light
  );
  await barcodeCaptureOverlay.setViewfinder(viewfinder);

  // Switch the camera on to start streaming frames.
  // The camera is started asynchronously and will take some time to completely turn on.
  await context.frameSource?.switchToDesiredState(FrameSourceState.On);
  await barcodeCapture.setEnabled(true);

  async function continueScanning(): Promise<void> {
    for (const r of document.querySelectorAll(".result")!) {
      r.querySelector("button")?.removeEventListener("click", continueScanning);
      r.remove();
    }
    await barcodeCapture.setEnabled(true);
    // Restore the viewfinder.
    await barcodeCaptureOverlay.setViewfinder(viewfinder);
  }

  function showResult(result: string): void {
    const resultElement = document.createElement("div");
    resultElement.className = "result";

    const paragraph = document.createElement("p");
    paragraph.classList.add("result-text");

    const button = document.createElement("button");
    button.textContent = "OK";
    button.addEventListener("click", continueScanning, { once: true });

    resultElement.append(paragraph, button);
    resultElement.querySelector(".result-text")!.textContent = result;
    document.body.append(resultElement);
  }
}

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
