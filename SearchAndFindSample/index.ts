import {
  DataCaptureContext,
  AimerViewfinder,
  Brush,
  Color,
  DataCaptureView,
  FrameSourceState,
  configure,
  Camera,
  RectangularLocationSelection,
  MeasureUnit,
  NumberWithUnit,
} from "@scandit/web-datacapture-core";
import type {
  BarcodeCaptureListener,
  BarcodeCaptureSession,
  BarcodeFindViewUiListener,
} from "@scandit/web-datacapture-barcode";
import {
  BarcodeFindView,
  BarcodeFindItem,
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureOverlayStyle,
  BarcodeCaptureSettings,
  BarcodeFindItemSearchOptions,
  BarcodeFindSettings,
  Symbology,
  barcodeCaptureLoader,
  BarcodeFind,
} from "@scandit/web-datacapture-barcode";

import type { ListViewEventMap } from "./components/organisms/ListView.js";
import { ListView } from "./components/organisms/ListView.js";
import type { StateModel } from "./store.js";
import { store } from "./store.js";

class Presenter implements BarcodeFindViewUiListener, BarcodeCaptureListener {
  private context: DataCaptureContext | null = null;

  private dataCaptureView: DataCaptureView | null = null;

  private barcodeCapture: BarcodeCapture | null = null;

  private barcodeFind: BarcodeFind | null = null;

  private barcodeFindView: BarcodeFindView | null = null;

  private barcodeCaptureOverlay: BarcodeCaptureOverlay | null = null;

  private readonly state: StateModel;

  private readonly listView: ListView;

  private readonly symbologyList: Symbology[] = [
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.Code39,
    Symbology.Code128,
    Symbology.DataMatrix,
  ];

  private readonly rootCaptureElement: HTMLElement;

  public constructor(state: StateModel, listView: ListView) {
    this.state = state;
    this.listView = listView;
    this.listView.on("barcode-list-clicked", this.switchToFindMode);
    this.rootCaptureElement = document.getElementById("data-capture-view")!;
  }

  public async configure(): Promise<void> {
    this.dataCaptureView = new DataCaptureView();
    this.dataCaptureView.connectToElement(this.rootCaptureElement);
    this.dataCaptureView.showProgressBar();
    // Enter your Scandit License key here.
    // Your Scandit License key is available via your Scandit SDK web account.
    // The passed parameter represents the location of the wasm file, which will be fetched asynchronously.
    // You must `await` the returned promise to be able to continue.
    await configure({
      licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
      libraryLocation: new URL("library/engine/", document.baseURI).toString(),
      moduleLoaders: [barcodeCaptureLoader({ highEndBlurryRecognition: false })],
    });
    this.context = await DataCaptureContext.create();

    await this.dataCaptureView.setContext(this.context);
    this.dataCaptureView.setProgressBarMessage("Accessing Camera...");
    await this.context.setFrameSource(Camera.default);
    this.dataCaptureView.hideProgressBar();
  }

  public async switchToCaptureMode(): Promise<void> {
    const settings: BarcodeCaptureSettings = new BarcodeCaptureSettings();
    this.barcodeCapture = await BarcodeCapture.forContext(this.context, settings);
    await (this.context?.frameSource as Camera).applySettings(BarcodeCapture.recommendedCameraSettings);
    await this.context?.frameSource?.switchToDesiredState(FrameSourceState.On);

    // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
    //  sample, we enable a very generous set of symbologies. In your own app ensure that you only enable the
    // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
    settings.enableSymbologies(this.symbologyList);

    settings.codeDuplicateFilter = 800;
    settings.locationSelection = RectangularLocationSelection.withWidthAndAspectRatio(
      new NumberWithUnit(0.3, MeasureUnit.Fraction),
      1
    );

    // Register a listener to get updates about scanned barcodes.
    this.barcodeCapture.addListener(this);

    // Add a barcode capture overlay to the data capture view to render.
    // This is optional but recommended for better visual feedback.
    this.barcodeCaptureOverlay = await BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
      this.barcodeCapture,
      this.dataCaptureView,
      BarcodeCaptureOverlayStyle.Frame
    );

    // Set the color of the Brush for the overlay when a barcode will be detected.
    const brush = new Brush(Color.fromHex("#00FF00"), Color.fromHex("#00FF00"), 1);
    await this.barcodeCaptureOverlay.setBrush(brush);

    // Create a view finder and add it to the overlay
    const viewfinder = new AimerViewfinder();
    await this.barcodeCaptureOverlay.setViewfinder(viewfinder);
    await this.barcodeCapture.setEnabled(true);
  }

  public switchToFindMode = async (_event: ListViewEventMap["barcode-list-clicked"]["event"]): Promise<void> => {
    await this.restart();

    const settings = new BarcodeFindSettings();
    settings.enableSymbologies(this.symbologyList);
    this.barcodeFind = await BarcodeFind.forSettings(settings);

    const barcode = this.state.getLastScannedCode();
    await this.listView.hide();
    const items = [new BarcodeFindItem(new BarcodeFindItemSearchOptions(barcode.data ?? ""), null)];

    this.barcodeFindView = await BarcodeFindView.create(this.dataCaptureView!, this.context!, this.barcodeFind);

    this.barcodeFindView.setListener(this);
    await this.barcodeFindView.startSearching();
    await this.barcodeFind.setItemList(items);
  };

  public async restart(): Promise<void> {
    if (this.barcodeCaptureOverlay != null) {
      await this.dataCaptureView?.removeOverlay(this.barcodeCaptureOverlay);
    }
    this.barcodeCapture?.removeListener(this);
    await this.context?.removeAllModes();
    this.barcodeFindView?.remove();
  }

  public async didTapFinishButton(_foundItems: BarcodeFindItem[]): Promise<void> {
    this.state.removeAllCodes();
    await this.restart();
    await this.switchToCaptureMode();
  }

  public async didScan(_mode: BarcodeCapture, session: BarcodeCaptureSession): Promise<void> {
    const barcode = session.newlyRecognizedBarcode;
    if (barcode) {
      this.state.addCode(barcode);
      await this.listView.show();
    }
  }
}

async function run(): Promise<void> {
  const listView = new ListView(store);
  document.getElementById("list-view")?.append(listView);

  const presenter = new Presenter(store, listView);
  await presenter.configure();
  await presenter.switchToCaptureMode();
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
