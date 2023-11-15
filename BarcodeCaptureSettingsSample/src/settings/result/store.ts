import { scannedBarcode, showScanResults } from "@/store";
import { writable } from "svelte/store";

export const continuousScanning = writable(false);

continuousScanning.subscribe(() => {
  scannedBarcode.set(undefined);
  showScanResults.set(false);
});
