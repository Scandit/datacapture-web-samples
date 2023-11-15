<script lang="ts">
  export let show = false;

  export function portal(node, host: HTMLElement = document.body) {
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
  use:portal
  class="fixed top-0 left-0 h-full h-[100dvh] w-full flex"
  class:opacity-0={!show}
  class:pointer-events-none={!show}
>
  <div class="h-[90dvh] w-full max-w-[768px] m-auto p-4 bg-white rounded shadow z-20 flex flex-col">
    <header>
      <slot name="header" />
    </header>
    <div class="h-full overflow-auto">
      <slot name="content" />
    </div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</section>
