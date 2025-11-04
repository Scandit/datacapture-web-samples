const pxTimesDpr = (x: number, dpr = window.devicePixelRatio): string => `${x * dpr}px`;

export function BubbleComponent(data: { title: string; subtitle?: string }): HTMLElement {
  const container = document.createElement("div");
  const info = document.createElement("div");
  const title = document.createElement("div");
  const height = 50;
  const width = 200;
  const borderRadius = pxTimesDpr(height / 2);
  const widthDpr = pxTimesDpr(width);
  const heightDpr = pxTimesDpr(height);

  // main container
  Object.assign(container.style, {
    width: widthDpr,
    height: heightDpr,
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius,
    position: "absolute",
  } satisfies Partial<CSSStyleDeclaration>);
  // texts container
  Object.assign(info.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: "1",
    color: "black",
    padding: `${pxTimesDpr(16)} 0px`,
    fontFamily: "Helvetica, sans-serif",
    fontSize: pxTimesDpr(12),
    textAlign: "center",
  } satisfies Partial<CSSStyleDeclaration>);

  title.style.fontWeight = "bold";
  title.textContent = data.title;

  let details = null;
  if (data.subtitle != null) {
    details = document.createElement("div");
    details.textContent = data.subtitle;
    info.append(details);
  }

  info.append(title);
  if (details != null) {
    info.append(details);
  }
  container.append(info);

  return container;
}
