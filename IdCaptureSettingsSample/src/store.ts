import type { CapturedId, DataConsistencyResult } from "@scandit/web-datacapture-id";
import { writable } from "svelte/store";

export const isSdkConfigured = writable(false);
export const isSidebarOpen = writable(false);
export const showScanResults = writable(false);
export const showDataConsistency = writable(false);
export const scannedDocument = writable<CapturedId | null>();
export const scannedDocumentFrontImage = writable<string | null>();
export const scannedDocumentBackImage = writable<string | null>();
export const scannedDocumentFaceImage = writable<string | null>();
export const scannedDocumentFrontFrameImage = writable<string | null>();
export const scannedDocumentBackFrameImage = writable<string | null>();
export const frontReviewImage = writable<string | null>();
export const dataConsistencyResult = writable<DataConsistencyResult | null>();

export const showLicenseText = writable<boolean>(false);
export const licenseText = writable<string>("");
