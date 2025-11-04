import { html } from "uhtml";
import { Presets } from "../Presets.js";
import { sdkProvider } from "../sdk-provider.js";
import { BaseComponent } from "./base-component.js";
import { features } from "./features-data.js";
import { icons } from "./icons.js";

class ScanPage extends BaseComponent {
  static get observedAttributes() {
    return ["preset"];
  }

  private _preset: string = "";
  private onReturnHandler: () => void;

  constructor() {
    super({ useShadowDOM: false, tagName: "scan-page" });
    this.onReturnHandler = this.onReturn.bind(this);
  }

  async onConnected() {
    await sdkProvider.mountBarcodeArViewTo(
      this.renderTarget!.querySelector("#barcode-ar-view") as HTMLElement,
      this.preset as Presets
    );
    await sdkProvider.barcodeArView?.start();
  }

  async onDisconnected() {
    await sdkProvider.unmountBarcodeArView();
  }

  onReturn() {
    this.dispatchEvent(new CustomEvent("return", { bubbles: true, composed: true }));
  }

  protected render() {
    return html`
      <style>
        scan-page {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: #000;
          color: #fff;
        }
        .header {
          flex: 0 0 auto;
          min-height: 60px;
          padding: 1rem 0;
          width: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          box-sizing: border-box;
        }
        .main {
          flex: 1 1 auto;
          width: 100%;
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }
        .footer {
          flex: 0 0 auto;
          min-height: 60px;
          padding: 1rem 0;
          width: 100%;
          background: #000;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 2rem;
          width: 100%;
        }
        .return-btn {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: #444;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #fff;
          margin-right: 1rem;
          cursor: pointer;
          flex-direction: column;
        }
        .return-label {
          font-size: 1rem;
          color: #fff;
        }
        #barcode-ar-view {
          width: 100%;
          height: 100%;
        }

        @media (orientation: landscape) {
          .header {
            min-height: 50px;
            padding: 0 0.75rem;
            font-size: 1.25rem;
          }
          .footer {
            min-height: 50px;
            padding: 0 0.75rem;
          }
          .return-btn {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
          }
          .return-label {
            font-size: 0.875rem;
          }
        }
      </style>
      <div class="header">${features.find((feature) => feature.preset === this.preset)?.title}</div>
      <div class="main">
        <div id="barcode-ar-view"></div>
      </div>
      <div class="footer">
        <div class="footer-content">
          <button class="return-btn" aria-label="Return" @click=${this.onReturnHandler}>
            ${icons.back()}
          </button>
          <div class="return-label">Return</div>
        </div>
      </div>
    `;
  }

  protected onAttributeChanged(name: string, _oldValue: string, newValue: string): void {
    if (name === "preset") {
      this._preset = newValue;
    }
  }

  get preset(): string {
    return this._preset;
  }

  set preset(val: string) {
    this.setAttribute("preset", val);
  }
}

customElements.define("scan-page", ScanPage);

declare global {
  interface HTMLElementTagNameMap {
    "scan-page": ScanPage;
  }
}
