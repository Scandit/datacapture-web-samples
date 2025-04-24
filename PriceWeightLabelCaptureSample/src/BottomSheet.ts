import type { ListenerForEvent } from "./utils";

enum SwipeDirection {
	Up = 0,
	Down = 1,
}

export enum BottomSheetState {
	Expanded = 0,
	Collapsed = 75,
	Hidden = 100,
}

export class BottomSheet extends HTMLElement {
	public isHideable = false;
	public onStateChange?: (state: BottomSheetState) => void;

	private _state = BottomSheetState.Hidden;

	private backdrop?: HTMLElement;

	private bottomSheet?: HTMLElement;

	private isDragging = false;

	private lastPointerY?: number;

	private pointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onPointerDown.bind(this);

	private backdropPointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onBackdropClick.bind(this);

	private bottomSheetPointerDownListener: ListenerForEvent<"pointerdown"> =
		this.onBottomSheetPointerDown.bind(this);

	private bottomSheetPointerMoveListener: ListenerForEvent<"pointermove"> =
		this.onBottomSheetPointerMove.bind(this);

	private bottomSheetPointerUpListener: ListenerForEvent<"pointerup"> =
		this.onBottomSheetPointerUp.bind(this);

	public constructor() {
		super();
		const shadowRoot = this.attachShadow({
			mode: "open",
		});
		shadowRoot.innerHTML = `
      <div class="backdrop"></div>
			<div class="bottomSheet">
        <slot></slot>
			</div>
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100dvw;
          height: 100dvh;
          display: block;
          z-index: 10;
        }

        :host .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0.32;
          transition: opacity 0.3s;
          z-index: -10;
        }

        :host .bottomSheet {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: fit-content;
          background: white;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          box-sizing: border-box;
          z-index: 10;
          transition: transform 0.3s;
        }
      </style>
		`;
	}

	public get state(): BottomSheetState {
		return this._state;
	}

	public set state(state: BottomSheetState) {
		this.setState(state);
	}

	public connectedCallback(): void {
		this.backdrop = this.shadowRoot?.querySelector(".backdrop") as HTMLElement;
		this.bottomSheet = this.shadowRoot?.querySelector(
			".bottomSheet",
		) as HTMLElement;
		this.addEventListener("pointerdown", this.pointerDownListener);
		this.backdrop?.addEventListener(
			"pointerdown",
			this.backdropPointerDownListener,
		);
		this.bottomSheet?.addEventListener(
			"pointerdown",
			this.bottomSheetPointerDownListener,
		);
		this.bottomSheet?.addEventListener(
			"pointermove",
			this.bottomSheetPointerMoveListener,
		);
		this.bottomSheet?.addEventListener(
			"pointerup",
			this.bottomSheetPointerUpListener,
		);
		this.state = this.state;
	}

	public disconnectedCallback(): void {
		this.removeEventListener("pointerdown", this.pointerDownListener);
		this.backdrop?.removeEventListener(
			"pointerdown",
			this.backdropPointerDownListener,
		);
		this.bottomSheet?.removeEventListener(
			"pointerdown",
			this.bottomSheetPointerDownListener,
		);
		this.bottomSheet?.removeEventListener(
			"pointermove",
			this.bottomSheetPointerMoveListener,
		);
		this.bottomSheet?.removeEventListener(
			"pointerup",
			this.bottomSheetPointerUpListener,
		);
	}

	private setState(state: BottomSheetState): void {
		this._state = state;
		this.style.setProperty(
			"pointer-events",
			state === BottomSheetState.Hidden ? "none" : "initial",
		);
		this.backdrop?.style.setProperty(
			"opacity",
			state === BottomSheetState.Hidden ? "0" : "0.32",
		);
		this.bottomSheet?.style.setProperty(
			"opacity",
			state === BottomSheetState.Hidden ? "0" : "1",
		);
		this.bottomSheet?.style.setProperty("transform", `translateY(${state}%)`);
		this.onStateChange?.(state);
	}

	private onPointerDown(event: Event): void {
		event.stopPropagation();
	}

	private onBackdropClick(): void {
		this.state = BottomSheetState.Hidden;
	}

	private onBottomSheetPointerDown(event: PointerEvent): void {
		this.isDragging = true;
		this.bottomSheet?.setPointerCapture(event.pointerId);
	}

	private onBottomSheetPointerMove(event: PointerEvent): void {
		if (!this.isDragging) {
			return;
		}
		if (this.lastPointerY == null) {
			this.lastPointerY = event.clientY;
			return;
		}
		const deltaY = event.clientY - this.lastPointerY;
		const absoluteDeltaY = Math.abs(deltaY);
		if (absoluteDeltaY < MINIMUM_SWIPE_DISTANCE) {
			return;
		}
		const swipeDirection = deltaY < 0 ? SwipeDirection.Up : SwipeDirection.Down;
		switch (true) {
			case swipeDirection === SwipeDirection.Up &&
				this.state === BottomSheetState.Collapsed:
				this.state = BottomSheetState.Expanded;
				break;
			case swipeDirection === SwipeDirection.Down &&
				this.state === BottomSheetState.Expanded:
				this.state = this.isHideable
					? BottomSheetState.Hidden
					: BottomSheetState.Collapsed;
				break;
			case swipeDirection === SwipeDirection.Down &&
				this.state === BottomSheetState.Collapsed:
				this.state = BottomSheetState.Hidden;
				break;
		}
		this.isDragging = false;
		this.lastPointerY = undefined;
	}

	private onBottomSheetPointerUp(event: PointerEvent): void {
		if (this.isDragging) {
			this.isDragging = false;
			this.lastPointerY = undefined;
			this.bottomSheet?.releasePointerCapture(event.pointerId);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"bottom-sheet": BottomSheet;
	}
}

const MINIMUM_SWIPE_DISTANCE = 8;
