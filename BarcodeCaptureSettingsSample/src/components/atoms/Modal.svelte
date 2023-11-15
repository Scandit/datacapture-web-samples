<script lang="ts">
  export let show = false;
</script>

<section class="modal" class:opacity-0={!show} class:pointer-events-none={!show}>
  <header>
    <slot name="header" />
  </header>
  <slot name="content" />
</section>

<style>
  .modal {
    @apply fixed top-2/4 left-2/4;
    @apply max-w-[400px] w-11/12 p-4;
    @apply bg-white leading-8 rounded shadow transform -translate-x-2/4 -translate-y-2/4 transition z-10;
  }
</style>
