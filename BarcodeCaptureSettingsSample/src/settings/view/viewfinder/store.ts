import { setAimerViewfinder } from "@/settings/view/viewfinder/aimerViewfinderStore";
import { setRectangularViewfinder } from "@/settings/view/viewfinder/rectangularViewfinderStore";
import { barcodeCaptureOverlay, isSdkConfigured } from "@/store";
import { get, writable } from "svelte/store";

export enum ViewfinderType {
  None = "None",
  Rectangular = "Rectangular",
  Aimer = "Aimer",
}

export const viewfinderType = writable(ViewfinderType.None);

export function setupViewfinderStore(): void {
  viewfinderType.subscribe(async ($viewfinderType) => {
    const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
    if ($viewfinderType === ViewfinderType.None) {
      await $barcodeCaptureOverlay.setViewfinder(null);
      return;
    }
    if ($viewfinderType === ViewfinderType.Rectangular) {
      await setRectangularViewfinder();
      return;
    }
    await setAimerViewfinder();
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupViewfinderStore();
  }
});
