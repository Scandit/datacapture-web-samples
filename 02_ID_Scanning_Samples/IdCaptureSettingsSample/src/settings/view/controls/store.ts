import { writable } from "svelte/store";

export const torchSwitchControlEnabled = writable(false);
export const cameraSwitchControlEnabled = writable(false);
export const allowPictureInPicture = writable(true);
