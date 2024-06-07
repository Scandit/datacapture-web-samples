import type { ScannedItemModel } from "../scanned-item/model";
import { ScannedItemView } from "../scanned-item/view";
import { AppPresenter } from "./presenter";

export class AppView {
  private readonly presenter: AppPresenter = new AppPresenter(this);

  private readonly loadingOverlay: HTMLElement = document.querySelector("#loadingOverlay")!;

  private readonly scannedItemsText: HTMLElement = document.querySelector("#scannedItemsText")!;

  private readonly clearListButton: HTMLElement = document.querySelector("#clearListButton")!;

  private readonly scannedItemsList: HTMLElement = document.querySelector("#scannedItemsList")!;

  private readonly clearListButtonTapListener: EventListener = this.didTapClearListButton.bind(this);

  public async connect(): Promise<void> {
    this.clearListButton.addEventListener("pointerup", this.clearListButtonTapListener);
    await this.presenter.connect();
  }

  public async disconnect(): Promise<void> {
    this.clearListButton.removeEventListener("pointerup", this.clearListButtonTapListener);
    await this.presenter.disconnect();
  }

  public render(loadingPercentage: number, scannedItemsCount: number, scannedItemsList: ScannedItemModel[]): void {
    this.loadingOverlay.textContent = `Loading: ${loadingPercentage}%`;
    this.loadingOverlay.classList.toggle("opacity-0", loadingPercentage === 100);
    this.scannedItemsText.textContent =
      scannedItemsCount === 1 ? `1 item scanned` : `${scannedItemsCount} items scanned`;
    this.scannedItemsList.innerHTML = "";
    for (const scannedItem of scannedItemsList) {
      const scannedItemView = new ScannedItemView(scannedItem);
      this.scannedItemsList.append(scannedItemView.toFragment());
    }
  }

  private didTapClearListButton(): void {
    this.presenter.didTapClearListButton();
  }
}
