import { Color } from "@scandit/web-datacapture-core";
import { labelCaptureLoader } from "@scandit/web-datacapture-label";

export namespace Settings {
	export const libraryLocation = new URL(
		"library/engine",
		document.baseURI,
	).toString();
	export const licenseKey = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";
	export const moduleLoaders = [labelCaptureLoader()];
	export const regularItemPattern = "^(?!0?2)\\d+$";
	export const weightLabelPattern = "^0?2\\d+$";
	export const fieldBarcode = "barcode";
	export const fieldUnitPrice = "value:unit_price";
	export const fieldWeight = "value:weight";
	export const labelWeightPrice = "weighted_item";
	export const labelRegularItem = "regular_item";
	export const upcColor = Color.fromHex("#2EC1CE");
	export const weightColor = Color.fromHex("#FBC02C");
	export const unitPriceColor = Color.fromHex("#0A3390");
}
