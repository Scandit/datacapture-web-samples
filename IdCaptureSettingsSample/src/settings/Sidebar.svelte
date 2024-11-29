<script lang="ts">
  import Spinner from "@/components/atoms/Spinner.svelte";
  import { useLocation, Link } from "svelte-navigator";
  import { isSdkConfigured, isSidebarOpen } from "@/store";

  const location = useLocation();

  $: $isSidebarOpen = $location.pathname.startsWith("/settings");
</script>

{#if $isSidebarOpen}
  <Link to="/" class="fixed top-0 bg-black opacity-50 w-full h-full z-20" />
{/if}
<aside class="sidebar" class:sidebar--visible={$isSidebarOpen}>
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
    height: 100vh;
    height: 100dvh;
    @apply fixed top-0 right-0 w-full max-w-[400px];
    @apply bg-white overflow-y-scroll z-20 transition-transform overflow-hidden;
    box-shadow: -16px 0 64px rgba(0, 0, 0, 0);
    transform: translateX(100%);
  }

  .sidebar--visible {
    box-shadow: -16px 0 64px rgba(0, 0, 0, 0.25);
    transform: translateX(0);
  }
</style>
