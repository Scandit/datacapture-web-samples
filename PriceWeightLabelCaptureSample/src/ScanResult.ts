import type { CapturedLabel } from "@scandit/web-datacapture-label";
import { Settings } from "./Settings";

export class ScannedResultBarcode {
	public constructor(
		public readonly data: string,
		public quantity = 1,
	) {}
}

export class ScannedResultLabel {
	public constructor(
		public readonly data: string,
		public readonly weight: string,
		public readonly unitPrice: string,
		public quantity = 1,
	) {}

	public static fromCapturedLabel(
		capturedLabel: CapturedLabel,
	): ScannedResultLabel | undefined {
		const data = capturedLabel.fields.find(
			(field) => field.name === Settings.fieldBarcode,
		)?.barcode?.data;
		const unitPrice = capturedLabel.fields.find(
			(field) => field.name === Settings.fieldUnitPrice,
		)?.text;
		const weight = capturedLabel.fields.find(
			(field) => field.name === Settings.fieldWeight,
		)?.text;
		return data && unitPrice && weight
			? new ScannedResultLabel(data, weight, unitPrice)
			: undefined;
	}
}

export type ScannedResult = ScannedResultBarcode | ScannedResultLabel;

export class PartialLabel {
	public constructor(
		public readonly data: string,
		public weight?: string | null,
		public unitPrice?: string | null,
	) {}

	public static fromCapturedLabel(
		capturedLabel: CapturedLabel,
	): PartialLabel | undefined {
		const data = capturedLabel.fields.find(
			(field) => field.name === Settings.fieldBarcode,
		)?.barcode?.data;
		const unitPrice = capturedLabel.fields.find(
			(field) => field.name === Settings.fieldUnitPrice,
		)?.text;
		const weight = capturedLabel.fields.find(
			(field) => field.name === Settings.fieldWeight,
		)?.text;
		return data ? new PartialLabel(data, weight, unitPrice) : undefined;
	}
}
