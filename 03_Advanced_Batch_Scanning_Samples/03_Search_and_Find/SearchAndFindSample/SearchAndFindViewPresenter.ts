import type {
  Barcode,
  BarcodeFindViewUiListener,
  SparkScanListener,
  SparkScanSession,
  SparkScanViewUiListener,
} from "@scandit/web-datacapture-barcode";
import {
  barcodeCaptureLoader,
  BarcodeFind,
  BarcodeFindItem,
  BarcodeFindItemSearchOptions,
  BarcodeFindSettings,
  BarcodeFindView,
  SparkScan,
  SparkScanSettings,
  SparkScanView,
  Symbology,
} from "@scandit/web-datacapture-barcode";
import { DataCaptureContext, DataCaptureView } from "@scandit/web-datacapture-core";
import type { SearchAndFindView } from "./SearchAndFindView.js";

export class SearchAndFindViewPresenter
  implements SparkScanListener, SparkScanViewUiListener, BarcodeFindViewUiListener
{
  public sparkScanView?: SparkScanView;

  private dataCaptureContext?: DataCaptureContext;

  private dataCaptureView?: DataCaptureView;

  private sparkScanSettings?: SparkScanSettings;

  private sparkScan?: SparkScan;

  private barcodeFindSettings?: BarcodeFindSettings;

  private barcodeFind?: BarcodeFind;

  private barcodeFindView?: BarcodeFindView;

  private readonly symbologyList: Symbology[] = [
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.DataMatrix,
    Symbology.Code39,
    Symbology.Code128,
  ];

  private itemList: Barcode[] = [];

  private readonly searchAndFindView: SearchAndFindView;

  public constructor(searchAndFindView: SearchAndFindView) {
    this.searchAndFindView = searchAndFindView;
  }

  public async initialize(): Promise<void> {
    this.dataCaptureContext = await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
      libraryLocation: new URL("library/engine/", document.baseURI).toString(),
      moduleLoaders: [barcodeCaptureLoader()],
    });

    await this.switchToSparkScan();
  }

  public didScan(_sparkScan: SparkScan, session: SparkScanSession): void {
    if (session.newlyRecognizedBarcode != null) {
      this.itemList.push(session.newlyRecognizedBarcode);
      this.searchAndFindView.didScan(this.itemList);
    }
  }

  public async didTapBarcodeFindButton(view: SparkScanView): Promise<void> {
    if (this.itemList.length > 0) {
      await view.stopScanning();
      view.remove();
      await this.switchToBarcodeFind();
    }
  }

  public async didTapFinishButton(): Promise<void> {
    this.itemList = [];
    this.barcodeFindView?.remove();
    this.dataCaptureView?.detachFromElement();
    await this.switchToSparkScan();
  }

  public didTapClearListButton(): void {
    this.itemList = [];
  }

  private async switchToSparkScan(): Promise<void> {
    this.sparkScanSettings = new SparkScanSettings();
    this.sparkScanSettings.enableSymbologies(this.symbologyList);

    this.sparkScan = SparkScan.forSettings(this.sparkScanSettings);
    this.sparkScan.addListener(this);

    this.sparkScanView = SparkScanView.forElement(
      this.searchAndFindView.sparkScanViewRootElement,
      this.dataCaptureContext!,
      this.sparkScan
    );
    this.sparkScanView.barcodeFindButtonVisible = true;
    this.sparkScanView.setListener(this);

    this.searchAndFindView.switchToSparkScan();
    await this.sparkScanView.prepareScanning();
  }

  private async switchToBarcodeFind(): Promise<void> {
    this.dataCaptureView = await DataCaptureView.forContext(this.dataCaptureContext!);
    this.dataCaptureView.connectToElement(this.searchAndFindView.dataCaptureViewRootElement);

    this.barcodeFindSettings = new BarcodeFindSettings();
    this.barcodeFindSettings.enableSymbologies(this.symbologyList);

    this.barcodeFind = await BarcodeFind.forSettings(this.barcodeFindSettings);

    this.barcodeFindView = await BarcodeFindView.create(
      this.dataCaptureView,
      this.dataCaptureContext!,
      this.barcodeFind
    );

    this.barcodeFindView.setListener(this);

    this.searchAndFindView.switchToBarcodeFind();
    await this.barcodeFindView.startSearching();

    const itemList = this.itemList.map((item) => {
      const barcodeFindItemSearchOptions = new BarcodeFindItemSearchOptions(item.data ?? "");
      return new BarcodeFindItem(barcodeFindItemSearchOptions, null);
    });

    await this.barcodeFind.setItemList(itemList);
  }
}
