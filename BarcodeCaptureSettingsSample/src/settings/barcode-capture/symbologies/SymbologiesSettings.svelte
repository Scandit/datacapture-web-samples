<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SymbologySettingEntry from "@/settings/barcode-capture/symbologies/symbology/SymbologySettingEntry.svelte";
  import { Symbology } from "@scandit/web-datacapture-barcode";
  import { disableAllSymbologies, enableAllSymbologies } from "@/settings/barcode-capture/symbologies/symbology/store";
</script>

<SidebarRoute backRoute="/settings/barcode-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Symbologies</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <button class="cta cta--full" on:click={enableAllSymbologies}>Enable All</button>
    <button class="cta cta--full" on:click={disableAllSymbologies}>Disable All</button>
    {#each Object.values(Symbology) as symbology}
      <SymbologySettingEntry {symbology} />
    {/each}
  </svelte:fragment>
</SidebarRoute>
