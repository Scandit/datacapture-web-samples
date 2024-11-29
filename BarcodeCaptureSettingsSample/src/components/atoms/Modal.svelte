<script lang="ts">
  export let show = false;
</script>

<section
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-content"
  class="modal"
  class:opacity-0={!show}
  class:pointer-events-none={!show}>
  <header id="modal-title">
    <slot name="header" />
  </header>
  <div class="content overflow-auto flex-grow" id="modal-content">
    <slot name="content" />
  </div>
  <footer>
    <slot name="footer" />
  </footer>
</section>

<style>
  .modal {
    @apply fixed top-2/4 left-2/4;
    @apply max-w-[768px] w-11/12 p-4;
    @apply max-h-[100dvh] flex flex-col;
    @apply bg-white leading-8 rounded shadow transform -translate-x-2/4 -translate-y-2/4 transition z-20;
  }
  footer {
    @apply flex mt-4;
  }
</style>
