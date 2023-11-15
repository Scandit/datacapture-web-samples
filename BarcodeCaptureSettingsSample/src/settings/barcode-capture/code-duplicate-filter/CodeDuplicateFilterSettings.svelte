<script lang="ts">
  import NumberSetting from "@/components/molecules/NumberSetting.svelte";
  import { codeDuplicateFilter } from "@/settings/barcode-capture/code-duplicate-filter/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
</script>

<SidebarRoute backRoute="/settings/barcode-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Code Duplicate Filter</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <NumberSetting id="codeDuplicateFilter" bind:value={$codeDuplicateFilter}>Code Duplicate Filter (ms)</NumberSetting>
  </svelte:fragment>
</SidebarRoute>
