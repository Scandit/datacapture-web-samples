export function removeAllChildNodes(parent: Node): void {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}
export function define(customElementMap: Record<string, CustomElementConstructor>): void {
  for (const [tag, constructor] of Object.entries(customElementMap)) {
    if (!customElements.get(tag)) {
      customElements.define(tag, constructor);
    }
  }
}
