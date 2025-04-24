import {
	DataCaptureView,
	Feedback,
	LogoStyle,
	TorchSwitchControl,
} from "@scandit/web-datacapture-core";
import { AppViewModel } from "./AppViewModel";
import type { FillMissingInfoView } from "./FillMissingInfoView";
import { ResultView } from "./ResultView";
import { UiState } from "./UiState";
import type { ListenerForEvent } from "./utils";

export class AppView extends HTMLElement {
	private viewModel = new AppViewModel();

	private dataCaptureView = new DataCaptureView();

	private feedback = Feedback.defaultFeedback;

	private dataCaptureViewContainer?: HTMLElement;

	private infoHint?: HTMLElement;

	private infoHintText?: HTMLElement;

	private guidance?: HTMLElement;

	private resultView?: ResultView;

	private fillMissingInfoView?: FillMissingInfoView;

	private pointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onTap.bind(this);

	public constructor() {
		super();
		this.className = "relative w-dvw h-dvh flex flex-col items-center gap-6";
		this.innerHTML = `
			<div id="dataCaptureViewContainer" class="absolute top-0 left-0 w-full h-full"></div>
			<h1 id="appTitle" class="w-fit mx-auto px-4 pt-6 text-center text-white font-bold uppercase pointer-events-none z-10">
				Label Scan
			</h1>
			<div id="infoHint" class="w-3/4 px-3 py-2 flex gap-2 bg-amber-400/90 text-black rounded z-10 transition opacity-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="flex-shrink-0">
					<rect width="24" height="24" fill="none" />
					<path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
				</svg>
				<span id="infoHintText">Label not fully scanned. Enter missing details.</span>
			</div>
			<div id="guidance" class="px-3 py-2 font-bold bg-black/70 text-white rounded whitespace-nowrap z-10">
				Point at a label to scan
			</div>
      <fill-missing-info-view></fill-missing-info-view>
    `;
	}

	protected async connectedCallback(): Promise<void> {
		await customElements.whenDefined("fill-missing-info-view");
		this.dataCaptureViewContainer = this.querySelector(
			"#dataCaptureViewContainer",
		) as HTMLElement;
		this.infoHint = this.querySelector("#infoHint") as HTMLElement;
		this.infoHintText = this.querySelector("#infoHintText") as HTMLElement;
		this.guidance = this.querySelector("#guidance") as HTMLElement;
		this.resultView = this.querySelector("result-view") as ResultView;
		this.fillMissingInfoView = this.querySelector(
			"fill-missing-info-view",
		) as FillMissingInfoView;
		this.fillMissingInfoView.onDismiss = () => this.onTap();
		this.dataCaptureView.logoStyle = LogoStyle.Minimal;
		this.dataCaptureView.connectToElement(this.dataCaptureViewContainer);
		this.dataCaptureView.addControl(new TorchSwitchControl());
		this.addEventListener("pointerdown", this.pointerDownListener);
		await this.viewModel.connect(this.dataCaptureView);
		this.viewModel.guidanceText.subscribe((guidanceText) => {
			if (this.guidance) {
				this.guidance.textContent = guidanceText;
			}
		});
		this.viewModel.onLabelScanned.subscribe(() => {
			this.feedback.emit();
		});
		this.viewModel.messages.subscribe((message) => {
			if (this.infoHint) {
				this.infoHint.classList.toggle("opacity-0", message == null);
			}
			if (this.infoHintText && message) {
				this.infoHintText.textContent = message;
			}
		});
		this.viewModel.dialogState.subscribe((uiState) => {
			switch (uiState) {
				case UiState.NoDialog:
					this.closeDialogs(false);
					break;
				case UiState.CompleteLabelDialog:
					this.showFillInfoDialog();
					break;
				case UiState.ShowResultsDialog:
					this.showResultsDialog();
					break;
			}
		});
	}

	protected async disconnectedCallback(): Promise<void> {
		this.removeEventListener("pointerdown", this.pointerDownListener);
		void this.viewModel.disconnect();
	}

	private closeDialogs(dismiss: boolean): void {
		this.fillMissingInfoView?.hide?.(dismiss);
		this.resultView?.dismiss();
	}

	private showFillInfoDialog(): void {
		const partialLabel = this.viewModel.incompleteLabelValue;
		if (partialLabel) {
			this.fillMissingInfoView?.show(partialLabel, (label) => {
				this.viewModel.submitLabel(label);
			});
		}
	}

	private showResultsDialog(): void {
		if (this.resultView == null) {
			this.resultView = new ResultView(this.viewModel);
			this.resultView.onDismiss = () => this.onTap();
			this.append(this.resultView);
		}
		this.resultView?.show();
	}

	private onTap(): void {
		this.viewModel.onTap();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"app-view": AppView;
	}
}
