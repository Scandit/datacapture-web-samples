import type { IdDocumentType, IdCaptureSession, IdAnonymizationMode, SupportedSides } from "scandit-web-datacapture-id";
import {
  IdCapture,
  IdCaptureSettings,
  IdImageType,
  IdCaptureOverlay,
  IdCaptureFeedback,
  CapturedResultType,
} from "scandit-web-datacapture-id";
import type { SDKManager } from "./sdkManager";
import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "@/settings/id-capture/store";
import {
  scannedDocument,
  scannedDocumentBackImage,
  scannedDocumentFaceImage,
  scannedDocumentFrontImage,
  showScanResults,
} from "@/store";
import { get } from "svelte/store";
import { layout } from "@/settings/view/overlay/store";
import { FeedbackType } from "@/settings/id-capture/FeedbackType";
import { Vibration, type Sound } from "scandit-web-datacapture-core";
import { Feedback } from "scandit-web-datacapture-core";

function fromFeedbackType(feedbackType: FeedbackType, vibration: Vibration | null, sound: Sound | null): Feedback {
  switch (feedbackType) {
    case FeedbackType.None:
      return new Feedback(null, null);
    case FeedbackType.Vibration:
      return new Feedback(vibration, null);
    case FeedbackType.Sound:
      return new Feedback(null, sound);
    case FeedbackType.SoundAndVibration:
      return new Feedback(vibration, sound);
    default:
      throw new Error("Unknown feedback type");
  }
}

export class SDKIdCaptureManager {
  public idCapture: IdCapture;

  public idCaptureSettings: IdCaptureSettings;

  private readonly sdkManager: SDKManager;

  public constructor(sdkManager: SDKManager) {
    this.sdkManager = sdkManager;
  }

  private static cloneIdCaptureSettings(settings: IdCaptureSettings): IdCaptureSettings {
    const newSettings = new IdCaptureSettings();
    newSettings.supportedSides = settings.supportedSides;
    newSettings.supportedDocuments = [...settings.supportedDocuments];
    newSettings.anonymizationMode = settings.anonymizationMode;
    newSettings.setShouldPassImageTypeToResult(
      IdImageType.Face,
      settings.getShouldPassImageTypeToResult(IdImageType.Face)
    );
    newSettings.setShouldPassImageTypeToResult(
      IdImageType.IdBack,
      settings.getShouldPassImageTypeToResult(IdImageType.IdBack)
    );
    newSettings.setShouldPassImageTypeToResult(
      IdImageType.IdFront,
      settings.getShouldPassImageTypeToResult(IdImageType.IdFront)
    );
    newSettings.rejectVoidedIds = settings.rejectVoidedIds;
    return newSettings;
  }

  public async init(): Promise<void> {
    const settings = new IdCaptureSettings();
    settings.supportedDocuments = [];
    await this.createIdCaptureInstance(settings);
  }

  public didCaptureId(idCapture: IdCapture, idCaptureSession: IdCaptureSession): void {
    const capturedId = idCaptureSession.newlyCapturedId;
    if (!capturedId) {
      return;
    }

    const isVIZDocument = capturedId.capturedResultTypes.includes(CapturedResultType.VIZResult);
    scannedDocumentFrontImage.set(capturedId.idImageOfType(IdImageType.IdFront));
    scannedDocumentBackImage.set(capturedId.idImageOfType(IdImageType.IdBack));
    scannedDocumentFaceImage.set(capturedId.idImageOfType(IdImageType.Face));

    if (isVIZDocument) {
      if (
        capturedId[CapturedResultType.VIZResult]?.capturedSides === this.idCaptureSettings.supportedSides ||
        capturedId[CapturedResultType.VIZResult]?.isBackSideCaptureSupported === false
      ) {
        void this.setEnabled(false);
        scannedDocument.set(capturedId);
        showScanResults.set(true);
        void idCapture.reset();
      }
    } else {
      scannedDocument.set(capturedId);
      showScanResults.set(true);
      void this.setEnabled(false);
    }
  }

  public async setEnabled(enabled: boolean): Promise<void> {
    return this.idCapture.setEnabled(enabled);
  }

  public async reset(): Promise<void> {
    return this.idCapture.reset();
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

  public async setIdCaptureTimeoutFeedback(feedback: string): Promise<void> {
    const { defaultVibration } = Vibration;
    const defaultSound = IdCaptureFeedback.defaultFailureSound;
    this.idCapture.feedback.idCaptureTimeout = fromFeedbackType(
      feedback as FeedbackType,
      defaultVibration,
      defaultSound
    );
    return this.idCapture.setFeedback(this.idCapture.feedback);
  }

  public async updateSupportedDocuments(documents: IdDocumentType[]): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings);
    newSettings.supportedDocuments = documents;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateSupportedSides(sides: string): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings);
    newSettings.supportedSides = sides as SupportedSides;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateResultWithImageTypes(types: Record<IdImageType, boolean>): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings);
    for (const [type, shouldPass] of Object.entries(types)) {
      newSettings.setShouldPassImageTypeToResult(type as IdImageType, shouldPass);
    }
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateAnonymizationMode(mode: string): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings);
    newSettings.anonymizationMode = mode as IdAnonymizationMode;
    await this.applyIdCaptureSettings(newSettings);
  }

  public async updateRejectVoidedIds(rejectVoidedIds: boolean): Promise<void> {
    const newSettings = SDKIdCaptureManager.cloneIdCaptureSettings(this.idCaptureSettings);
    newSettings.rejectVoidedIds = rejectVoidedIds;
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
    this.idCapture.addListener(this);

    const newOverlay = await IdCaptureOverlay.withIdCaptureForView(this.idCapture, this.sdkManager.dataCaptureView);

    // re-create overlay with previous overlay settings
    if ((this.sdkManager as { idCaptureOverlay: IdCaptureOverlay | undefined }).idCaptureOverlay) {
      const oldOverlaySettings = {
        capturedBrush: this.sdkManager.idCaptureOverlay.getCapturedBrush(),
        idLayout: get(layout),
        idLayoutStyle: this.sdkManager.idCaptureOverlay.idLayoutStyle,
        idLayoutLineStyle: this.sdkManager.idCaptureOverlay.idLayoutLineStyle,
        showTextHints: this.sdkManager.idCaptureOverlay.showTextHints,
      };
      newOverlay.setIdLayout(oldOverlaySettings.idLayout);
      newOverlay.idLayoutStyle = oldOverlaySettings.idLayoutStyle;
      newOverlay.idLayoutLineStyle = oldOverlaySettings.idLayoutLineStyle;
      newOverlay.showTextHints = oldOverlaySettings.showTextHints;
      await newOverlay.setCapturedBrush(oldOverlaySettings.capturedBrush);
    }
    this.sdkManager.idCaptureOverlay = newOverlay;
  }
}
