import * as SDCId from "@scandit/web-datacapture-id";

export enum Action {
  CLOSE_RESULT = "CLOSE_RESULT",
  CLOSE_WARNING = "CLOSE_WARNING",
  CLOSE_WARNING_RESET = "CLOSE_WARNING_RESET",
  MANUAL_UPLOAD = "MANUAL_UPLOAD",
}

export const elements = {
  dataCaptureView: document.querySelector("#data-capture-view") as HTMLDivElement,
  backdrop: document.querySelector("#backdrop") as HTMLDivElement,
  alert: document.querySelector("#alert") as HTMLDivElement,
  result: document.querySelector("#result") as HTMLDivElement,
  resultContent: document.querySelector("#result .card-content") as HTMLDivElement,
  resultFooter: document.querySelector("#result .card-footer") as HTMLDivElement,
  manualUpload: document.querySelector("#manual-upload") as HTMLDivElement,
  loader: document.querySelector("#loader") as HTMLDivElement,
};

function showBackdrop(): void {
  elements.backdrop.removeAttribute("hidden");
}

function hideBackdrop(): void {
  elements.backdrop.setAttribute("hidden", "true");
}

export function showWarning(title: string, text: string, buttons: { action: Action; label: string }[]): void {
  // eslint-disable-next-line no-unsanitized/property
  elements.alert.innerHTML = `
    <div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
    <div>
      ${buttons.map((button) => `<button onclick="window.dispatchAction('${button.action}')">${button.label}</button>`).join("")}
    </div>
  `;
  elements.alert.removeAttribute("hidden");
  showBackdrop();
}

function getFragmentFromDOMString(domString: string): DocumentFragment {
  // eslint-disable-next-line no-unsanitized/method
  return document.createRange().createContextualFragment(domString);
}

function getDOMStringForLabel(label: string): string {
  return `<span class="label">${label}</span>`;
}

function getDOMStringForValue(value: unknown): string {
  const element = document.createElement("span");
  const emptyElement = document.createElement("i");
  emptyElement.textContent = "empty";

  if (value == null || value === "") {
    element.append(emptyElement);
  } else if (value instanceof SDCId.DateResult) {
    if (typeof value.day === "number" && typeof value.month === "number" && typeof value.year === "number") {
      const d = new Date(value.year, value.month - 1, value.day);
      element.textContent = d.toLocaleDateString();
    } else {
      element.append(emptyElement);
    }
  } else {
    element.textContent = value as string;
  }

  return element.outerHTML;
}

function getFragmentForFields(fields: [string, unknown][]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  for (const [label, value] of fields) {
    fragment.append(
      getFragmentFromDOMString(`
        <div class="field">
          ${getDOMStringForLabel(label)}
          ${getDOMStringForValue(value)}
        </div>
        <hr>
      `)
    );
  }
  return fragment;
}

/**
 * @param capturedId What we could capture
 * @param backImage The raw image of the back side of the document if we could not recognize it
 */
export function showResult(capturedId: SDCId.CapturedId, backImage?: string): void {
  const result = document.createDocumentFragment();

  if (capturedId.images.face != null) {
    const faceImage = new Image();
    faceImage.className = "face-image";
    faceImage.src = capturedId.images.face;
    result.append(faceImage);
    result.append(document.createElement("hr"));
  }

  // Common fields
  result.append(
    getFragmentForFields([
      ["Full Name", capturedId.fullName],
      ["Date of Birth", capturedId.dateOfBirth],
      ["Expiration Date", capturedId.dateOfExpiry],
      ["Document Number", capturedId.documentNumber],
    ])
  );

  const frontImageData = capturedId.images.getCroppedDocument(SDCId.IdSide.Front);
  const backImageData =
    capturedId.images.getCroppedDocument(SDCId.IdSide.Back) ??
    capturedId.images.getFrame(SDCId.IdSide.Back) ??
    backImage;
  if (frontImageData != null || backImageData != null) {
    result.append(getFragmentFromDOMString(getDOMStringForLabel("Captured Images")));
    if (frontImageData != null) {
      const frontImage = new Image();
      frontImage.className = "card-image";
      frontImage.src = frontImageData;
      result.append(frontImage);
    }
    if (backImageData != null) {
      const backImageElement = new Image();
      backImageElement.className = "card-image";
      backImageElement.src = backImageData;
      result.append(backImageElement);
    }
  }

  elements.resultContent.textContent = "";
  elements.resultContent.append(result);
  elements.result.removeAttribute("hidden");
  elements.resultContent.scrollTop = 0;
  showBackdrop();
}

export function showManualUploadOption(): void {
  elements.manualUpload.removeAttribute("hidden");
}

export function hideManualUploadOption(): void {
  elements.manualUpload.setAttribute("hidden", "true");
}

export async function showLoader(): Promise<void> {
  elements.loader.removeAttribute("hidden");
  showBackdrop();
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  closeLoader();
}

export function closeDialog(): void {
  elements.alert.setAttribute("hidden", "true");
  hideBackdrop();
}

export function closeResults(): void {
  elements.result.setAttribute("hidden", "true");
  hideBackdrop();
}

export function closeLoader(): void {
  elements.loader.setAttribute("hidden", "true");
  hideBackdrop();
}
