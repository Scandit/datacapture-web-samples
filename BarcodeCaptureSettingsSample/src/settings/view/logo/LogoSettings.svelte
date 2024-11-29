<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { anchor, offsetXUnit, offsetXValue, offsetYUnit, offsetYValue, style } from "@/settings/view/logo/store";
  import { Anchor, LogoStyle } from "@scandit/web-datacapture-core";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Logo</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting id="style" bind:value={$style}>
      Style
      <svelte:fragment slot="options">
        {#each Object.values(LogoStyle) as logoStyle}
          <option value={logoStyle}>{camelCaseToTitleCase(logoStyle)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    <SelectSetting id="anchor" bind:value={$anchor}>
      Anchor
      <svelte:fragment slot="options">
        {#each Object.values(Anchor) as anchor}
          <option value={anchor}>{camelCaseToTitleCase(anchor)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    <div class="bg-white">
      <h3 class="px-4 font-bold">Offset</h3>
      <h4 class="px-4 font-bold">X</h4>
      <NumberWithUnitSetting id="offsetX" bind:value={$offsetXValue} bind:unit={$offsetXUnit} />
      <h4 class="px-4 font-bold">Y</h4>
      <NumberWithUnitSetting id="offsetY" bind:value={$offsetYValue} bind:unit={$offsetYUnit} />
    </div>
  </svelte:fragment>
</SidebarRoute>
