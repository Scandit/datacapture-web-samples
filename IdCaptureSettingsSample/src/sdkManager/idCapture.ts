import type { IdAnonymizationMode, IdCaptureTrigger, CapturedId, IdCaptureDocument } from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  SingleSideScanner,
  IdCapture,
  IdCaptureSettings,
  IdImageType,
  IdCaptureOverlay,
  IdSide,
  FullDocumentScanner,
  IdCaptureScanner,
  IdCaptureFeedback,
} from "@scandit/web-datacapture-id";
import type { SDKManager } from "./sdkManager";
import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "@/settings/id-capture/store";
import {
  scannedDocument,
  scannedDocumentBackFrameImage,
  scannedDocumentBackImage,
  scannedDocumentFaceImage,
  scannedDocumentFrontFrameImage,
  scannedDocumentFrontImage,
  showScanResults,
} from "@/store";
import { ScannerType } from "./enums";
import { FeedbackType } from "@/settings/id-capture/FeedbackType";
import type { Sound } from "@scandit/web-datacapture-core";
import { Feedback, Vibration } from "@scandit/web-datacapture-core";
import { showAlert } from "@/components/atoms/Alert";

interface NewSettings
  extends Partial<
    Pick<
      IdCaptureSettings,
      | "acceptedDocuments"
      | "rejectedDocuments"
      | "rejectVoidedIds"
      | "anonymizationMode"
      | "captureTrigger"
      | "decodeBackOfEuropeanDrivingLicense"
    >
  > {
  scanner?:
    | {
        type: ScannerType.SingleSide;
        options: Pick<SingleSideScanner, "barcode" | "machineReadableZone" | "visualInspectionZone">;
      }
    | {
        type: ScannerType.FullDocument;
      };
  images?: Record<IdImageType, boolean>;
}

function fromFeedbackType(feedbackType: FeedbackType, vibration: Vibration | null, sound: Sound | null): Feedback {
  switch (feedbackType) {
    case FeedbackType.None: {
      return new Feedback(null, null);
    }
    case FeedbackType.Vibration: {
      return new Feedback(vibration, null);
    }
    case FeedbackType.Sound: {
      return new Feedback(null, sound);
    }
    case FeedbackType.SoundAndVibration: {
      return new Feedback(vibration, sound);
    }
    default: {
      throw new Error("Unknown feedback type");
    }
  }
}

export class SDKIdCaptureManager {
  public idCapture: IdCapture;

  public idCaptureSettings: IdCaptureSettings;

  private readonly sdkManager: SDKManager;

  public constructor(sdkManager: SDKManager) {
    this.sdkManager = sdkManager;
  }

  public static cloneIdCaptureSettings(
    settings: IdCaptureSettings,
    newSettingsOptions: NewSettings
  ): IdCaptureSettings {
    const newSettings = new IdCaptureSettings();
    newSettings.acceptedDocuments = newSettingsOptions.acceptedDocuments ?? settings.acceptedDocuments;
    newSettings.rejectedDocuments = newSettingsOptions.rejectedDocuments ?? settings.rejectedDocuments;
    if (newSettingsOptions.scanner) {
      newSettings.scannerType =
        newSettingsOptions.scanner.type === ScannerType.SingleSide
          ? new SingleSideScanner(
              newSettingsOptions.scanner.options.barcode,
              newSettingsOptions.scanner.options.machineReadableZone,
              newSettingsOptions.scanner.options.visualInspectionZone
            )
          : new FullDocumentScanner();
    } else if (IdCaptureScanner.isFullDocumentScanner(settings.scannerType)) {
      newSettings.scannerType = new FullDocumentScanner();
    } else {
      const { options } = (settings.scannerType as SingleSideScanner).toJSONObject();
      newSettings.scannerType = new SingleSideScanner(
        options.barcode,
        options.machineReadableZone,
        options.visualInspectionZone
      );
    }
    newSettings.anonymizationMode = newSettingsOptions.anonymizationMode ?? settings.anonymizationMode;
    newSettings.captureTrigger = newSettingsOptions.captureTrigger ?? settings.captureTrigger;
    newSettings.rejectVoidedIds = newSettingsOptions.rejectVoidedIds ?? settings.rejectVoidedIds;
    newSettings.decodeBackOfEuropeanDrivingLicense =
      newSettingsOptions.decodeBackOfEuropeanDrivingLicense ?? settings.decodeBackOfEuropeanDrivingLicense;
    newSettings.setShouldPassImageTypeToResult(
      IdImageType.Face,
      newSettingsOptions.images?.face ?? settings.getShouldPassImageTypeToResult(IdImageType.Face)
    );
    newSettings.setShouldPassImageTypeToResult(
      IdImageType.CroppedDocument,
      newSettingsOptions.images?.croppedDocument ?? settings.getShouldPassImageTypeToResult(IdImageType.CroppedDocument)
    );
    newSettings.setShouldPassImageTypeToResult(
      IdImageType.Frame,
      newSettingsOptions.images?.frame ?? settings.getShouldPassImageTypeToResult(IdImageType.Frame)
    );
    return newSettings;
  }

  public async init(): Promise<void> {
    const settings = new IdCaptureSettings();
    await this.createIdCaptureInstance(settings);
  }

  public didCaptureId(capturedId: CapturedId): void {
    void this.setEnabled(false);

    scannedDocumentFrontImage.set(capturedId.images.getCroppedDocument(IdSide.Front));
    scannedDocumentBackImage.set(capturedId.images.getCroppedDocument(IdSide.Back));
    scannedDocumentFaceImage.set(capturedId.images.face);
    scannedDocumentFrontFrameImage.set(capturedId.images.getFrame(IdSide.Front));
    scannedDocumentBackFrameImage.set(capturedId.images.getFrame(IdSide.Back));
    scannedDocument.set(capturedId);
    showScanResults.set(true);

    void this.idCapture.reset();
  }

  public async didRejectId(_capturedId: CapturedId, rejectedReason: RejectionReason): Promise<void> {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onAlertClosed: () => void = () => {
      void this.setEnabled(true);
    };

    switch (rejectedReason) {
      case RejectionReason.InvalidFormat:
      case RejectionReason.NotAcceptedDocumentType: {
        await this.setEnabled(false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        void showAlert("Error", "Invalid or unsupported document").then(onAlertClosed);
        break;
      }
      case RejectionReason.DocumentVoided: {
        await this.setEnabled(false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        void showAlert("Error", "Document voided").then(onAlertClosed);
        break;
      }
      default:
      // nothing to do
    }
  }

  public async setEnabled(enabled: boolean): Promise<void> {
    return this.idCapture.setEnabled(enabled);
  }

  public async reset(): Promise<void> {
    return this.idCapture.reset();
  }

  public async updateAcceptedDocuments(acceptedDocuments: IdCaptureDocument[]): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, { acceptedDocuments });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectedDocuments(rejectedDocuments: IdCaptureDocument[]): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, { rejectedDocuments });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateScanner<T extends ScannerType>(
    ...parameters: T extends ScannerType.FullDocument
      ? [scannerType: T]
      : [scannerType: T, options: Pick<SingleSideScanner, "barcode" | "machineReadableZone" | "visualInspectionZone">]
  ): Promise<void> {
    const [scannerType, options] = parameters;
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, {
      scanner:
        scannerType === ScannerType.SingleSide
          ? {
              type: ScannerType.SingleSide,
              options,
            }
          : { type: ScannerType.FullDocument },
    });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async setIdCapturedFeedback(feedback: string): Promise<void> {
    const defaultVibration = IdCaptureFeedback.defaultFeedback.idCaptured.vibration;
    const defaultSound = IdCaptureFeedback.defaultFeedback.idCaptured.sound;
    this.idCapture.feedback.idCaptured = fromFeedbackType(feedback as FeedbackType, defaultVibration, defaultSound);
    return this.idCapture.setFeedback(this.idCapture.feedback);
  }

  public async setIdRejectedFeedback(feedback: string): Promise<void> {
    const { defaultVibration } = Vibration;
    const defaultSound = IdCaptureFeedback.defaultFailureSound;
    this.idCapture.feedback.idRejected = fromFeedbackType(feedback as FeedbackType, defaultVibration, defaultSound);
    return this.idCapture.setFeedback(this.idCapture.feedback);
  }

  // eslint-disable-next-line @typescript-eslint/require-await, class-methods-use-this
  public async updateResultWithImageTypes(images: Record<IdImageType, boolean>): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, { images });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateAnonymizationMode(mode: string): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, {
      anonymizationMode: mode as IdAnonymizationMode,
    });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateCaptureTrigger(trigger: string): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, {
      captureTrigger: trigger as IdCaptureTrigger,
    });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectVoidedIds(rejectVoidedIds: boolean): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, { rejectVoidedIds });
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateDecodeBackOfEuropeanDrivingLicense(decodeBackOfEuropeanDrivingLicense: boolean): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings, {
      decodeBackOfEuropeanDrivingLicense,
    });

    await this.applyIdCaptureSettings(newSettings);
  }

  public async applyIdCaptureSettings(newSettings: IdCaptureSettings): Promise<void> {
    idCaptureApplyingSettingStore.set(true);
    await this.idCapture.applySettings(newSettings);
    this.idCaptureSettings = newSettings;
    idCaptureSettingsStore.set(newSettings);
    idCaptureApplyingSettingStore.set(false);
  }

  private async createIdCaptureInstance(settings: IdCaptureSettings): Promise<void> {
    this.idCapture = await IdCapture.forContext(this.sdkManager.context, settings);
    this.idCaptureSettings = settings;
    await this.idCapture.setEnabled(false);
    this.idCapture.addListener({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      didCaptureId: this.didCaptureId.bind(this),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      didRejectId: this.didRejectId.bind(this),
    });

    const newOverlay = await IdCaptureOverlay.withIdCaptureForView(this.idCapture, this.sdkManager.dataCaptureView);

    // re-create overlay with previous overlay settings
    if ((this.sdkManager as { idCaptureOverlay: IdCaptureOverlay | undefined }).idCaptureOverlay) {
      const oldOverlaySettings = {
        capturedBrush: this.sdkManager.idCaptureOverlay.getCapturedBrush(),
        idLayoutStyle: this.sdkManager.idCaptureOverlay.idLayoutStyle,
        idLayoutLineStyle: this.sdkManager.idCaptureOverlay.idLayoutLineStyle,
        showTextHints: this.sdkManager.idCaptureOverlay.showTextHints,
      };
      newOverlay.idLayoutStyle = oldOverlaySettings.idLayoutStyle;
      newOverlay.idLayoutLineStyle = oldOverlaySettings.idLayoutLineStyle;
      newOverlay.showTextHints = oldOverlaySettings.showTextHints;
      await newOverlay.setCapturedBrush(oldOverlaySettings.capturedBrush);
    }
    this.sdkManager.idCaptureOverlay = newOverlay;
  }
}
