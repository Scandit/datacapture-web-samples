<script lang="ts">
  import { Link } from "svelte-navigator";
  import { useSymbologyStore } from "@/settings/barcode-capture/symbologies/symbology/store";
  import type { Symbology } from "@scandit/web-datacapture-barcode";

  export let symbology: Symbology;
  const { description, isEnabled } = useSymbologyStore(symbology);
</script>

<Link to={`/settings/barcode-capture/symbologies/${symbology}`} class="cta cta--full flex items-center justify-between">
  <span>{$description.readableName}</span>
  <div class="flex items-center gap-4">
    <span>{$isEnabled ? "On" : "Off"}</span>
  </div>
</Link>
