import { html } from "uhtml";
import { BaseComponent } from "./base-component.js";
import { css } from "./css.js";
import { features } from "./features-data.js";
import { icons } from "./icons.js";

class HomeSection extends BaseComponent {
  // Static styles like Lit
  static styles = css`
    :host {
      display: block;
      max-width: 960px;
      margin: 0 auto;
      padding: 0 16px;
      box-sizing: border-box;
    }
    .logo {
      margin-top: 32px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 14px;
    }
    .title {
      font-size: 2.25rem;
      font-weight: 700;
      color: #00979D;
      margin-bottom: 4rem;
      letter-spacing: -0.5px;
      text-align: left;
    }
    .section-label {
      font-size: 1rem;
      font-weight: 400;
      color: #18191a;
      margin-bottom: 24px;
      text-align: left;
    }
    .cards {
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .cards > feature-card[role="listitem"] {
      flex: 0 0 8.5rem;
      width: 8.5rem;
      margin-bottom: 0;
    }

    @media (max-width: 400px) {
      .cards {
        gap: 0.45rem;
      }
    }
  `;

  constructor() {
    super({ useShadowDOM: true, tagName: "home-section" });
  }

  protected render() {
    return html`
      <div class="logo">${icons.scanditLogo()}</div>
      <div class="title">MatrixScan AR</div>
      <div class="section-label">Try these features:</div>
      <div class="cards" role="list">
        ${features.map(
          (feature) => html`
          <feature-card
            title="${feature.title}"
            description="${feature.description}"
            role="listitem"
            @click=${() =>
              this.dispatchEvent(
                new CustomEvent("feature-select", {
                  detail: { feature: feature.preset },
                  bubbles: true,
                  composed: true,
                })
              )}
          >
            <div slot="icon">${feature.icon()}</div>
          </feature-card>
        `
        )}
      </div>
    `;
  }
}

customElements.define("home-section", HomeSection);

declare global {
  interface HTMLElementTagNameMap {
    "home-section": HomeSection;
  }
}
