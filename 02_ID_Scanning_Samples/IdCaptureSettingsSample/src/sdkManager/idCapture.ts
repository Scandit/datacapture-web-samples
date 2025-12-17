import type {
  IdAnonymizationMode,
  IdCaptureTrigger,
  CapturedId,
  IdCaptureDocument,
  IdFieldType,
} from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  SingleSideScanner,
  IdCapture,
  IdCaptureSettings,
  IdImageType,
  IdCaptureOverlay,
  IdSide,
  FullDocumentScanner,
  IdCaptureFeedback,
  Duration,
  MobileDocumentScanner,
} from "@scandit/web-datacapture-id";
import type { SDKManager } from "./sdkManager";
import {
  idCaptureApplyingSettingStore,
  idCaptureSettingsStore,
  anonymizedFieldsStore,
} from "@/settings/id-capture/store";
import {
  dataConsistencyResult,
  frontReviewImage,
  scannedDocument,
  scannedDocumentBackFrameImage,
  scannedDocumentBackImage,
  scannedDocumentFaceImage,
  scannedDocumentFrontFrameImage,
  scannedDocumentFrontImage,
  showDataConsistency,
  showScanResults,
} from "@/store";
import { ScannerType } from "./enums";
import { FeedbackType } from "@/settings/id-capture/FeedbackType";
import type { Sound } from "@scandit/web-datacapture-core";
import { Feedback, Vibration } from "@scandit/web-datacapture-core";
import { showAlert } from "@/components/atoms/Alert";
import { parseNullableNumber } from "@/helper";
import { get } from "svelte/store";

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
  }

  public async didRejectId(capturedId: CapturedId, rejectedReason: RejectionReason): Promise<void> {
    const onAlertClosed: () => void = () => {
      void this.setEnabled(true);
    };

    let errorMessage: string | null = null;

    switch (rejectedReason) {
      case RejectionReason.InvalidFormat:
      case RejectionReason.NotAcceptedDocumentType: {
        errorMessage = "Invalid or unsupported document";
        break;
      }
      case RejectionReason.DocumentVoided: {
        errorMessage = "Document voided";
        break;
      }
      case RejectionReason.DocumentExpired: {
        errorMessage = "Document expired";
        break;
      }
      case RejectionReason.DocumentExpiresSoon: {
        errorMessage = "Document expires soon";
        break;
      }
      case RejectionReason.NotRealIdCompliant: {
        errorMessage = "Not Real ID Compliant";
        break;
      }
      case RejectionReason.HolderUnderage: {
        errorMessage = "Document holder is underage";
        break;
      }
      case RejectionReason.Timeout: {
        errorMessage =
          "Document capture failed. Make sure the document is well lit and free of glare. Alternatively, try scanning another document";

        // Add diagnostic JSON if available
        if (capturedId.rejectionDiagnosticJSON) {
          const formattedDiagnostic = JSON.stringify(JSON.parse(capturedId.rejectionDiagnosticJSON), null, 2);
          errorMessage += `\n\nDiagnostic Report:\n${formattedDiagnostic}`;
        }
        break;
      }
      case RejectionReason.InconsistentData: {
        const { dataConsistency } = capturedId.verificationResult;
        dataConsistencyResult.set(dataConsistency);
        if (dataConsistency) {
          const image = await dataConsistency.frontReviewImage();
          frontReviewImage.set(image);
          showDataConsistency.set(true);
          await this.setEnabled(false);
        } else {
          errorMessage = "Document with inconsistent data";
        }
        break;
      }
      case RejectionReason.SingleImageNotRecognized: {
        errorMessage = "Single image: nothing recognized. Id Capture was reset.";
        this.didRejectSingleImage(capturedId);
        break;
      }
      default:
      // nothing to do
    }

    if (errorMessage !== null) {
      await this.setEnabled(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      void showAlert("Error", errorMessage).then(onAlertClosed);
    }
  }

  public didRejectSingleImage(capturedId: CapturedId): void {
    scannedDocumentFrontFrameImage.set(capturedId.images.getFrame(IdSide.Front));
    scannedDocumentBackFrameImage.set(capturedId.images.getFrame(IdSide.Back));
    scannedDocument.set(capturedId);
    showScanResults.set(true);
  }

  public async setEnabled(enabled: boolean): Promise<void> {
    return this.idCapture.setEnabled(enabled);
  }

  public async reset(): Promise<void> {
    scannedDocumentFrontImage.set(null);
    scannedDocumentBackImage.set(null);
    scannedDocumentFaceImage.set(null);
    scannedDocumentFrontFrameImage.set(null);
    scannedDocumentBackFrameImage.set(null);
    scannedDocument.set(null);

    return this.idCapture.reset();
  }

  public async updateAcceptedDocuments(acceptedDocuments: IdCaptureDocument[]): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.acceptedDocuments = acceptedDocuments;
    await this.applyIdCaptureSettings(newSettings);

    // Reapply current anonymization fields to new document set
    await this.reapplyAnonymizationFields();
  }

  public async updateRejectedDocuments(rejectedDocuments: IdCaptureDocument[]): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectedDocuments = rejectedDocuments;
    await this.applyIdCaptureSettings(newSettings);

    // Reapply current anonymization fields to new document set
    await this.reapplyAnonymizationFields();
  }

  public async updatePhysicalScanner<T extends ScannerType>(
    ...parameters: T extends ScannerType.FullDocument
      ? [scannerType: T]
      : [scannerType: T, options: Pick<SingleSideScanner, "barcode" | "machineReadableZone" | "visualInspectionZone">]
  ): Promise<void> {
    const [scannerType, options] = parameters;
    const newSettings = this.idCaptureSettings.clone();
    newSettings.scanner.physicalDocument =
      scannerType === ScannerType.SingleSide
        ? new SingleSideScanner(options.barcode, options.machineReadableZone, options.visualInspectionZone)
        : new FullDocumentScanner();
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateMobileScanner(decodeMobileDriverLicenseViz: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    // For now we only support the OCR option
    newSettings.scanner.mobileDocument = decodeMobileDriverLicenseViz ? new MobileDocumentScanner() : null;
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
    const newSettings = this.idCaptureSettings.clone();
    newSettings.setShouldPassImageTypeToResult(IdImageType.Face, images.face);
    newSettings.setShouldPassImageTypeToResult(IdImageType.CroppedDocument, images.croppedDocument);
    newSettings.setShouldPassImageTypeToResult(IdImageType.Frame, images.frame);
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateAnonymizationMode(mode: string): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.anonymizationMode = mode as IdAnonymizationMode;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateCaptureTrigger(trigger: string): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.captureTrigger = trigger as IdCaptureTrigger;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectVoidedIds(rejectVoidedIds: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectVoidedIds = rejectVoidedIds;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectExpiredIds(rejectExpiredIds: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectExpiredIds = rejectExpiredIds;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectIdsExpiringIn(rejectIdsExpiringIn: string): Promise<void> {
    const days = parseNullableNumber(rejectIdsExpiringIn);
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectIdsExpiringIn = days == null ? null : new Duration(days, 0, 0);
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectNotRealIdCompliant(rejectNotRealIdCompliant: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectNotRealIdCompliant = rejectNotRealIdCompliant;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectInconsistentData(rejectInconsistentData: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectInconsistentData = rejectInconsistentData;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectHolderBelowAge(rejectHolderBelowAge: string): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.rejectHolderBelowAge = parseNullableNumber(rejectHolderBelowAge);
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectionTimeoutSeconds(rejectionTimeoutSeconds: string): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    const value = parseInt(rejectionTimeoutSeconds, 10);
    newSettings.rejectionTimeoutSeconds = isNaN(value) ? 6 : value;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateDecodeBackOfEuropeanDrivingLicense(decodeBackOfEuropeanDrivingLicense: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.decodeBackOfEuropeanDrivingLicense = decodeBackOfEuropeanDrivingLicense;

    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateNotifyOnSideCapture(notifyOnSideCapture: boolean): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.notifyOnSideCapture = notifyOnSideCapture;

    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateAnonymizedFields(selectedFields: Set<IdFieldType>): Promise<void> {
    const newSettings = this.idCaptureSettings.clone();
    newSettings.clearAnonymizedFields();

    // Get current documents (both accepted and rejected)
    const currentDocuments = [...this.idCaptureSettings.acceptedDocuments, ...this.idCaptureSettings.rejectedDocuments];

    // Add current fields to current documents
    for (const document of currentDocuments) {
      for (const fieldType of selectedFields) {
        newSettings.addAnonymizedField(document, fieldType);
      }
    }

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

  private async reapplyAnonymizationFields(): Promise<void> {
    // Get current anonymized fields from the store
    const currentFields = get(anonymizedFieldsStore);

    // Reapply the fields if there are any selected
    if (currentFields.size > 0) {
      await this.updateAnonymizedFields(currentFields);
    }
  }
}
