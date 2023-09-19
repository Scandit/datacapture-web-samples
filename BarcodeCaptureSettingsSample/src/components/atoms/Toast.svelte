<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<section class="toast" in:fly={{ y: 100, duration: 300 }} out:fly={{ y: 100, duration: 1000 }}>
  <slot />
</section>

<style>
  .toast {
    @apply fixed bottom-8 left-2/4 transform -translate-x-2/4 w-11/12 z-10;
    @apply max-w-[400px] flex flex-col gap-2 p-4;
    @apply bg-white  rounded-2xl shadow-xl;
  }
</style>
