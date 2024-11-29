import { barcodeCaptureOverlay, isSdkConfigured } from "@/store";
import { Brush, Color } from "@scandit/web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export enum BrushType {
  Default = "Default",
  Red = "Red",
  Green = "Green",
}

export const brushType = writable(BrushType.Default);
export const brush = derived(brushType, (value) => {
  switch (value) {
    case BrushType.Default: {
      const transparent = Color.fromRGBA(0, 0, 0, 0);
      const white = Color.fromRGBA(255, 255, 255, 1);
      return new Brush(transparent, white, 2);
    }
    case BrushType.Green: {
      const green = Color.fromRGBA(0, 255, 0, 0.2);
      return new Brush(green, green, 1);
    }
    default: {
      const red = Color.fromRGBA(255, 0, 0, 0.2);
      return new Brush(red, red, 1);
    }
  }
});

export const shouldRemoveLocationsAfterScan = writable(true);

export async function setBrush(newBrush: Brush): Promise<void> {
  const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
  await $barcodeCaptureOverlay.setBrush(newBrush);
}

export async function setShouldRemoveLocationsAfterScan(value: boolean): Promise<void> {
  const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
  await $barcodeCaptureOverlay.setShouldRemoveLocationsAfterScan(value);
}

export function setupOverlayStore(): void {
  brush.subscribe((value) => {
    void setBrush(value);
  });

  shouldRemoveLocationsAfterScan.subscribe((value) => {
    void setShouldRemoveLocationsAfterScan(value);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupOverlayStore();
  }
});
