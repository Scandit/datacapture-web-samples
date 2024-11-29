import { useSymbologyStore } from "@/settings/barcode-capture/symbologies/symbology/store";
import { barcodeCapture, barcodeCaptureSettings, isSdkConfigured } from "@/store";
import type { CompositeType } from "@scandit/web-datacapture-barcode";
import { get, writable } from "svelte/store";

export const enabledCompositeTypes = writable(new Set<CompositeType>());

export async function enableCompositeTypes($enabledCompositeTypes: CompositeType[]): Promise<void> {
  const $barcodeCaptureSettings = get(barcodeCaptureSettings);
  const $barcodeCapture = get(barcodeCapture);
  $barcodeCaptureSettings.enabledCompositeTypes = $enabledCompositeTypes;
  await $barcodeCapture.applySettings($barcodeCaptureSettings);
}

export function enableSymbologiesForCompositeTypes($enabledCompositeTypes: CompositeType[]): void {
  const $barcodeCaptureSettings = get(barcodeCaptureSettings);
  $barcodeCaptureSettings.enableSymbologiesForCompositeTypes($enabledCompositeTypes);
  for (const enabledSymbology of $barcodeCaptureSettings.enabledSymbologies) {
    const enabledSymbologyStore = useSymbologyStore(enabledSymbology);
    enabledSymbologyStore.isEnabled.set(true);
  }
}

export function setupCompositeTypesStore(): void {
  enabledCompositeTypes.subscribe(($enabledCompositeTypes) => {
    void enableCompositeTypes([...$enabledCompositeTypes]);
    enableSymbologiesForCompositeTypes([...$enabledCompositeTypes]);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupCompositeTypesStore();
  }
});
