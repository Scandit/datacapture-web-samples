import { html } from "uhtml";
import { signal } from "uhtml/signal";
import { Presets } from "../Presets.js";
import { sdkProvider } from "../sdk-provider.js";
import { BaseComponent } from "./base-component.js";
import { css } from "./css.js";

interface AppState {
  currentView: "home" | "scan";
  selectedPreset?: Presets;
}

class AppRoot extends BaseComponent {
  private state = signal<AppState>({
    currentView: "home",
  });

  public licenseKey = "";

  constructor() {
    super({ useShadowDOM: false, tagName: "app-root" });
  }

  static styles = css`
    app-root {
      display: block;
      font-family: "Inter", Arial, sans-serif;
      width: 100%;
      height: 100dvh;
      overflow: auto;
    }
  `;

  protected render() {
    return html`
      <style>
        ${this.styles.map((style) => style.cssText).join("\n")}
      </style>
      ${
        this.state.value.currentView === "home"
          ? html`<home-section @feature-select=${this.handleFeatureSelect}></home-section>`
          : this.state.value.selectedPreset
            ? html`<scan-page preset="${this.state.value.selectedPreset}" @return=${this.handleReturn}></scan-page>`
            : null
      }
    `;
  }

  async onConnected() {
    await sdkProvider.configure({ licenseKey: this.licenseKey });
  }

  async onDisconnected() {
    await sdkProvider.dispose();
  }

  private handleFeatureSelect = (event: Event) => {
    const customEvent = event as CustomEvent;
    const preset = customEvent.detail.feature;

    this.state.value = {
      currentView: "scan",
      selectedPreset: preset,
    };
  };

  private handleReturn = () => {
    this.state.value = {
      currentView: "home",
    };
  };
}

customElements.define("app-root", AppRoot);

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
