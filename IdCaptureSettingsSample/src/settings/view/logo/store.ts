import type { Anchor, LogoStyle, PointWithUnit } from "@scandit/web-datacapture-core";
import { writable } from "svelte/store";

export const logoStyle = writable<LogoStyle>();
export const logoAnchor = writable<Anchor>();
export const logoOffset = writable<PointWithUnit>();
