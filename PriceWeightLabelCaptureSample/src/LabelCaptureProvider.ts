import { Symbology } from "@scandit/web-datacapture-barcode";
import {
	Brush,
	type DataCaptureContext,
	type DataCaptureView,
	RectangularViewfinder,
	RectangularViewfinderStyle,
} from "@scandit/web-datacapture-core";
import {
	type CapturedLabel,
	CustomBarcodeBuilder,
	LabelCapture,
	LabelCaptureBasicOverlay,
	type LabelCaptureBasicOverlayListener,
	type LabelCaptureSettings,
	LabelCaptureSettingsBuilder,
	LabelDefinitionBuilder,
	UnitPriceTextBuilder,
	WeightTextBuilder,
} from "@scandit/web-datacapture-label";
import {
	PartialLabel,
	type ScannedResult,
	ScannedResultBarcode,
	ScannedResultLabel,
} from "./ScanResult";
import { Settings } from "./Settings";

export interface LabelCaptureProviderListener {
	onLabelScanned(label: ScannedResult): void;
	onPartialLabelScanned(label: PartialLabel): void;
}

export namespace LabelCaptureProvider {
	export async function buildLabelCapture(
		dataCaptureContext: DataCaptureContext,
		labelCaptureProviderListener: LabelCaptureProviderListener,
	): Promise<LabelCapture> {
		const labelCaptureSettings = await buildLabelCaptureSettings();
		const labelCapture = await LabelCapture.forContext(
			dataCaptureContext,
			labelCaptureSettings,
		);
		labelCapture.addListener({
			async didUpdateSession(labelCapture, session) {
				const capturedLabel = session.capturedLabels.at(0);
				if (!capturedLabel) {
					return;
				}
				const scannedResult = extractResult(capturedLabel);
				if (scannedResult) {
					void labelCapture.setEnabled(false);
					labelCaptureProviderListener.onLabelScanned(scannedResult);
					return;
				}
				const partialLabel = PartialLabel.fromCapturedLabel(capturedLabel);
				if (partialLabel) {
					void labelCapture.setEnabled(false);
					labelCaptureProviderListener.onPartialLabelScanned(partialLabel);
				}
			},
		});
		return labelCapture;
	}

	export async function buildOverlay(
		labelCapture: LabelCapture,
		view: DataCaptureView,
	): Promise<LabelCaptureBasicOverlay> {
		const upcBrush = new Brush(
			Settings.upcColor.withAlpha(128),
			Settings.upcColor,
			1,
		);
		const weightBrush = new Brush(
			Settings.weightColor.withAlpha(128),
			Settings.weightColor,
			1,
		);
		const unitPriceBrush = new Brush(
			Settings.unitPriceColor.withAlpha(128),
			Settings.unitPriceColor,
			1,
		);
		const transparentBrush = Brush.transparent;
		const labelCaptureBrushListener: LabelCaptureBasicOverlayListener = {
			brushForField(_overlay, field) {
				switch (field.name) {
					case Settings.fieldBarcode:
						return upcBrush;
					case Settings.fieldWeight:
						return weightBrush;
					case Settings.fieldUnitPrice:
						return unitPriceBrush;
					default:
						return null;
				}
			},
			brushForLabel() {
				return transparentBrush;
			},
		};
		const overlay = await LabelCaptureBasicOverlay.withLabelCaptureForView(
			labelCapture,
			view,
		);
		await overlay.setListener(labelCaptureBrushListener);
		await overlay.setViewfinder(
			new RectangularViewfinder(RectangularViewfinderStyle.Square),
		);
		return overlay;
	}

	async function buildLabelCaptureSettings(): Promise<LabelCaptureSettings> {
		const regularItemBarcode = await new CustomBarcodeBuilder()
			.setSymbologies([Symbology.EAN13UPCA])
			.setPattern(Settings.regularItemPattern)
			.build(Settings.fieldBarcode);
		const regularItemLabel = await new LabelDefinitionBuilder()
			.addCustomBarcode(regularItemBarcode)
			.build(Settings.labelRegularItem);
		const weightedItemBarcode = await new CustomBarcodeBuilder()
			.setSymbologies([
				Symbology.EAN13UPCA,
				Symbology.GS1DatabarExpanded,
				Symbology.Code128,
			])
			.setPattern(Settings.weightLabelPattern)
			.isOptional(false)
			.build(Settings.fieldBarcode);
		const weightedItemUnitPrice = await new UnitPriceTextBuilder()
			.isOptional(true)
			.build(Settings.fieldUnitPrice);
		const weightedItemWeight = await new WeightTextBuilder()
			.isOptional(true)
			.build(Settings.fieldWeight);
		const weightedItemLabel = await new LabelDefinitionBuilder()
			.addCustomBarcode(weightedItemBarcode)
			.addUnitPriceText(weightedItemUnitPrice)
			.addWeightText(weightedItemWeight)
			.build(Settings.labelWeightPrice);
		return await new LabelCaptureSettingsBuilder()
			.addLabel(regularItemLabel)
			.addLabel(weightedItemLabel)
			.build();
	}

	function extractResult(
		capturedLabel: CapturedLabel,
	): ScannedResult | undefined {
		if (capturedLabel.name === Settings.labelRegularItem) {
			const data = capturedLabel.fields.find(
				(field) => field.name === Settings.fieldBarcode,
			)?.barcode?.data;
			return data ? new ScannedResultBarcode(data) : undefined;
		}
		return ScannedResultLabel.fromCapturedLabel(capturedLabel);
	}
}
