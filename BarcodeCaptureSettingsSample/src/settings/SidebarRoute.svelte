<script lang="ts">
  import { Link } from "svelte-navigator";

  export let backRoute = "/settings";
</script>

<section>
  <header class="p-4 flex items-center gap-4 bg-white z-10 shadow-lg shadow-light-700 py-6">
    <Link to={backRoute} class="cta cta--primary flex items-center gap-4">Back</Link>
    <div class="flex-1">
      <slot name="header" />
    </div>
    <Link to="/" class="cta cta--secondary">Close</Link>
  </header>
  <div
    class="sidebar-route__content pb-64 flex flex-col h-screen overflow-scroll"
  >
    <slot name="content" />
  </div>
</section>
