export class BarcodeListItem extends HTMLElement {
  public static readonly tag: "scandit-barcode-list-item" = "scandit-barcode-list-item" as const;

  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<li>
      <slot name="value"></slot>
      <slot name="right"></slot>
    </li>`;
    shadowRoot.prepend(BarcodeListItem.css);
  }

  public static get css(): HTMLStyleElement {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      li {
        position: relative;
        list-style-type: none;
        margin-bottom: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        margin: 1rem 0rem;
      }
    `;
    return styleElement;
  }

  public static create(): BarcodeListItem {
    return document.createElement(BarcodeListItem.tag);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [BarcodeListItem.tag]: BarcodeListItem;
  }
}
