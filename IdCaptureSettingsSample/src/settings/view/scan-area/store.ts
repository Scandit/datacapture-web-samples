import type { MarginsWithUnit } from "@scandit/web-datacapture-core";
import { writable } from "svelte/store";

export const scanAreaMargins = writable<MarginsWithUnit>();
