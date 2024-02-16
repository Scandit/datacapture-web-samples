import type { IdLayout, IdLayoutLineStyle, IdLayoutStyle } from "scandit-web-datacapture-id";
import { writable } from "svelte/store";

export enum BrushType {
  Default = "Default",
  Red = "Red",
  Green = "Green",
}

export const layout = writable<IdLayout>();
export const layoutStyle = writable<IdLayoutStyle>();
export const showTextHints = writable<boolean>();
export const layoutLineStyle = writable<IdLayoutLineStyle>();
export const layoutCapturedBrush = writable<BrushType>();
export const layoutLocalizedBrush = writable<BrushType>();

export const brushType = writable(BrushType.Default);
