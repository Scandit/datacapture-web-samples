import { barcodeCaptureOverlay, isSdkConfigured } from "@/store";
import {
  Color,
  MeasureUnit,
  NumberWithUnit,
  RectangularViewfinder,
  RectangularViewfinderAnimation,
  RectangularViewfinderLineStyle,
  RectangularViewfinderStyle,
  SizeWithUnit,
  SizingMode,
} from "@scandit/web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export enum RectangularViewfinderColorType {
  Default = "Default",
  Blue = "Blue",
  Black = "Black",
}

export const rectangularViewfinderColorMap = new Map([
  [RectangularViewfinderColorType.Default, Color.fromRGBA(255, 255, 255, 1)],
  [RectangularViewfinderColorType.Blue, Color.fromRGBA(0, 0, 255, 1)],
  [RectangularViewfinderColorType.Black, Color.fromRGBA(0, 0, 0, 1)],
]);

export const rectangularViewfinder = writable({
  style: RectangularViewfinderStyle.Square,
  lineStyle: RectangularViewfinderLineStyle.Light,
  dimming: 0,
  color: RectangularViewfinderColorType.Default,
  animation: false,
  sizingMode: SizingMode.WidthAndHeight,
  widthValue: 0.8,
  widthUnit: MeasureUnit.Fraction,
  widthAspect: 0,
  heightValue: 0.32,
  heightUnit: MeasureUnit.Fraction,
  heightAspect: 0,
  shorterDimensionFraction: 0.75,
  longerDimensionAspect: 1,
});

export const rectangularViewfinderWidth = derived(
  rectangularViewfinder,
  ({ widthValue, widthUnit }) => new NumberWithUnit(widthValue, widthUnit)
);

export const rectangularViewfinderHeight = derived(
  rectangularViewfinder,
  ({ heightValue, heightUnit }) => new NumberWithUnit(heightValue, heightUnit)
);

export async function setRectangularViewfinder(): Promise<void> {
  const viewfinderStyle = get(rectangularViewfinder).style;
  const viewfinderLineStyle = get(rectangularViewfinder).lineStyle;
  const viewfinderDimming = get(rectangularViewfinder).dimming;
  const viewfinderColor = get(rectangularViewfinder).color;
  const viewfinderAnimation = get(rectangularViewfinder).animation;
  const viewfinderSizingMode = get(rectangularViewfinder).sizingMode;

  const viewfinder = new RectangularViewfinder(viewfinderStyle, viewfinderLineStyle);
  viewfinder.dimming = viewfinderDimming;
  viewfinder.color = rectangularViewfinderColorMap.get(viewfinderColor)!;
  viewfinder.animation = viewfinderAnimation ? new RectangularViewfinderAnimation(true) : null;

  if (viewfinderSizingMode === SizingMode.WidthAndHeight) {
    const viewfinderWidth = get(rectangularViewfinderWidth);
    const viewfinderHeight = get(rectangularViewfinderHeight);
    viewfinder.setSize(new SizeWithUnit(viewfinderWidth, viewfinderHeight));
  }

  if (viewfinderSizingMode === SizingMode.WidthAndAspectRatio) {
    const viewfinderWidth = get(rectangularViewfinderWidth);
    const viewfinderHeight = get(rectangularViewfinder).heightAspect;
    viewfinder.setWidthAndAspectRatio(viewfinderWidth, viewfinderHeight);
  }

  if (viewfinderSizingMode === SizingMode.HeightAndAspectRatio) {
    const viewfinderWidth = get(rectangularViewfinder).widthAspect;
    const viewfinderHeight = get(rectangularViewfinderHeight);
    viewfinder.setHeightAndAspectRatio(viewfinderHeight, viewfinderWidth);
  }

  if (viewfinderSizingMode === SizingMode.ShorterDimensionAndAspectRatio) {
    const viewfinderDimension = get(rectangularViewfinder).shorterDimensionFraction;
    const viewfinderAspect = get(rectangularViewfinder).longerDimensionAspect;
    viewfinder.setShorterDimensionAndAspectRatio(viewfinderDimension, viewfinderAspect);
  }

  const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
  await $barcodeCaptureOverlay.setViewfinder(viewfinder);
}

export function setupRectangularViewfinderStore(): void {
  rectangularViewfinder.subscribe(async () => {
    await setRectangularViewfinder();
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupRectangularViewfinderStore();
  }
});
