<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { scanIntention } from "@/settings/barcode-capture/scan-intention/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { ScanIntention } from "@scandit/web-datacapture-barcode";
</script>

<SidebarRoute backRoute="/settings/barcode-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">ScanIntention</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting id="scanIntentionType" bind:value={$scanIntention}>
      Type
      <svelte:fragment slot="options">
        {#each Object.entries(ScanIntention) as [scanIntentionName, scanIntentionType]}
          <option value={scanIntentionType}>{scanIntentionName}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
  </svelte:fragment>
</SidebarRoute>
