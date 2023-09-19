import { barcodeCapture, barcodeCaptureSettings, isSdkConfigured } from "@/store";
import { get, writable } from "svelte/store";

export const codeDuplicateFilter = writable(0);

export function setupCodeDuplicateFilterStore(): void {
  codeDuplicateFilter.subscribe(async ($codeDuplicateFilter) => {
    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    $barcodeCaptureSettings.codeDuplicateFilter = $codeDuplicateFilter;
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupCodeDuplicateFilterStore();
  }
});
