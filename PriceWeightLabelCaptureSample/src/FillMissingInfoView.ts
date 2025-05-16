import { type BottomSheet, BottomSheetState } from "./BottomSheet";
import { type PartialLabel, ScannedResultLabel } from "./ScanResult";
import type { ListenerForEvent } from "./utils";

export class FillMissingInfoView extends HTMLElement {
	public onDismiss: VoidFunction = () => {};

	private bottomSheet?: BottomSheet;

	private dismissButton?: HTMLElement;

	private submitButton?: HTMLButtonElement;

	private code?: HTMLElement;

	private weight?: HTMLInputElement;

	private unitPrice?: HTMLInputElement;

	private partialLabel?: PartialLabel;

	private dismissed = true;

	private onSubmit?: (label: ScannedResultLabel) => void;

	private dismissButtonPointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onCloseButtonPointerDown.bind(this);

	private weightInputListener: ListenerForEvent<"input"> =
		this.onWeightInput.bind(this);

	private unitPriceInputListener: ListenerForEvent<"input"> =
		this.onUnitPriceInput.bind(this);

	private submitButtonPointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onSubmitButtonPointerDown.bind(this);

	public constructor() {
		super();
		this.innerHTML = `
      <bottom-sheet>
        <div class="p-6">
          <div class="w-full mb-3 flex justify-between items-center">
            <p>Enter item details</p>
            <button id="dismissButton" data-test-id="dismissButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
              </svg>
            </button>
          </div>
          <div class="mb-6 flex flex-col gap-3">
            <div class="flex items-center gap-2" for="weight">
              <div class="w-6/12 flex items-center gap-2">
                <div class="w-2 aspect-square bg-[#2ec1ce] rounded-full"></div>
                <span>Code</span>
              </div>
              <p id="code" data-test-id="codeField" class="w-full text-left"></p>
            </div>
            <label class="flex items-center gap-2" for="weight">
              <div class="w-6/12 flex items-center gap-2">
                <div class="w-2 aspect-square bg-[#fbc02c] rounded-full"></div>
                <span>Weight</span>
              </div>
              <input id="weight" data-test-id="weightField" class="w-full border-b border-gray-300 outline-none transition duration-300 focus:border-[#2ec1ce]" type="number" />
            </label>
            <label class="flex items-center gap-2" for="unitPrice">
              <div class="w-6/12 flex items-center gap-2">
                <div class="w-2 aspect-square bg-[#0a3390] rounded-full"></div>
                <span>Unit price</span>
              </div>
              <input id="unitPrice" data-test-id="unitPriceField" class="w-full border-b border-gray-300 outline-none transition duration-300 focus:border-[#2ec1ce]" type="number" />
            </label>
          </div>
          <button id="submitButton" data-test-id="submitButton" class="w-full p-4 bg-black text-white uppercase font-bold transition duration-300 disabled:bg-gray-200 disabled:text-gray-400" disabled>
            Add to list
          </button>
        </div>
      </bottom-sheet>
		`;
	}

	public async connectedCallback(): Promise<void> {
		await customElements.whenDefined("bottom-sheet");
		this.bottomSheet = this.querySelector("bottom-sheet") as BottomSheet;
		this.bottomSheet.isHideable = true;
		this.bottomSheet.onStateChange = (state) => {
			if (state === BottomSheetState.Hidden) {
				if (this.dismissed) {
					this.onDismiss();
				}
				this.dismissed = true;
			}
		};
		this.dismissButton = this.querySelector("#dismissButton") as HTMLElement;
		this.code = this.querySelector("#code") as HTMLElement;
		this.weight = this.querySelector("#weight") as HTMLInputElement;
		this.unitPrice = this.querySelector("#unitPrice") as HTMLInputElement;
		this.submitButton = this.querySelector(
			"#submitButton",
		) as HTMLButtonElement;
		this.dismissButton.addEventListener(
			"pointerdown",
			this.dismissButtonPointerDownListener,
		);
		this.weight.addEventListener("input", this.weightInputListener);
		this.unitPrice.addEventListener("input", this.unitPriceInputListener);
		this.submitButton.addEventListener(
			"pointerdown",
			this.submitButtonPointerDownListener,
		);
	}

	public disconnectedCallback(): void {
		this.dismissButton?.removeEventListener(
			"pointerdown",
			this.dismissButtonPointerDownListener,
		);
		this.weight?.removeEventListener("input", this.weightInputListener);
		this.unitPrice?.removeEventListener("input", this.unitPriceInputListener);
		this.submitButton?.removeEventListener(
			"pointerdown",
			this.submitButtonPointerDownListener,
		);
	}

	public show(
		partialLabel: PartialLabel,
		onSubmit: (label: ScannedResultLabel) => void,
	): void {
		if (this.code && this.weight && this.unitPrice) {
			this.code.textContent = partialLabel.data;
			this.weight.value = partialLabel.weight ?? "";
			this.unitPrice.value = partialLabel.unitPrice ?? "";
			this.partialLabel = partialLabel;
			this.onSubmit = (label) => onSubmit(label);
			if (this.bottomSheet) {
				this.bottomSheet.state = BottomSheetState.Expanded;
			}
		}
	}

	public hide(dismissed = true): void {
		if (this.bottomSheet?.state === BottomSheetState.Hidden) {
			if (dismissed) {
				this.onDismiss();
			}
			return;
		}
		this.dismissed = dismissed;
		if (this.bottomSheet) {
			this.bottomSheet.state = BottomSheetState.Hidden;
		}
	}

	private onCloseButtonPointerDown(): void {
		this.hide();
	}

	private onWeightInput(): void {
		if (this.weight && this.unitPrice && this.submitButton) {
			this.submitButton.disabled = !this.weight.value || !this.unitPrice.value;
		}
	}

	private onUnitPriceInput(): void {
		if (this.weight && this.unitPrice && this.submitButton) {
			this.submitButton.disabled = !this.weight.value || !this.unitPrice.value;
		}
	}

	private onSubmitButtonPointerDown(): void {
		if (this.partialLabel && this.weight?.value && this.unitPrice?.value) {
			const finalLabel = new ScannedResultLabel(
				this.partialLabel.data,
				this.weight.value,
				this.unitPrice.value,
			);
			this.onSubmit?.(finalLabel);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"fill-missing-info-view": FillMissingInfoView;
	}
}
