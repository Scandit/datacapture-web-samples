export class SearchIconButton extends HTMLElement {
  public static readonly tag: "scandit-search-icon-button" = "scandit-search-icon-button" as const;

  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<button>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66667 2C4.08934 2 2 4.08934 2 6.66667V11.3333H5.11111V6.66667C5.11111 5.80756 5.80756 5.11111 6.66667 5.11111H11.3333V2H6.66667Z" fill="white"/>
        <path d="M20.6667 2V5.11111H25.3333C26.1924 5.11111 26.8889 5.80756 26.8889 6.66667V11.3333H30V6.66667C30 4.08934 27.9107 2 25.3333 2H20.6667Z" fill="white"/>
        <path d="M11.3333 26.8889H6.66667C5.80756 26.8889 5.11111 26.1924 5.11111 25.3333V20.6667H2V25.3333C2 27.9107 4.08934 30 6.66667 30H11.3333V26.8889Z" fill="white"/>
        <path d="M20.6667 30H25.3333C27.9107 30 30 27.9107 30 25.3333V20.6667H26.8889V25.3333C26.8889 26.1924 26.1924 26.8889 25.3333 26.8889H20.6667V30Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3668 21.4779C17.4213 21.9541 16.3531 22.2222 15.2222 22.2222C11.3562 22.2222 8.22222 19.0882 8.22222 15.2222C8.22222 11.3562 11.3562 8.22222 15.2222 8.22222C16.2824 8.22222 17.2875 8.45789 18.188 8.8797C20.5714 9.99609 22.2222 12.4164 22.2222 15.2222C22.2222 16.8267 21.6824 18.3052 20.7744 19.4858L23.2219 21.9332C23.8294 22.5407 23.8294 23.5256 23.2219 24.1331C22.6144 24.7406 21.6295 24.7406 21.022 24.1331L18.3668 21.4779ZM19.1111 15.2222C19.1111 17.37 17.37 19.1111 15.2222 19.1111C13.0744 19.1111 11.3333 17.37 11.3333 15.2222C11.3333 13.0744 13.0744 11.3333 15.2222 11.3333C15.8169 11.3333 16.3723 11.4647 16.8683 11.6971C18.1995 12.3206 19.1111 13.6681 19.1111 15.2222Z" fill="white"/>
      </svg>
    </button>`;
    shadowRoot.prepend(SearchIconButton.css.cloneNode(true));
  }

  public static get css(): HTMLStyleElement {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: mediumturquoise;
      }
    `;
    return styleElement;
  }

  public static create(): SearchIconButton {
    return document.createElement(SearchIconButton.tag);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [SearchIconButton.tag]: SearchIconButton;
  }
}
