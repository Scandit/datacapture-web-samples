<script lang="ts">
  import { Link } from "svelte-navigator-no-postinstall";

  export let to = "/settings";
</script>

<Link {to} class="cta cta--full flex items-center justify-between">
  <slot />
</Link>
