import { DrawerBottom } from "../atoms/DrawerBottom.js";
import { BarcodeList } from "../atoms/BarcodeList.js";

import { BarcodeListItem } from "../atoms/BarcodeListItem.js";

import { SearchIconButton } from "../atoms/SearchIconButton.js";
import { define, removeAllChildNodes } from "../../utils.js";
import type { Barcode, Symbology } from "@scandit/web-datacapture-barcode";
import { Events, EventType } from "../../store.js";
import type { CustomStateEvent, StateModel } from "../../store.js";

export interface ListViewEventMap {
  "barcode-list-clicked": {
    event: CustomEvent<{ barcode: Barcode }>;
    callback: (event: CustomEvent<{ barcode: Barcode }>) => void | Promise<void>;
  };
}
export class ListView extends HTMLElement {
  public static readonly tag: "scandit-list-view" = "scandit-list-view" as const;

  private readonly drawer: DrawerBottom;

  private readonly barcodeList: BarcodeList;

  private readonly store: StateModel;

  public constructor(store: StateModel) {
    super();
    this.drawer = DrawerBottom.create();
    this.barcodeList = BarcodeList.create();
    this.barcodeList.slot = "body";
    this.store = store;
  }

  public async hide(): Promise<void> {
    await this.drawer.hide();
  }

  public async show(): Promise<void> {
    await this.drawer.show();
  }

  public connectedCallback(): void {
    this.drawer.append(this.barcodeList);
    this.append(this.drawer);
    this.store.on(Events.BarcodesChange, this.onUpdateStoreHandler);
    this.barcodeList.addEventListener("pointerdown", this.onBarcodeClick);
  }

  public disconnectedCallback(): void {
    this.store.off(Events.BarcodesChange, this.onUpdateStoreHandler);
    this.barcodeList.removeEventListener("pointerdown", this.onBarcodeClick);
  }

  public onBarcodeClick = (event: Event): void => {
    let target: BarcodeListItem | null;
    if (event.target instanceof SearchIconButton) {
      target = event.target.closest("scandit-barcode-list-item");
    } else if (event.target instanceof BarcodeListItem) {
      target = event.target;
    } else {
      return;
    }
    const { data, symbology } = target?.dataset ?? {};
    if (data != null && symbology != null) {
      const barcodeClicked = this.store.getCodeBy(symbology as Symbology, data);
      this.dispatchEvent(new CustomEvent("barcode-list-clicked", { detail: { barcode: barcodeClicked } }));
    }
  };

  public on(
    eventName: keyof ListViewEventMap,
    callback: ListViewEventMap[keyof ListViewEventMap]["callback"],
    options?: AddEventListenerOptions | boolean
  ): void {
    super.addEventListener(eventName, callback as unknown as EventListenerOrEventListenerObject, options);
  }

  public off(
    eventName: keyof ListViewEventMap,
    callback: ListViewEventMap[keyof ListViewEventMap]["callback"],
    options?: AddEventListenerOptions | boolean
  ): void {
    super.removeEventListener(eventName, callback as unknown as EventListenerOrEventListenerObject, options);
  }

  private readonly onUpdateStoreHandler = (event: CustomStateEvent): void => {
    if (event.detail.type === EventType.Clear) {
      removeAllChildNodes(this.barcodeList);
      return;
    }

    if (event.detail.type === EventType.Add && event.detail.change != null) {
      removeAllChildNodes(this.barcodeList);
      this.renderBarcodesList([event.detail.change]);
    }
  };

  private renderBarcodesList(barcodes: Barcode[]): void {
    const fragment = document.createDocumentFragment();
    for (const barcode of barcodes) {
      const text: string = barcode.data ?? barcode.rawData;
      const id = `${barcode.symbology}-${text}`;
      if (this.barcodeList.querySelector(`[id="${id}"]`)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const value = document.createElement("div");
      const icon = SearchIconButton.create();
      const barcodeListItem = BarcodeListItem.create();
      barcodeListItem.id = `${barcode.symbology}-${text}`;
      barcodeListItem.dataset.symbology = barcode.symbology;
      barcodeListItem.dataset.data = text;
      value.slot = "text";
      icon.slot = "right";
      value.textContent = text;
      barcodeListItem.append(value, icon);
      fragment.append(barcodeListItem);
    }

    this.barcodeList.append(fragment);
  }
}

define({
  [ListView.tag]: ListView,
  [DrawerBottom.tag]: DrawerBottom,
  [BarcodeList.tag]: BarcodeList,
  [BarcodeListItem.tag]: BarcodeListItem,
  [SearchIconButton.tag]: SearchIconButton,
});

declare global {
  interface HTMLElementTagNameMap {
    [ListView.tag]: BarcodeList;
  }
}
