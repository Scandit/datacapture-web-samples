import { barcodeCapture, barcodeCaptureSettings, isSdkConfigured } from "@/store";
import {
  MeasureUnit,
  NumberWithUnit,
  RadiusLocationSelection,
  RectangularLocationSelection,
  SizeWithUnit,
  SizingMode,
  type LocationSelection,
} from "@scandit/web-datacapture-core";
import { derived, get, writable } from "svelte/store";

export enum LocationSelectionType {
  None = "None",
  Radius = "Radius",
  Rectangular = "Rectangular",
}

export const locationSelectionType = writable(LocationSelectionType.None);

export const radiusValue = writable(1);
export const radiusUnit = writable(MeasureUnit.Fraction);
export const radius = derived([radiusValue, radiusUnit], ([value, unit]) => new NumberWithUnit(value, unit));

export const sizingMode = writable(SizingMode.WidthAndHeight);

export const widthValue = writable(1);
export const widthUnit = writable(MeasureUnit.Fraction);
export const widthAspect = writable(1);
export const width = derived([widthValue, widthUnit], ([value, unit]) => new NumberWithUnit(value, unit));

export const heightValue = writable(1);
export const heightUnit = writable(MeasureUnit.Fraction);
export const heightAspect = writable(1);
export const height = derived([heightValue, heightUnit], ([value, unit]) => new NumberWithUnit(value, unit));

export const size = derived([width, height], ([$width, $height]) => new SizeWithUnit($width, $height));

export async function setLocationSelection(locationSelection: LocationSelection | null): Promise<void> {
  const $barcodeCaptureSettings = get(barcodeCaptureSettings);
  const $barcodeCapture = get(barcodeCapture);
  $barcodeCaptureSettings.locationSelection = locationSelection;
  await $barcodeCapture.applySettings($barcodeCaptureSettings);
}

export async function setRadiusLocationSelection(): Promise<void> {
  const locationSelectionRadius = get(radius);
  const locationSelection = new RadiusLocationSelection(locationSelectionRadius);
  await setLocationSelection(locationSelection);
}

export async function setRectangularLocationSelectionWithWidthAndHeight(): Promise<void> {
  const locationSelectionSize = get(size);
  const locationSelection = RectangularLocationSelection.withSize(locationSelectionSize);
  await setLocationSelection(locationSelection);
}

export async function setRectangularLocationSelectionWithWidthAndHeightAspect(): Promise<void> {
  const locationSelectionWidth = get(width);
  const locationSelectionAspect = get(heightAspect);
  const locationSelection = RectangularLocationSelection.withWidthAndAspectRatio(
    locationSelectionWidth,
    locationSelectionAspect
  );
  await setLocationSelection(locationSelection);
}

export async function setRectangularLocationSelectionWithHeightAndWidthAspect(): Promise<void> {
  const locationSelectionHeight = get(height);
  const locationSelectionAspect = get(widthAspect);
  const locationSelection = RectangularLocationSelection.withHeightAndAspectRatio(
    locationSelectionHeight,
    locationSelectionAspect
  );
  await setLocationSelection(locationSelection);
}

export async function setRectangularLocationSelection(): Promise<void> {
  const locationSelectionSizingMode = get(sizingMode);
  if (locationSelectionSizingMode === SizingMode.WidthAndHeight) {
    await setRectangularLocationSelectionWithWidthAndHeight();
    return;
  }
  if (locationSelectionSizingMode === SizingMode.WidthAndAspectRatio) {
    await setRectangularLocationSelectionWithWidthAndHeightAspect();
    return;
  }
  await setRectangularLocationSelectionWithHeightAndWidthAspect();
}

export function setupLocationSelectionStore(): void {
  locationSelectionType.subscribe((value) => {
    if (value === LocationSelectionType.None) {
      void setLocationSelection(null);
      return;
    }
    if (value === LocationSelectionType.Radius) {
      void setRadiusLocationSelection();
      return;
    }
    void setRectangularLocationSelection();
  });

  radius.subscribe(() => {
    const $locationSelectionType = get(locationSelectionType);
    if ($locationSelectionType === LocationSelectionType.Radius) {
      void setRadiusLocationSelection();
    }
  });

  sizingMode.subscribe(() => {
    const $locationSelectionType = get(locationSelectionType);
    if ($locationSelectionType === LocationSelectionType.Rectangular) {
      void setRectangularLocationSelection();
    }
  });

  size.subscribe(() => {
    const $locationSelectionType = get(locationSelectionType);
    if ($locationSelectionType === LocationSelectionType.Rectangular) {
      void setRectangularLocationSelection();
    }
  });

  widthAspect.subscribe(() => {
    const $locationSelectionType = get(locationSelectionType);
    if ($locationSelectionType === LocationSelectionType.Rectangular) {
      void setRectangularLocationSelectionWithHeightAndWidthAspect();
    }
  });

  heightAspect.subscribe(() => {
    const $locationSelectionType = get(locationSelectionType);
    if ($locationSelectionType === LocationSelectionType.Rectangular) {
      void setRectangularLocationSelectionWithHeightAndWidthAspect();
    }
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupLocationSelectionStore();
  }
});
