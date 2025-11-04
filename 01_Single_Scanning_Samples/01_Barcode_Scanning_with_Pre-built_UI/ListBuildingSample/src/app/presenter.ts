import { effect } from "@preact/signals";
import type { Barcode, SparkScanBarcodeFeedback, SparkScanFeedbackDelegate } from "@scandit/web-datacapture-barcode";
import {
  SparkScan,
  SparkScanBarcodeErrorFeedback,
  SparkScanBarcodeSuccessFeedback,
  SparkScanSettings,
  SparkScanView,
  SparkScanViewSettings,
  Symbology,
  barcodeCaptureLoader,
} from "@scandit/web-datacapture-barcode";
import type { LoadingStatusSubscriber, ProgressInfo } from "@scandit/web-datacapture-core";
import { DataCaptureContext, loadingStatus } from "@scandit/web-datacapture-core";
import { ScannedItemModel } from "../scanned-item/model";
import { AppModel } from "./model";
import type { AppView } from "./view";

export class AppPresenter implements SparkScanFeedbackDelegate {
  private readonly model: AppModel = new AppModel();

  private dataCaptureContext?: DataCaptureContext;

  private sparkScanSettings?: SparkScanSettings;

  private sparkScan?: SparkScan;

  private sparkScanViewSettings?: SparkScanViewSettings;

  private sparkScanView?: SparkScanView;

  private disposeEffect?: VoidFunction;

  private readonly view: AppView;

  private readonly loadingStatusSubscriber: LoadingStatusSubscriber = this.onLoadingStatusProgress.bind(this);

  public constructor(view: AppView) {
    this.view = view;
  }

  public async connect(): Promise<void> {
    loadingStatus.subscribe(this.loadingStatusSubscriber);
    // Enter your Scandit License key here.
    // Your Scandit License key is available via your Scandit SDK web account.
    this.dataCaptureContext = await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
      libraryLocation: new URL("library/engine", document.baseURI).toString(),
      moduleLoaders: [barcodeCaptureLoader()],
    });
    this.sparkScanSettings = new SparkScanSettings();
    this.sparkScanSettings.enableSymbologies([Symbology.EAN13UPCA, Symbology.Code128]);
    this.sparkScan = SparkScan.forSettings(this.sparkScanSettings);
    this.sparkScanViewSettings = new SparkScanViewSettings();
    this.sparkScanView = SparkScanView.forElement(
      document.getElementById("spark-scan-ui")!,
      this.dataCaptureContext,
      this.sparkScan,
      this.sparkScanViewSettings
    );
    this.sparkScanView.feedbackDelegate = this;
    await this.sparkScanView.prepareScanning();
    this.disposeEffect = effect(() => {
      this.view.render(
        this.model.loadingPercentage,
        this.model.scannedItemsCount.value,
        this.model.scannedItemsList.value
      );
    });
  }

  public async disconnect(): Promise<void> {
    this.disposeEffect?.();
    await this.sparkScanView?.stopScanning();
    await this.dataCaptureContext?.dispose();
    loadingStatus.unsubscribe(this.loadingStatusSubscriber);
  }

  public getFeedbackForBarcode(barcode: Barcode): SparkScanBarcodeFeedback {
    if (barcode.data === "5901234123457") {
      return new SparkScanBarcodeErrorFeedback("Barcode rejected.", 60_000);
    }
    const scannedItemId = `${barcode.symbology}-${barcode.data ?? ""}`;
    const previouslyScannedItem = this.model.getScannedItemById(scannedItemId);
    if (previouslyScannedItem) {
      previouslyScannedItem.quantity++;
      this.model.didScan(scannedItemId, previouslyScannedItem);
      return new SparkScanBarcodeSuccessFeedback();
    }
    const scannedItem = new ScannedItemModel(barcode, 1);
    this.model.didScan(scannedItemId, scannedItem);
    return new SparkScanBarcodeSuccessFeedback();
  }

  public didTapClearListButton(): void {
    this.model.clearList();
  }

  private onLoadingStatusProgress(info: ProgressInfo): void {
    if (info.percentage != null) {
      this.model.setLoadingPercentage(info.percentage);
      this.view.render(
        this.model.loadingPercentage,
        this.model.scannedItemsCount.value,
        this.model.scannedItemsList.value
      );
    }
  }
}
