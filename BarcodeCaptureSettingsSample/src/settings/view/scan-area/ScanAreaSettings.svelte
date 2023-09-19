<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import {
    marginBottomUnit,
    marginBottomValue,
    marginLeftUnit,
    marginLeftValue,
    marginRightUnit,
    marginRightValue,
    marginTopUnit,
    marginTopValue,
    showScanAreaGuides,
  } from "@/settings/view/scan-area/store";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Scan Area</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="bg-white">
      <h3 class="px-4 font-bold">Margins</h3>
      <h4 class="px-4 font-bold">Top</h4>
      <NumberWithUnitSetting id="marginTop" bind:value={$marginTopValue} bind:unit={$marginTopUnit} />
      <h4 class="px-4 font-bold">Right</h4>
      <NumberWithUnitSetting id="marginRight" bind:value={$marginRightValue} bind:unit={$marginRightUnit} />
      <h4 class="px-4 font-bold">Bottom</h4>
      <NumberWithUnitSetting id="marginBottom" bind:value={$marginBottomValue} bind:unit={$marginBottomUnit} />
      <h4 class="px-4 font-bold">Left</h4>
      <NumberWithUnitSetting id="marginLeft" bind:value={$marginLeftValue} bind:unit={$marginLeftUnit} />
      <CheckboxSetting id="showScanAreaGuides" bind:checked={$showScanAreaGuides}>Show Scan Area Guides</CheckboxSetting
      >
    </div>
  </svelte:fragment>
</SidebarRoute>
