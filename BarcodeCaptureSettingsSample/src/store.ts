import type {
  Barcode,
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureSettings,
} from "@scandit/web-datacapture-barcode";
import type { DataCaptureContext, DataCaptureView } from "@scandit/web-datacapture-core";
import { writable } from "svelte/store";

export const dataCaptureContext = writable<DataCaptureContext>();
export const dataCaptureView = writable<DataCaptureView>();
export const barcodeCapture = writable<BarcodeCapture>();
export const barcodeCaptureOverlay = writable<BarcodeCaptureOverlay>();
export const barcodeCaptureSettings = writable<BarcodeCaptureSettings>();

export const isSdkConfigured = writable(false);
export const isSidebarOpen = writable(false);
export const showScanResults = writable(false);
export const scannedBarcode = writable<Barcode | undefined>();

export const showLicense = writable(false);
export const licenseText = writable("");
