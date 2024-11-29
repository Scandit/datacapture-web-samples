/* eslint-disable import/extensions */
import type { CSSResult, TemplateResult } from "lit";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sdc-ui-button")
export class SdcUiButton extends LitElement {
  public static styles: CSSResult[] = [
    css`
      button {
        --size: 3.5rem;
        padding: 1rem 1rem;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        color: white;
        border: none;
        border: 0.25rem solid white;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: x-large;
      }
    `,
  ];

  @property({
    type: Boolean,
    reflect: true,
  })
  public frozen: boolean = false;

  public render(): TemplateResult {
    return html`<button>${this.frozen ? "×" : ""}</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sdc-ui-button": SdcUiButton;
  }
}
