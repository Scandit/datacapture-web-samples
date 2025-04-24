import {
	Camera,
	CameraPosition,
	DataCaptureContext,
	type DataCaptureView,
	FrameSourceState,
	configure,
} from "@scandit/web-datacapture-core";
import type { LabelCapture } from "@scandit/web-datacapture-label";
import {
	BehaviorSubject,
	Subject,
	distinctUntilChanged,
	filter,
	map,
} from "rxjs";
import { LabelCaptureProvider } from "./LabelCaptureProvider";
import type {
	PartialLabel,
	ScannedResult,
	ScannedResultLabel,
} from "./ScanResult";
import { ScanState } from "./ScanState";
import { Settings } from "./Settings";
import { UiState } from "./UiState";

export class AppViewModel {
	public dataCaptureContext?: DataCaptureContext;

	private camera?: Camera;

	private labelCapture?: LabelCapture;

	private latestResult = new BehaviorSubject<ScannedResult | null>(null);

	private _onLabelScanned = new Subject<void>();
	public onLabelScanned = this._onLabelScanned.asObservable();

	private _incompleteLabel = new BehaviorSubject<PartialLabel | null>(null);
	public incompleteLabel = this._incompleteLabel.asObservable();

	public get incompleteLabelValue(): PartialLabel | null {
		return this._incompleteLabel.value;
	}

	private _results = new BehaviorSubject<ScannedResult[]>([]);
	public results = this._results.asObservable();

	private _messages = new BehaviorSubject<string | null>(null);
	public messages = this._messages.asObservable().pipe(distinctUntilChanged());

	private scanStates = new BehaviorSubject(ScanState.Label);

	public guidanceText = this.scanStates.pipe(
		map((scanState) => {
			switch (scanState) {
				case ScanState.Label:
					return "Point at a label to scan";
				case ScanState.Confirm:
				case ScanState.FillInfo:
					return "Tap anywhere to resume";
			}
		}),
	);

	private uiState = new BehaviorSubject(UiState.NoDialog);
	public dialogState = this.uiState.asObservable();

	public async connect(dataCaptureView: DataCaptureView): Promise<void> {
		await configure(Settings);
		this.dataCaptureContext = await DataCaptureContext.create();
		await dataCaptureView.setContext(this.dataCaptureContext);
		this.camera =
			Camera.atPosition(CameraPosition.WorldFacing) ?? Camera.default;
		await this.dataCaptureContext.setFrameSource(this.camera);
		await this.camera.switchToDesiredState(FrameSourceState.On);
		this.labelCapture = await LabelCaptureProvider.buildLabelCapture(
			this.dataCaptureContext,
			{
				onLabelScanned: (label) => {
					this.latestResult.next(label);
					this._onLabelScanned.next(undefined);
				},
				onPartialLabelScanned: (label) => {
					this._incompleteLabel.next(label);
					this._onLabelScanned.next(undefined);
				},
			},
		);
		await LabelCaptureProvider.buildOverlay(this.labelCapture, dataCaptureView);
		this.handleStates();
		this.handleResults();
	}

	public async disconnect(): Promise<void> {
		await this.camera?.switchToDesiredState(FrameSourceState.Off);
	}

	public clearResults(): void {
		this._results.next([]);
	}

	public submitLabel(label: ScannedResultLabel): void {
		this.latestResult.next(label);
		this.discardPendingLabel();
	}

	public onTap(): void {
		if (
			[ScanState.FillInfo, ScanState.Confirm].includes(this.scanStates.value)
		) {
			this.discardPendingLabel();
			this._messages.next(null);
			this.scanStates.next(ScanState.Label);
		}
	}

	private handleStates(): void {
		this.scanStates.subscribe(async (scanState) => {
			switch (scanState) {
				case ScanState.Label:
					this.uiState.next(UiState.NoDialog);
					await this.labelCapture?.setEnabled(true);
					await this.camera?.switchToDesiredState(FrameSourceState.On);
					break;
				case ScanState.Confirm:
					await this.camera?.switchToDesiredState(FrameSourceState.Standby);
					this.uiState.next(UiState.ShowResultsDialog);
					await this.labelCapture?.setEnabled(false);
					break;
				case ScanState.FillInfo:
					await this.camera?.switchToDesiredState(FrameSourceState.Standby);
					await this.labelCapture?.setEnabled(false);
					this.uiState.next(UiState.CompleteLabelDialog);
					break;
			}
		});
	}

	private handleResults(): void {
		this.latestResult.pipe(filter(Boolean)).subscribe((scannedResult) => {
			this._messages.next(null);
			if (!this.increaseQuantityIfInList(scannedResult.data)) {
				this._results.next([scannedResult, ...this._results.value]);
			}
			this.scanStates.next(ScanState.Confirm);
		});
		this.incompleteLabel.pipe(filter(Boolean)).subscribe((item) => {
			if (this.increaseQuantityIfInList(item.data)) {
				this.scanStates.next(ScanState.Confirm);
			} else {
				this._messages.next("Label not fully scanned. Enter missing details.");
				this.scanStates.next(ScanState.FillInfo);
			}
		});
	}

	private increaseQuantityIfInList(itemData: string): boolean {
		const result = this._results.value.find(
			(result) => result.data === itemData,
		);
		if (result) {
			const resultList = this._results.value.filter(
				(result) => result.data !== itemData,
			);
			result.quantity++;
			this._results.next([result, ...resultList]);
			return true;
		}
		return false;
	}

	private discardPendingLabel(): void {
		this._incompleteLabel.next(null);
	}
}
