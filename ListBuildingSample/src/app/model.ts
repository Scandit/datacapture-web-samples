import type { ReadonlySignal, Signal } from "@preact/signals";
import { computed, signal } from "@preact/signals";
import type { ScannedItemModel } from "../scanned-item/model";

export class AppModel {
  public loadingPercentage: number = 0;

  public readonly scannedItemsList: ReadonlySignal<ScannedItemModel[]> = computed(this.getScannedItemsList.bind(this));

  public readonly scannedItemsCount: ReadonlySignal<number> = computed(this.getScannedItemsCount.bind(this));

  private readonly scannedItemsMap: Signal<Record<string, ScannedItemModel>> = signal({});

  public setLoadingPercentage(loadingPercentage: number): void {
    this.loadingPercentage = loadingPercentage;
  }

  public getScannedItemById(id: string): ScannedItemModel | undefined {
    return this.scannedItemsMap.value[id];
  }

  public didScan(scannedItemId: string, scannedItem: ScannedItemModel): void {
    this.scannedItemsMap.value = {
      ...this.scannedItemsMap.value,
      [scannedItemId]: scannedItem,
    };
  }

  public clearList(): void {
    this.scannedItemsMap.value = {};
  }

  private getScannedItemsList(): ScannedItemModel[] {
    return Object.values(this.scannedItemsMap.value);
  }

  private getScannedItemsCount(): number {
    return this.scannedItemsList.value.reduce((total, scannedItem) => total + scannedItem.quantity, 0);
  }
}
