import { barcodeCaptureOverlay, dataCaptureView, isSdkConfigured } from "@/store";
import { MarginsWithUnit, MeasureUnit, NumberWithUnit } from "@scandit/web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export const marginTopValue = writable(0);
export const marginTopUnit = writable(MeasureUnit.Fraction);
export const marginTop = derived([marginTopValue, marginTopUnit], ([value, unit]) => new NumberWithUnit(value, unit));

export const marginRightValue = writable(0);
export const marginRightUnit = writable(MeasureUnit.Fraction);
export const marginRight = derived(
  [marginRightValue, marginRightUnit],
  ([value, unit]) => new NumberWithUnit(value, unit)
);

export const marginBottomValue = writable(0);
export const marginBottomUnit = writable(MeasureUnit.Fraction);
export const marginBottom = derived(
  [marginBottomValue, marginBottomUnit],
  ([value, unit]) => new NumberWithUnit(value, unit)
);

export const marginLeftValue = writable(0);
export const marginLeftUnit = writable(MeasureUnit.Fraction);
export const marginLeft = derived(
  [marginLeftValue, marginLeftUnit],
  ([value, unit]) => new NumberWithUnit(value, unit)
);

export const showScanAreaGuides = writable(false);

export function getCurrentScanAreaMargins(): {
  $marginTop: NumberWithUnit;
  $marginRight: NumberWithUnit;
  $marginBottom: NumberWithUnit;
  $marginLeft: NumberWithUnit;
} {
  return {
    $marginTop: get(marginTop),
    $marginRight: get(marginRight),
    $marginBottom: get(marginBottom),
    $marginLeft: get(marginLeft),
  };
}

export function setupScanAreaStore(): void {
  marginTop.subscribe(($marginTop) => {
    const { $marginBottom, $marginLeft, $marginRight } = getCurrentScanAreaMargins();
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.scanAreaMargins = new MarginsWithUnit($marginLeft, $marginTop, $marginRight, $marginBottom);
  });

  marginRight.subscribe(($marginRight) => {
    const { $marginBottom, $marginLeft, $marginTop } = getCurrentScanAreaMargins();
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.scanAreaMargins = new MarginsWithUnit($marginLeft, $marginTop, $marginRight, $marginBottom);
  });

  marginBottom.subscribe(($marginBottom) => {
    const { $marginLeft, $marginRight, $marginTop } = getCurrentScanAreaMargins();
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.scanAreaMargins = new MarginsWithUnit($marginLeft, $marginTop, $marginRight, $marginBottom);
  });

  marginLeft.subscribe(($marginLeft) => {
    const { $marginBottom, $marginRight, $marginTop } = getCurrentScanAreaMargins();
    const $dataCaptureView = get(dataCaptureView);
    $dataCaptureView.scanAreaMargins = new MarginsWithUnit($marginLeft, $marginTop, $marginRight, $marginBottom);
  });

  showScanAreaGuides.subscribe(($showScanAreaGuides) => {
    const $barcodeCaptureOverlay = get(barcodeCaptureOverlay);
    void $barcodeCaptureOverlay.setShouldShowScanAreaGuides($showScanAreaGuides);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupScanAreaStore();
  }
});
