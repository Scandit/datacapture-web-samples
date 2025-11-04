import type { Barcode } from "@scandit/web-datacapture-barcode";

export class ScannedItemModel {
  public barcode: Barcode;

  public quantity: number;

  public constructor(barcode: Barcode, quantity: number) {
    this.barcode = barcode;
    this.quantity = quantity;
  }
}
