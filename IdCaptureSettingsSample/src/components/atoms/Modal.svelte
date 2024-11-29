<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let show = false;
  export let className = "";

  export function portal(node: HTMLElement, host: HTMLElement = document.body) {
    host.appendChild(node);

    return {
      destroy() {
        // remove the node when component is destroyed
        node.remove();
      },
    };
  }
</script>

<section
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-content"
  use:portal
  class="fixed top-0 left-0 h-full h-[100dvh] w-full flex z-30"
  class:opacity-0={!show}
  class:pointer-events-none={!show}
>
  <div
    class={twMerge(
      "h-[100dvh] sm-xy:h-[90dvh] w-full sm-xy:w-[90vw] max-w-[768px] m-auto p-4 bg-white rounded shadow z-20 flex flex-col",
      className
    )}
  >
    <header id="modal-title">
      <slot name="header" />
    </header>
    <div class="h-full overflow-auto" id="modal-content">
      <slot name="content" />
    </div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</section>
