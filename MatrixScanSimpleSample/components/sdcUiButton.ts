/* eslint-disable import/extensions */
import type { CSSResult, TemplateResult } from "lit";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sdc-ui-button")
export class SdcUiButton extends LitElement {
  public static styles: CSSResult[] = [
    css`
      button {
        padding: 1rem 1rem;
        width: 15rem;
        color: white;
        border: none;
        background: mediumturquoise;
      }
    `,
  ];

  public render(): TemplateResult {
    return html`<button><slot /></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sdc-ui-button": SdcUiButton;
  }
}
