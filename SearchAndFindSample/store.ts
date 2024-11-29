import type { Barcode, Symbology } from "@scandit/web-datacapture-barcode";

export enum Events {
  BarcodesChange = "barcodes-change",
}

export enum EventType {
  Add = "add",
  Remove = "remove",
  Update = "update",
  Clear = "clear",
}

export interface EventShape {
  barcodes: Barcode[];
  type: EventType;
  change: Barcode | null;
}
export type CustomStateEvent = CustomEvent<EventShape>;

export interface StateShape {
  barcodes: Set<Barcode>;
}
export class StateModel extends EventTarget {
  private readonly state: StateShape;

  public constructor() {
    super();
    this.state = {
      barcodes: new Set(),
    };
  }

  public addCode(code: Barcode): void {
    for (const existingCode of this.state.barcodes) {
      if (existingCode.data === code.data) {
        return;
      }
    }
    this.state.barcodes.add(code);
    this.emit({
      eventName: Events.BarcodesChange,
      value: { type: EventType.Add, barcodes: this.getCodes(), change: code },
    });
  }

  public removeBarcode(code: Barcode): void {
    this.state.barcodes.delete(code);
    this.emit({
      eventName: Events.BarcodesChange,
      value: { barcodes: this.getCodes(), type: EventType.Remove, change: code },
    });
  }

  public removeBarcodeBy(symbology: Symbology, data: Barcode["data"]): void {
    for (const barcode of this.state.barcodes) {
      if (barcode.symbology === symbology && barcode.data === data) {
        this.state.barcodes.delete(barcode);
        this.emit({
          eventName: Events.BarcodesChange,
          value: { barcodes: this.getCodes(), type: EventType.Remove, change: barcode },
        });
      }
    }
  }

  public removeAllCodes(): void {
    this.state.barcodes.clear();
    this.emit({
      eventName: Events.BarcodesChange,
      value: { barcodes: this.getCodes(), type: EventType.Clear, change: null },
    });
  }

  public getCodes(): Barcode[] {
    return [...this.state.barcodes];
  }

  public getLastScannedCode(): Barcode {
    return [...this.state.barcodes].reverse()[0];
  }

  public getCodeBy(symbology: Symbology, data: Barcode["data"]): Barcode | null {
    for (const barcode of this.state.barcodes) {
      if (barcode.symbology === symbology && barcode.data === data) {
        return barcode;
      }
    }
    return null;
  }

  public getState(): StateShape {
    return this.state;
  }

  public emit(change: { eventName: Events; value: EventShape }): void {
    const event = new CustomEvent<EventShape>(change.eventName, {
      bubbles: true,
      cancelable: true,
      detail: change.value,
    });
    this.dispatchEvent(event);
  }

  public on(
    eventName: Events,
    callback: (event: CustomStateEvent) => void,
    options?: AddEventListenerOptions | boolean
  ): void {
    super.addEventListener(eventName, callback as unknown as EventListenerOrEventListenerObject, options);
  }

  public off(
    eventName: Events,
    callback: (event: CustomStateEvent) => void,
    options?: AddEventListenerOptions | boolean
  ): void {
    super.removeEventListener(eventName, callback as unknown as EventListenerOrEventListenerObject, options);
  }
}

export const store = new StateModel();
