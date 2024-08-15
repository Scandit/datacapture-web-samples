export const elements = {
  dataCaptureView: document.querySelector("#data-capture-view") as HTMLDivElement,
  backdrop: document.querySelector("#backdrop") as HTMLDivElement,
  alert: document.querySelector("#alert") as HTMLDivElement,
  loader: document.querySelector("#loader") as HTMLDivElement,
  thanks: document.getElementById("thanks") as HTMLDivElement,
  shutter: document.getElementById("shutter") as HTMLButtonElement,
  timeout: document.getElementById("timeout") as HTMLDivElement,
  timeoutTryAgainButton: document.getElementById("timeout-try-again") as HTMLButtonElement,
  timeoutManualUploadButton: document.getElementById("timeout-manual-upload") as HTMLButtonElement,
  review: document.getElementById("review") as HTMLDivElement,
  reviewImages: document.querySelector(".review__images") as HTMLDivElement,
  reviewOkButton: document.getElementById("review-ok") as HTMLButtonElement,
  reviewRetryButton: document.getElementById("review-fail") as HTMLButtonElement,
};

function showBackdrop(): void {
  elements.backdrop.removeAttribute("hidden");
}

function hideBackdrop(): void {
  elements.backdrop.setAttribute("hidden", "true");
}

export async function showDialog<T extends string>(
  title: string,
  text: string,
  buttons: { id: T; label: string }[]
): Promise<T> {
  return new Promise((resolve) => {
    function onButtonClicked(event: Event): void {
      for (const button of buttons) {
        document.querySelector(`#warn-${button.id}`)?.removeEventListener("click", onButtonClicked);
      }
      closeDialog();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      resolve((event.target as HTMLButtonElement).id.replace("warn-", "") as T);
    }
    // eslint-disable-next-line no-unsanitized/property
    elements.alert.innerHTML = `
    <div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
    <div>
      ${buttons.map((button) => `<button id="warn-${button.id}">${button.label}</button>`).join("")}
    </div>
  `;
    for (const button of buttons) {
      document.querySelector(`#warn-${button.id}`)?.addEventListener("click", onButtonClicked);
    }
    elements.alert.removeAttribute("hidden");
    showBackdrop();
  });
}

export async function showLoader(durationMs?: number): Promise<void> {
  elements.loader.removeAttribute("hidden");
  showBackdrop();
  if (typeof durationMs === "number") {
    await new Promise((resolve) => {
      setTimeout(resolve, durationMs);
    });
    closeLoader();
  }
}

export function closeDialog(): void {
  elements.alert.setAttribute("hidden", "true");
  hideBackdrop();
}

export function closeLoader(): void {
  elements.loader.setAttribute("hidden", "true");
  hideBackdrop();
}
