const waitAnimationEnd = async (element: HTMLElement): Promise<void> =>
  new Promise((resolve) => {
    element.addEventListener(
      "animationend",
      () => {
        resolve();
      },
      { once: true }
    );
  });

export class DrawerBottom extends HTMLElement {
  public static readonly tag: "scandit-drawer-bottom" = "scandit-drawer-bottom" as const;

  public static obsevedAttributes: string[] = ["open", "expanded"];

  private _dialog: HTMLDialogElement | null = null;

  private readonly onPointerDownHandler: DrawerBottom["onPointerDown"] = this.onPointerDown.bind(this);

  public constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <dialog>
        <div class="container">
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
    shadowRoot.prepend(DrawerBottom.css.cloneNode(true));
  }

  public static get css(): HTMLStyleElement {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes slideDown {
        from {
          transform: translateY(0%);
        }
        to {
          transform: translateY(100%);
        }
      }
      @keyframes slideUp {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0%);
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      dialog {
        width: auto;
        padding: 1rem 1rem;
        border: none !important;
        position: fixed;
        display: block;
        bottom: env(safe-area-inset-bottom);
        transform: translateY(100%);
        z-index: 1;
        background-color: white;
        height: 8dvh;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        inset-block-start: unset;
        transition: height 0.3s ease-in-out;
        overflow: hidden;
      }

      @media only screen and (orientation: landscape) {
        dialog{
          height: 14dvh;
        }
      }

      dialog::backdrop,
      dialog + .backdrop {
        -webkit-tap-highlight-color: transparent;
        background: rgba(0, 0, 0, 0.55);
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
        height: calc(100% - var(--handle-height) - 0.2rem);
        justify-content: space-between;
      }

      ::slotted([slot="footer"]) {
        display: inline-flex;
        align-self: center;
      }
    `;
    return styleElement;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public get open(): boolean {
    return this.hasAttribute("open");
  }

  public set open(value: boolean | null) {
    if (value != null && value) {
      void this.show();
    } else {
      void this.hide();
    }
  }

  public static create(): DrawerBottom {
    return document.createElement(DrawerBottom.tag);
  }

  public connectedCallback(): void {
    this._dialog = this.shadowRoot!.querySelector("dialog");
  }

  public disconnectedCallback(): void {
    this._dialog?.removeEventListener("pointerdown", this.onPointerDownHandler);
  }

  public attributeChangeCallback(name: string, _oldValue: string, _newValue: string): void {
    if (name === "open") {
      this.open = this.hasAttribute("open");
    }
  }

  public async show(): Promise<void> {
    this._dialog?.classList.remove("hide");
    this._dialog?.showModal();
    if (this._dialog) {
      await waitAnimationEnd(this._dialog);
      this.dispatchEvent(new CustomEvent("onopened"));
    }
  }

  public async hide(): Promise<void> {
    if (this._dialog && !this._dialog.classList.contains("hide")) {
      this._dialog.classList.add("hide");
      await waitAnimationEnd(this._dialog);
      this._dialog.close();
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
    [DrawerBottom.tag]: DrawerBottom;
  }
  interface HTMLElementEventMap {
    onbackdropclick: CustomEvent<void>;
    onopened: CustomEvent<void>;
    onclosed: CustomEvent<void>;
  }
}
