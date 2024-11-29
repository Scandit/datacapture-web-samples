import { dataCaptureView, isSdkConfigured } from "@/store";
import { Anchor, LogoStyle, MeasureUnit, NumberWithUnit, PointWithUnit } from "@scandit/web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export const logoStyles = Object.values(LogoStyle);
export const anchors = Object.values(Anchor);
export const measureUnits = Object.values(MeasureUnit);

export const style = writable(LogoStyle.Extended);
export const anchor = writable(Anchor.BottomRight);
export const offsetXValue = writable(0);
export const offsetXUnit = writable(MeasureUnit.Fraction);
export const offsetX = derived([offsetXValue, offsetXUnit], ([value, unit]) => new NumberWithUnit(value, unit));
export const offsetYValue = writable(0);
export const offsetYUnit = writable(MeasureUnit.Fraction);
export const offsetY = derived([offsetYValue, offsetYUnit], ([value, unit]) => new NumberWithUnit(value, unit));
export const offset = derived([offsetX, offsetY], ([x, y]) => new PointWithUnit(x, y));

export function setupLogoStore(): void {
  style.subscribe((value) => {
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.logoStyle = value;
  });

  anchor.subscribe((value) => {
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.logoAnchor = value;
  });

  offset.subscribe((value) => {
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.logoOffset = value;
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupLogoStore();
  }
});
