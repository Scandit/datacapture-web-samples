import {
  SparkScanViewSettings,
  SparkScan,
  SparkScanSettings,
  SparkScanView,
  Symbology,
  barcodeCaptureLoader,
  SparkScanBarcodeErrorFeedback,
  SparkScanBarcodeSuccessFeedback,
} from "@scandit/web-datacapture-barcode";
import type { Barcode, SparkScanBarcodeFeedback, SparkScanFeedbackDelegate } from "@scandit/web-datacapture-barcode";
import { AppModel } from "./model";
import type { LoadingStatusSubscriber, ProgressInfo } from "@scandit/web-datacapture-core";
import { DataCaptureContext, configure, loadingStatus } from "@scandit/web-datacapture-core";
import { effect } from "@preact/signals";
import type { AppView } from "./view";
import { ScannedItemModel } from "../scanned-item/model";

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
    await configure({
      libraryLocation: new URL("library/engine", document.baseURI).toString(),
      licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
      moduleLoaders: [barcodeCaptureLoader()],
    });
    this.dataCaptureContext = await DataCaptureContext.create();
    this.sparkScanSettings = new SparkScanSettings();
    this.sparkScanSettings.enableSymbologies([Symbology.EAN13UPCA, Symbology.Code128]);
    this.sparkScan = SparkScan.forSettings(this.sparkScanSettings);
    this.sparkScanViewSettings = new SparkScanViewSettings();
    this.sparkScanView = SparkScanView.forElement(
      document.body,
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
