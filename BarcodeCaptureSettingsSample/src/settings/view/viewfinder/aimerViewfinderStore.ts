import { barcodeCaptureOverlay, isSdkConfigured } from "@/store";
import { AimerViewfinder, Color } from "@scandit/web-datacapture-core";
import { get, writable } from "svelte/store";

export enum AimerViewfinderColorType {
  Default = "Default",
  Blue = "Blue",
  Red = "Red",
}

export const aimerViewfinderColorMap = new Map([
  [AimerViewfinderColorType.Default, Color.fromRGBA(255, 255, 255, 1)],
  [AimerViewfinderColorType.Blue, Color.fromRGBA(0, 0, 255, 1)],
  [AimerViewfinderColorType.Red, Color.fromRGBA(255, 0, 0, 1)],
]);

export const aimerViewfinder = writable({
  frameColor: AimerViewfinderColorType.Default,
  dotColor: AimerViewfinderColorType.Default,
});

export async function setAimerViewfinder(): Promise<void> {
  const viewfinder = new AimerViewfinder();
  viewfinder.frameColor = aimerViewfinderColorMap.get(get(aimerViewfinder).frameColor)!;
  viewfinder.dotColor = aimerViewfinderColorMap.get(get(aimerViewfinder).dotColor)!;

  const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
  await $barcodeCaptureOverlay.setViewfinder(viewfinder);
}

export function setupAimerViewfinderStore(): void {
  aimerViewfinder.subscribe(async () => {
    await setAimerViewfinder();
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupAimerViewfinderStore();
  }
});
