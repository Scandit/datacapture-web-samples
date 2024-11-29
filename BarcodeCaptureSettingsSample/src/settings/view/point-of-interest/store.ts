import { dataCaptureView, isSdkConfigured } from "@/store";
import { MeasureUnit, NumberWithUnit, PointWithUnit } from "@scandit/web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export const xValue = writable(0);
export const xUnit = writable(MeasureUnit.Fraction);
export const x = derived([xValue, xUnit], ([value, unit]) => new NumberWithUnit(value, unit));

export const yValue = writable(0);
export const yUnit = writable(MeasureUnit.Fraction);
export const y = derived([yValue, yUnit], ([value, unit]) => new NumberWithUnit(value, unit));

function setupPointOfInterestStore(): void {
  const $dataCaptureView = get(dataCaptureView);
  xValue.set($dataCaptureView.pointOfInterest.x.value);
  xUnit.set($dataCaptureView.pointOfInterest.x.unit);
  yValue.set($dataCaptureView.pointOfInterest.y.value);
  yUnit.set($dataCaptureView.pointOfInterest.y.unit);

  x.subscribe((value) => {
    const pointOfInterestY = get(y);
    $dataCaptureView.pointOfInterest = new PointWithUnit(value, pointOfInterestY);
  });

  y.subscribe((value) => {
    const pointOfInterestX = get(x);
    $dataCaptureView.pointOfInterest = new PointWithUnit(pointOfInterestX, value);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupPointOfInterestStore();
  }
});
