import { html } from "uhtml";
import { BaseComponent } from "./base-component.js";
import { css } from "./css.js";

class FeatureCard extends BaseComponent {
  static get observedAttributes() {
    return ["title", "description"];
  }

  // Static styles like Lit
  static styles = css`
    :host {
      display: block;
      border-radius: 1rem;
      background: #18191a;
      color: #fff;
      box-shadow: 0 0.25rem 1rem rgba(0,0,0,0.16);
      padding: 0.75rem;
      min-width: 0;
      min-height: 0;
      font-family: 'Inter', Arial, sans-serif;
      cursor: pointer;
      transition: box-shadow 0.2s;
      width: 9.5rem;
      aspect-ratio: 1 / 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    :host(:hover) {
      box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,0.22);
    }
    .row {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1 1 auto;
      gap: 1rem;
    }
    .icon-bg {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 0.125rem;
      overflow: hidden;
    }
    .icon-bg ::slotted(svg) {
      display: block;
      width: 2.25rem;
      height: 2.25rem;
      margin: auto;
    }
    .content {
      flex: 0 0 auto;
      margin-top: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .title {
      font-weight: 600;
      font-size: 1rem;
      color: #fff;
      margin-bottom: 0.25rem;
      line-height: 1.2;
    }
    .desc {
      font-size: 0.875rem;
      font-weight: 400;
      color: #fff;
      opacity: 0.85;
      line-height: 1.3;
    }
  `;

  private _title = "";
  private _description = "";

  constructor() {
    super({ useShadowDOM: true, tagName: "feature-card" });
  }

  protected render() {
    return html`
      <div class="row">
        <div class="icon-bg">
          <slot name="icon"></slot>
        </div>
        <div class="content">
          <div class="title">${this._title}</div>
          <div class="desc">${this._description}</div>
        </div>
      </div>
    `;
  }

  protected onAttributeChanged(name: string, _oldValue: string, newValue: string): void {
    if (name === "title") {
      this._title = newValue;
    } else if (name === "description") {
      this._description = newValue;
    }
  }

  get title() {
    return this._title;
  }

  set title(val: string) {
    this.setAttribute("title", val);
  }

  get description() {
    return this._description;
  }

  set description(val: string) {
    this.setAttribute("description", val);
  }
}

customElements.define("feature-card", FeatureCard);

declare global {
  interface HTMLElementTagNameMap {
    "feature-card": FeatureCard;
  }
}
