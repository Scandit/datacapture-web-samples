import { barcodeCapture, isSdkConfigured } from "@/store";
import { BrowserHelper, Feedback, Sound, Vibration } from "@scandit/web-datacapture-core";
import { get, readable, writable } from "svelte/store";

export const isSoundEnabled = writable(true);
export const isVibrationEnabled = writable(true);
export const isVibrationSupported = readable(!BrowserHelper.isDesktopDevice());

export function enableSound(enabled: boolean): void {
  const $barcodeCapture = get(barcodeCapture);
  const { vibration } = $barcodeCapture.feedback.success;
  const sound = enabled ? Sound.defaultSound : null;
  $barcodeCapture.feedback.success = new Feedback(vibration, sound);
}

export function enableVibration(enabled: boolean): void {
  const $barcodeCapture = get(barcodeCapture);
  const vibration = enabled ? Vibration.defaultVibration : null;
  const { sound } = $barcodeCapture.feedback.success;
  $barcodeCapture.feedback.success = new Feedback(vibration, sound);
}

export function setupFeedbackStore(): void {
  isSoundEnabled.subscribe(($isSoundEnabled) => {
    enableSound($isSoundEnabled);
  });

  isVibrationEnabled.subscribe(($isVibrationEnabled) => {
    enableVibration($isVibrationEnabled);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupFeedbackStore();
  }
});
