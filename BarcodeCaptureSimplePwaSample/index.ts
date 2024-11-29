import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  RectangularViewfinder,
  RectangularViewfinderLineStyle,
  RectangularViewfinderStyle,
  FrameSourceState,
  configure,
} from "@scandit/web-datacapture-core";
import type { Barcode, BarcodeCaptureSession, SymbologySettings } from "@scandit/web-datacapture-barcode";
import {
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureOverlayStyle,
  BarcodeCaptureSettings,
  Symbology,
  SymbologyDescription,
  barcodeCaptureLoader,
} from "@scandit/web-datacapture-barcode";

declare global {
  interface Window {
    continueScanning: () => Promise<void>;
  }
}

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(document.getElementById("data-capture-view")!);

  // Show the loading layer
  view.showProgressBar();

  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  await configure({
    licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [barcodeCaptureLoader()],
  });

  // Set the progress bar to be in an indeterminate state
  view.setProgressBarPercentage(null);
  view.setProgressBarMessage("Accessing Camera...");

  // Create the data capture context.
  const context: DataCaptureContext = await DataCaptureContext.create();

  // To visualize the ongoing barcode capturing process on screen, attach the data capture view that renders the
  // camera preview. The view must be connected to the data capture context.
  await view.setContext(context);

  // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
  // default and must be turned on to start streaming frames to the data capture context for recognition.
  const camera: Camera = Camera.default;
  const cameraSettings = BarcodeCapture.recommendedCameraSettings;
  await camera.applySettings(cameraSettings);
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
  const barcodeCaptureOverlay: BarcodeCaptureOverlay = await BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
    barcodeCapture,
    view,
    BarcodeCaptureOverlayStyle.Frame
  );

  // Register a listener to get informed whenever a new barcode got recognized.
  barcodeCapture.addListener({
    didScan: async (barcodeCaptureMode: BarcodeCapture, session: BarcodeCaptureSession) => {
      // Hide the viewfinder.
      await barcodeCaptureOverlay.setViewfinder(null);
      // Disable the capture of barcodes until the user closes the displayed result.
      await barcodeCapture.setEnabled(false);
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
  await camera.switchToDesiredState(FrameSourceState.On);
  await barcodeCapture.setEnabled(true);

  // The progress bar layer could be also hidden right after the configure phase
  view.hideProgressBar();
  function showResult(result: string): void {
    const resultElement = document.createElement("div");
    resultElement.className = "result";
    resultElement.innerHTML = `
      <p class="result-text"></p>
      <button onclick="continueScanning()">OK</button>
      `;
    document.querySelector("#data-capture-view")!.append(resultElement);
    document.querySelector("#data-capture-view .result-text")!.textContent = result;
  }

  window.continueScanning = async function continueScanning(): Promise<void> {
    for (const r of document.querySelectorAll(".result")!) r.remove();
    await barcodeCapture.setEnabled(true);
    // Restore the viewfinder.
    await barcodeCaptureOverlay.setViewfinder(viewfinder);
  };
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
