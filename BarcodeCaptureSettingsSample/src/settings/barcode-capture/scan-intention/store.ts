import { barcodeCapture, barcodeCaptureSettings, isSdkConfigured } from "@/store";
import { get, writable } from "svelte/store";
import { ScanIntention } from "@scandit/web-datacapture-barcode";

export const scanIntention = writable(ScanIntention.Smart);

export function setupScanIntentionStore(): void {
  scanIntention.subscribe(async ($scanIntention) => {
    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    $barcodeCaptureSettings.scanIntention = $scanIntention;
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupScanIntentionStore();
  }
});
