import type { IdCaptureSettings } from "@scandit/web-datacapture-id";
import { writable } from "svelte/store";
import { FeedbackType } from "./FeedbackType";

export interface ModalContentStore {
  title: string;
  content: string;
}

export const idCaptureSettingsStore = writable<IdCaptureSettings>();
export const idCaptureApplyingSettingStore = writable(false);
export const idCapturedFeedbackStore = writable(FeedbackType.SoundAndVibration);
export const idRejectedFeedbackStore = writable(FeedbackType.None);
export const idCaptureTimeoutFeedbackStore = writable(FeedbackType.None);
export const modalStore = writable<null | ModalContentStore>(null);
