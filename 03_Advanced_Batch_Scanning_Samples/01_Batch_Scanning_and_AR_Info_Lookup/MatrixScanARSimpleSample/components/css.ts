// Lit-like CSS system
export const css = (strings: TemplateStringsArray, ...values: any[]) => {
  const cssText = strings.reduce((result, str, i) => {
    return result + str + (values[i] || "");
  }, "");
  return new CSSResult(cssText);
};

// CSSResult class similar to Lit's approach
export class CSSResult {
  private _cssText: string;
  private _styleSheet: CSSStyleSheet | null = null;

  constructor(cssText: string) {
    this._cssText = cssText;
  }

  get cssText(): string {
    return this._cssText;
  }

  get styleSheet(): CSSStyleSheet | null {
    if (!this._styleSheet) {
      this._styleSheet = new CSSStyleSheet();
      this._styleSheet.replaceSync(this._cssText);
    }
    return this._styleSheet;
  }

  toString(): string {
    return this._cssText;
  }
}

// AdoptedStyleSheets support for better performance
export const supportsAdoptedStyleSheets =
  "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
