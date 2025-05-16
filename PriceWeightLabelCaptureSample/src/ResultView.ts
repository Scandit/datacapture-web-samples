import type { AppViewModel } from "./AppViewModel";
import { type BottomSheet, BottomSheetState } from "./BottomSheet";
import { ScannedResultBarcode } from "./ScanResult";
import type { ListenerForEvent } from "./utils";

export class ResultView extends HTMLElement {
	public onDismiss: VoidFunction = () => {};

	private bottomSheet?: BottomSheet;

	private itemScanCount?: HTMLElement;

	private clear?: HTMLElement;

	private emptyList?: HTMLElement;

	private resultList?: HTMLElement;

	private continueScan?: HTMLElement;

	private clearPointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onClearClick.bind(this);

	private continueScanPointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onContinueScanClick.bind(this);

	public constructor(private viewModel: AppViewModel) {
		super();
		this.innerHTML = `
			<bottom-sheet>
				<div class="w-dvw h-dvh grid grid-rows-[108px,auto,208px]">
					<div>
						<div data-test-id="dragHandle" class="w-full p-4 flex justify-center items-center">
							<div class="w-8 border-2 border-gray-300 rounded-xl"></div>
						</div>
						<div class="w-full p-6 flex justify-between items-center">
							<p id="itemScanCount">0 item scanned</p>
							<button id="clear" data-test-id="clearListButton" class="text-red-500 hidden">Clear list</button>
						</div>
					</div>
					<div class="w-full h-fit overflow-scroll">
						<div id="emptyList" class="w-full h-full flex justify-center">
							<img src="/empty_list.png" class="w-80 h-auto object-contain" />
						</div>
						<div id="resultList" class="w-full h-full px-6 flex flex-col divide-y divide-[#88c2cc]"></div>
					</div>
					<div class="w-full h-fit p-6 flex justify-center items-center">
						<button id="continueScan" data-test-id="continueScanningButton" class="w-full p-4 bg-black text-white uppercase font-bold">
							Continue scanning
						</button>
					</div>
				</div>
			</bottom-sheet>
		`;
	}

	public async connectedCallback(): Promise<void> {
		await customElements.whenDefined("bottom-sheet");
		this.bottomSheet = this.querySelector("bottom-sheet") as BottomSheet;
		this.bottomSheet.onStateChange = (state) => {
			if (state === BottomSheetState.Hidden) {
				this.onDismiss();
			}
		};
		this.itemScanCount = this.querySelector("#itemScanCount") as HTMLElement;
		this.clear = this.querySelector("#clear") as HTMLElement;
		this.emptyList = this.querySelector("#emptyList") as HTMLElement;
		this.resultList = this.querySelector("#resultList") as HTMLElement;
		this.continueScan = this.querySelector("#continueScan") as HTMLElement;
		this.clear.addEventListener("pointerdown", this.clearPointerDownListener);
		this.continueScan.addEventListener(
			"pointerdown",
			this.continueScanPointerDownListener,
		);
		this.viewModel.results.subscribe((results) => {
			this.emptyList?.classList.toggle("hidden", results.length > 0);
			this.clear?.classList.toggle("hidden", results.length === 0);
			if (this.resultList) {
				this.resultList.innerHTML = results
					.map((result, position) => {
						if (result instanceof ScannedResultBarcode) {
							return `
								<div class="w-full py-2 flex flex-col gap-2">
									<p class="uppercase">Item ${position + 1}</p>
									<div class="flex justify-between items-center">
										<div class="flex items-center gap-2">
											<div class="w-2 aspect-square bg-[#2ec1ce] rounded-full"></div>
											<p>Code</p>
										</div>
										<p>${result.data}</p>
										<p class="uppercase text-right ${result.quantity === 1 ? "opacity-0" : ""}">
											Qty ${result.quantity}
										</p>
									</div>
								</div>
							`;
						}
						return `
							<div class="w-full py-2 flex flex-col gap-2">
								<p class="uppercase">Item ${position + 1}</p>
								<div class="flex justify-between items-center">
									<div class="flex items-center gap-2 w-full">
										<div class="w-2 aspect-square bg-[#2ec1ce] rounded-full"></div>
										<p>Code</p>
									</div>
									<p class="w-full">${result.data}</p>
									<p class="w-full uppercase text-right ${result.quantity === 1 ? "opacity-0" : ""}">
										Qty ${result.quantity}
									</p>
								</div>
								<div class="flex justify- items-center">
									<div class="flex items-center gap-2 w-full">
										<div class="w-2 aspect-square bg-[#fbc02c] rounded-full"></div>
										<p>Weight</p>
									</div>
									<p class="w-full">${result.weight}</p>
									<div class="w-full"></div>
								</div>
								<div class="flex justify-between items-center">
									<div class="flex items-center gap-2 w-full">
										<div class="w-2 aspect-square bg-[#0a3390] rounded-full"></div>
										<p>Unit price</p>
									</div>
									<p class="w-full">${result.unitPrice}</p>
									<div class="w-full"></div>
								</div>
							</div>
						`;
					})
					.join("");
			}
			if (this.itemScanCount) {
				this.itemScanCount.textContent = this.getQuantityString(results.length);
			}
		});
		if (this.bottomSheet) {
			this.bottomSheet.state = BottomSheetState.Collapsed;
		}
	}

	public disconnectedCallback(): void {
		this.clear?.removeEventListener(
			"pointerdown",
			this.clearPointerDownListener,
		);
		this.continueScan?.removeEventListener(
			"pointerdown",
			this.continueScanPointerDownListener,
		);
	}

	public show(): void {
		if (this.bottomSheet) {
			this.bottomSheet.state = BottomSheetState.Collapsed;
		}
	}

	public dismiss(): void {
		if (this.bottomSheet) {
			this.bottomSheet.state = BottomSheetState.Hidden;
		}
		this.onDismiss();
	}

	private getQuantityString(quantity: number): string {
		return quantity === 1 ? "1 item scanned" : `${quantity} items scanned`;
	}

	private onClearClick(): void {
		this.viewModel.clearResults();
	}

	private onContinueScanClick(): void {
		this.dismiss();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"result-view": ResultView;
	}
}
