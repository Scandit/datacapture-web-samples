import type { PointWithUnit } from "@scandit/web-datacapture-core";
import { writable } from "svelte/store";

export const pointOfInterest = writable<PointWithUnit>();
