<script lang="ts">
  import { Link } from "svelte-navigator";

  export let to = "/settings";
</script>

<Link {to} class="cta cta--full flex items-center justify-between">
  <slot />
</Link>
