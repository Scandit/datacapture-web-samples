/* eslint-disable import/extensions */
import type { CSSResult, TemplateResult } from "lit";
import { css, html, LitElement } from "lit";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { customElement, property } from "lit/decorators.js";

const waitTransition = async (element: HTMLElement): Promise<void> =>
  new Promise((resolve) => {
    element.addEventListener(
      "animationend",
      () => {
        resolve();
      },
      { once: true }
    );
  });

const slideUp = css`
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const slideDown = css`
  @keyframes slideDown {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const fadeOut = css`
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

@customElement("sdc-ui-drawer-bottom")
export class SdcUiDrawerBottom extends LitElement {
  public static styles: CSSResult[] = [
    slideUp,
    slideDown,
    fadeIn,
    fadeOut,
    css`
      dialog {
        width: auto;
        padding: 1rem;
        border: none !important;
        position: fixed;
        display: block;
        bottom: 0;
        transform: translateY(100%);
        z-index: 1;
        background-color: white;
        height: 90dvh;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        inset-block-start: unset;
      }

      dialog::backdrop,
      dialog + .backdrop {
        -webkit-tap-highlight-color: transparent;
        background: rgba(0, 0, 0, 0.85);
      }

      dialog + .backdrop {
        position: fixed;
        inset: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100dvh;
        background: rgba(0, 0, 0, 0.85);
      }

      dialog[open]::backdrop,
      dialog[open] + .backdrop {
        animation: fadeIn 0.3s ease forwards;
      }

      dialog.hide::backdrop,
      dialog.hide + .backdrop {
        animation: fadeOut 0.2s ease forwards;
      }

      dialog[open] {
        animation: slideUp 0.3s ease forwards;
      }
      dialog.hide {
        animation: slideDown 0.3s ease forwards;
      }

      dialog .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-between;
      }

      ::slotted([slot="footer"]) {
        display: inline-flex;
        align-self: center;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true, attribute: true })
  public open: boolean = false;

  protected _dialog: Ref<HTMLDialogElement> = createRef();

  private readonly onPointerDownListener: typeof this.onPointerDown = this.onPointerDown.bind(this);

  protected async updated(changed: Map<"open", boolean>): Promise<void> {
    if (changed.get("open") === undefined) {
      // first time is undefined
      return;
    }
    await (this.open ? this.show() : this.hide());
  }

  protected render(): TemplateResult {
    return html`
      <dialog ${ref(this._dialog)} @pointerdown=${this.onPointerDownListener}>
        <div class="container">
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }

  private async show(): Promise<void> {
    this._dialog.value?.showModal();
    if (this._dialog.value) {
      await waitTransition(this._dialog.value);
      this.dispatchEvent(new CustomEvent("onopened"));
    }
  }

  private async hide(): Promise<void> {
    this._dialog.value?.close();
    this._dialog.value?.classList.add("hide");
    if (this._dialog.value) {
      await waitTransition(this._dialog.value);
      this._dialog.value.classList.remove("hide");
      this.dispatchEvent(new CustomEvent("onclosed"));
    }
  }

  private onPointerDown(pointerEvent: PointerEvent): void {
    const rect = (pointerEvent.target as HTMLDialogElement).getBoundingClientRect();
    const clickedInDialog =
      rect.top <= pointerEvent.clientY &&
      pointerEvent.clientY <= rect.top + rect.height &&
      rect.left <= pointerEvent.clientX &&
      pointerEvent.clientX <= rect.left + rect.width;
    if (!clickedInDialog) {
      this.dispatchEvent(new CustomEvent("onbackdropclick"));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sdc-ui-drawer-bottom": SdcUiDrawerBottom;
  }
}
