import { html, render } from "uhtml/signal";
import { CSSResult, supportsAdoptedStyleSheets } from "./css.js";

export interface BaseComponentOptions {
  useShadowDOM?: boolean;
  tagName: string;
}

export abstract class BaseComponent extends HTMLElement {
  public shadowRoot: ShadowRoot | null = null;
  protected useShadowDOM: boolean;

  constructor(options: BaseComponentOptions) {
    super();
    this.useShadowDOM = options.useShadowDOM ?? false;

    if (this.useShadowDOM) {
      this.shadowRoot = this.attachShadow({ mode: "open" });
    }
  }

  protected get renderTarget(): Element | ShadowRoot {
    return this.useShadowDOM ? this.shadowRoot! : this;
  }

  protected abstract render(): ReturnType<typeof html>;

  // Optional method for components to define their styles
  protected static styles?: CSSResult | CSSResult[];

  protected get styles(): CSSResult[] {
    const staticStyles = (this.constructor as typeof BaseComponent).styles;
    if (staticStyles) {
      return Array.isArray(staticStyles) ? staticStyles : [staticStyles];
    }
    return [];
  }

  protected update(): void {
    render(this.renderTarget, () => this.render());
    this._applyStyles();
  }

  private _applyStyles(): void {
    if (!this.useShadowDOM || !this.shadowRoot || this.styles.length === 0) {
      return;
    }

    const styles = this.styles;
    if (supportsAdoptedStyleSheets) {
      // Use adoptedStyleSheets for better performance
      const styleSheets = styles
        .map((style) => style.styleSheet)
        .filter((sheet): sheet is CSSStyleSheet => sheet !== null);

      if (styleSheets.length > 0) {
        this.shadowRoot.adoptedStyleSheets = styleSheets;
      }
    } else {
      // Fallback to style elements
      const existingStyles = this.shadowRoot.querySelectorAll("style");
      for (const style of Array.from(existingStyles)) {
        style.remove();
      }

      for (const style of styles) {
        const styleElement = document.createElement("style");
        styleElement.textContent = style.cssText;
        this.shadowRoot!.appendChild(styleElement);
      }
    }
  }

  connectedCallback(): void {
    this.update();
    this.onConnected?.();
  }

  disconnectedCallback(): void {
    this.onDisconnected?.();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.onAttributeChanged?.(name, oldValue, newValue);
      this.update();
    }
  }

  // Optional lifecycle hooks that subclasses can override
  protected onConnected?(): void;
  protected onDisconnected?(): void;
  protected onAttributeChanged?(name: string, oldValue: string, newValue: string): void;
}
