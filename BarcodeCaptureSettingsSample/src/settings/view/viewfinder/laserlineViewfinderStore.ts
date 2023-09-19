import { barcodeCaptureOverlay, isSdkConfigured } from "@/store";
import {
  Color,
  LaserlineViewfinder,
  LaserlineViewfinderStyle,
  MeasureUnit,
  NumberWithUnit,
} from "scandit-web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export enum LaserlineViewfinderColorType {
  Default = "Default",
  Blue = "Blue",
  Red = "Red",
}

export const laserlineViewfinderColorMap = new Map([
  [LaserlineViewfinderColorType.Default, Color.fromRGBA(255, 255, 255, 1)],
  [LaserlineViewfinderColorType.Blue, Color.fromRGBA(0, 0, 255, 1)],
  [LaserlineViewfinderColorType.Red, Color.fromRGBA(255, 0, 0, 1)],
]);

export const laserlineViewfinder = writable({
  widthValue: 0.75,
  widthUnit: MeasureUnit.Fraction,
  color: LaserlineViewfinderColorType.Default,
});

export const laserlineViewfinderWidth = derived(
  laserlineViewfinder,
  ({ widthValue, widthUnit }) => new NumberWithUnit(widthValue, widthUnit)
);

export async function setLaserlineViewfinder(): Promise<void> {
  const viewfinderWidth = get(laserlineViewfinderWidth);
  const viewfinderColor = get(laserlineViewfinder).color;
  const viewfinder = new LaserlineViewfinder(LaserlineViewfinderStyle.Animated);
  viewfinder.width = viewfinderWidth;
  viewfinder.enabledColor = laserlineViewfinderColorMap.get(viewfinderColor)!;

  const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
  await $barcodeCaptureOverlay.setViewfinder(viewfinder);
}

export function setupLaserlineViewfinderStore(): void {
  laserlineViewfinder.subscribe(async () => {
    await setLaserlineViewfinder();
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupLaserlineViewfinderStore();
  }
});
