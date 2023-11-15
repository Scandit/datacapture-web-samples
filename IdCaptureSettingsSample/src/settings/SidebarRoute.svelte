<script lang="ts">
  import { Link, useLocation } from "svelte-navigator";

  export let backRoute = "/settings";

  const location = useLocation();
</script>

<section class="bg-white">
  <header class="p-4 flex justify-between z-10">
    {#if $location.pathname !== "/settings"}
      <Link to={backRoute} class="cta cta--primary flex items-center gap-4">← Back</Link>
    {/if}
    <Link to="/" class="cta cta--secondary ml-auto">Close</Link>
  </header>
  <div class="p-4">
    <slot name="header" />
  </div>
  <div class="sidebar-route__content flex flex-col overflow-scroll">
    <slot name="content" />
  </div>
</section>
