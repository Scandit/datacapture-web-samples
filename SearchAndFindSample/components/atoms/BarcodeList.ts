export class BarcodeList extends HTMLElement {
  public static readonly tag: "scandit-barcode-list" = "scandit-barcode-list" as const;

  public constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<ul><slot></slot></ul>`;
    shadowRoot.prepend(BarcodeList.css.cloneNode(true));
  }

  public static get css(): HTMLStyleElement {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    `;
    return styleElement;
  }

  public static create(): BarcodeList {
    return document.createElement(BarcodeList.tag);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [BarcodeList.tag]: BarcodeList;
  }
}
