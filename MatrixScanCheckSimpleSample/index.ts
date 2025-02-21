import {
  type Barcode,
  BarcodeCheck,
  type BarcodeCheckAnnotation,
  BarcodeCheckCircleHighlight,
  BarcodeCheckCircleHighlightPreset,
  type BarcodeCheckHighlight,
  BarcodeCheckInfoAnnotation,
  BarcodeCheckInfoAnnotationAnchor,
  BarcodeCheckInfoAnnotationBodyComponent,
  BarcodeCheckInfoAnnotationHeader,
  BarcodeCheckSettings,
  BarcodeCheckView,
  Symbology,
  barcodeCaptureLoader,
} from "@scandit/web-datacapture-barcode";
import { Anchor, Brush, Color, DataCaptureContext, DataCaptureView, configure } from "@scandit/web-datacapture-core";

async function run(): Promise<void> {
  // To visualize the ongoing loading process on screen, the view must be connected before the configure phase.
  const view: DataCaptureView = new DataCaptureView();

  // Connect the data capture view to the HTML element.
  view.connectToElement(document.getElementById("data-capture-view")!);

  view.logoAnchor = Anchor.TopRight;

  // Show the loading layer
  view.showProgressBar();
  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
  // You must `await` the returned promise to be able to continue.
  await configure({
    licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [barcodeCaptureLoader({ highEndBlurryRecognition: false })],
  });

  // Set the progress bar to be in an indeterminate state
  view.setProgressBarPercentage(null);
  view.setProgressBarMessage("Accessing Camera...");

  // Create the data capture context.
  const context: DataCaptureContext = await DataCaptureContext.create();

  // The barcode tracking process is configured through barcode tracking settings,
  // they are then applied to the barcode tracking instance that manages barcode recognition.
  const settings: BarcodeCheckSettings = new BarcodeCheckSettings();

  // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
  // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
  // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
  const enabledSymbologies = [
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.Code39,
    Symbology.Code128,
    Symbology.QR,
    Symbology.DataMatrix,
  ];
  const enabledSymbologiesSet = new Set(enabledSymbologies);
  const eanSymbologiesSet = new Set([Symbology.EAN13UPCA, Symbology.EAN8, Symbology.UPCE]);
  const codeSymbologiesSet = new Set([Symbology.Code39, Symbology.Code128]);
  const twoDsymbologiesSet = new Set([Symbology.QR, Symbology.DataMatrix]);

  settings.enableSymbologies(enabledSymbologies);

  // Create a new barcode tracking mode with the settings from above.
  const barcodeCheck = await BarcodeCheck.forContext(context, settings);

  // Create the view
  const barcodeCheckView = await BarcodeCheckView.create(view, context, barcodeCheck);

  // Create the highlight provider and configure an highlight for the barcode
  barcodeCheckView.highlightProvider = {
    // biome-ignore lint/suspicious/useAwait: <explanation>
    async highlightForBarcode(barcode: Barcode, callback: (highlight: BarcodeCheckHighlight) => void): Promise<void> {
      if (enabledSymbologiesSet.has(barcode.symbology)) {
        const highlight = BarcodeCheckCircleHighlight.create(barcode, BarcodeCheckCircleHighlightPreset.Dot);
        const white = Color.fromRGBA(255, 255, 255);
        highlight.brush = new Brush(white, white, 0);
        callback(highlight);
      }
    },
  };

  // Create the annotation provider and configure an annotation for specific barcodes
  barcodeCheckView.annotationProvider = {
    // biome-ignore lint/suspicious/useAwait: <explanation>
    async annotationForBarcode(barcode: Barcode, callback: (highlight: BarcodeCheckAnnotation) => void): Promise<void> {
      // Get the information you want to show from your back end system/database
      if (eanSymbologiesSet.has(barcode.symbology)) {
        const header = BarcodeCheckInfoAnnotationHeader.create();
        header.text = "75% off";
        header.backgroundColor = Color.fromRGBA(255, 0, 0);

        const body = BarcodeCheckInfoAnnotationBodyComponent.create();
        body.text = "Item expired in 3 days";

        const infoAnnotation = BarcodeCheckInfoAnnotation.create(barcode);
        infoAnnotation.anchor = BarcodeCheckInfoAnnotationAnchor.Bottom;
        infoAnnotation.body = [body];
        infoAnnotation.header = header;
        callback(infoAnnotation);
      }

      if (codeSymbologiesSet.has(barcode.symbology)) {
        const header = BarcodeCheckInfoAnnotationHeader.create();
        header.text = "25% off";
        header.backgroundColor = Color.fromRGBA(246, 212, 56);

        const body = BarcodeCheckInfoAnnotationBodyComponent.create();
        body.text = "Item expired in 2 days";

        const infoAnnotation = BarcodeCheckInfoAnnotation.create(barcode);
        infoAnnotation.anchor = BarcodeCheckInfoAnnotationAnchor.Bottom;
        infoAnnotation.body = [body];
        infoAnnotation.header = header;
        callback(infoAnnotation);
      }

      if (twoDsymbologiesSet.has(barcode.symbology)) {
        const header = BarcodeCheckInfoAnnotationHeader.create();
        header.backgroundColor = Color.fromRGBA(240, 134, 31);

        header.text = "50% off";

        const body = BarcodeCheckInfoAnnotationBodyComponent.create();
        body.text = "Item expired in 1 days";

        const infoAnnotation = BarcodeCheckInfoAnnotation.create(barcode);
        infoAnnotation.anchor = BarcodeCheckInfoAnnotationAnchor.Bottom;
        infoAnnotation.body = [body];
        infoAnnotation.header = header;
        callback(infoAnnotation);
      }
    },
  };

  await barcodeCheckView.start();
  view.hideProgressBar();
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
