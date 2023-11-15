<script lang="ts">
  import Spinner from "@/components/atoms/Spinner.svelte";
  import { useLocation } from "svelte-navigator";
  import { barcodeCapture, isSdkConfigured } from "@/store";

  const location = useLocation();
  $: isSidebarVisible = $location.pathname.startsWith("/settings");
  $: $isSdkConfigured && $barcodeCapture.setEnabled(!isSidebarVisible);
</script>

<aside class="sidebar" class:sidebar--visible={isSidebarVisible}>
  {#if $isSdkConfigured}
    <slot />
  {:else}
    <section class="w-full h-full flex justify-center items-center">
      <Spinner />
    </section>
  {/if}
</aside>

<style>
  .sidebar {
    @apply fixed top-0 right-0 w-full max-w-[400px] h-screen pb-20;
    @apply bg-gray-100 overflow-y-scroll z-10 transition-transform overflow-hidden;
    box-shadow: -16px 0 64px rgba(0, 0, 0, 0);
    transform: translateX(100%);
  }

  .sidebar--visible {
    box-shadow: -16px 0 64px rgba(0, 0, 0, 0.25);
    transform: translateX(0);
  }
</style>
