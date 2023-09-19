<script lang="ts">
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { xUnit, xValue, yUnit, yValue } from "@/settings/view/point-of-interest/store";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Point Of Interest</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="bg-white">
      <h3 class="px-4 font-bold">X</h3>
      <NumberWithUnitSetting id="x" bind:value={$xValue} bind:unit={$xUnit} />
      <h3 class="px-6 font-bold">Y</h3>
      <NumberWithUnitSetting id="y" bind:value={$yValue} bind:unit={$yUnit} />
    </div>
  </svelte:fragment>
</SidebarRoute>
