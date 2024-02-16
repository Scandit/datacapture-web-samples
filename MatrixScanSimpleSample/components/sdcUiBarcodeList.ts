/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import type { CSSResult, TemplateResult } from "lit";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sdc-ui-barcode-list-item")
export class SdcUiBarcodeListItem extends LitElement {
  public static styles: CSSResult[] = [
    css`
      li {
        position: relative;
        list-style-type: none;
        margin-bottom: 0.8rem;
      }

      li::after {
        display: inline-block;
        content: " ";
        width: 100%;
        height: 1px;
        background: lightgray;
      }

      li ::slotted([slot="type"]) {
        color: mediumturquoise;
      }
    `,
  ];

  protected render(): TemplateResult {
    return html`
      <li>
        <slot name="value"></slot>
        <slot name="type"></slot>
      </li>
    `;
  }
}

@customElement("sdc-ui-barcode-list")
export class SdcUiBarcodeList extends LitElement {
  public static styles: CSSResult[] = [
    css`
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    `,
  ];

  protected render(): TemplateResult {
    return html`
      <ul>
        <slot></slot>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sdc-ui-barcode-list": SdcUiBarcodeList;
    "sdc-ui-barcode-list-item": SdcUiBarcodeListItem;
  }
}
