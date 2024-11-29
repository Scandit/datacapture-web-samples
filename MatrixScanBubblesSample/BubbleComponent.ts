const pxTimesDpr = (x: number, dpr = window.devicePixelRatio): string => `${x * dpr}px`;

export function BubbleComponent(data: { title: string; subtitle?: string }): HTMLElement {
  const container = document.createElement("div");
  const bubble = document.createElement("div");
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
    "background-color": "rgb(216,216,216)",
    borderRadius,
    position: "absolute",
  });
  // texts container
  Object.assign(info.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: "1",
    color: "black",
    padding: `${pxTimesDpr(16)} 0px ${pxTimesDpr(16)} ${pxTimesDpr(10)}`,
    fontFamily: "Helvetica, sans-serif",
    fontSize: pxTimesDpr(12),
  });
  // bubble
  Object.assign(bubble.style, {
    borderRadius,
    height: heightDpr,
    width: heightDpr,
    backgroundColor: "rgb(65,155,147)",
    overflow: "hidden",
  });

  // This image is here for testing purposes and will be stripped if the license does not support it.
  // Please contact support@scandit.com if you have any questions.
  const img = document.createElement("img");
  img.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC";
  bubble.append(img);

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
  container.append(bubble);
  container.append(info);

  return container;
}
