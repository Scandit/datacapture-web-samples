import type { Barcode } from "@scandit/web-datacapture-barcode";
import { SearchAndFindViewPresenter } from "./SearchAndFindViewPresenter.js";

export class SearchAndFindView {
  public sparkScanViewRootElement: HTMLElement = document.getElementById("spark-scan-view-root")!;

  public dataCaptureViewRootElement: HTMLElement = document.getElementById("data-capture-view-root")!;

  private readonly itemCountText: HTMLElement = document.getElementById("item-count-text")!;

  private readonly clearListButton: HTMLElement = document.getElementById("clear-list-button")!;

  private readonly itemList: HTMLElement = document.getElementById("item-list")!;

  private readonly clearListButtonTapListener: EventListener = this.didTapClearListButton.bind(this);

  private readonly presenter: SearchAndFindViewPresenter = new SearchAndFindViewPresenter(this);

  public async initialize(): Promise<void> {
    this.clearListButton.addEventListener("click", this.clearListButtonTapListener);
    await this.presenter.initialize();
  }

  public didScan(itemList: Barcode[]): void {
    this.itemCountText.textContent = `${itemList.length} item(s) scanned`;
    this.itemList.innerHTML = "";
    for (const item of itemList) {
      this.itemList.innerHTML += `
        <li>
          <div class="p-4 flex flex-col gap-2">
            <p class="font-bold">${item.data ?? ""}</p>
            <p>${item.symbology}</p>
          </div>
        </li>
      `;
    }
  }

  public switchToSparkScan(): void {
    this.sparkScanViewRootElement.hidden = false;
    this.dataCaptureViewRootElement.hidden = true;
    this.itemCountText.textContent = "0 item(s) scanned";
    this.itemList.innerHTML = "";
    this.presenter.sparkScanView?.append(this.itemList);
  }

  public switchToBarcodeFind(): void {
    this.sparkScanViewRootElement.hidden = true;
    this.dataCaptureViewRootElement.hidden = false;
  }

  private didTapClearListButton(): void {
    this.itemCountText.textContent = "0 item(s) scanned";
    this.itemList.innerHTML = "";
    this.presenter.didTapClearListButton();
  }
}
