<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import {
    laserlineViewfinder,
    LaserlineViewfinderColorType,
  } from "@/settings/view/viewfinder/laserlineViewfinderStore";
</script>

<div class="bg-white">
  <h3 class="px-4 font-bold">Width</h3>
  <NumberWithUnitSetting
    id="laserlineWidth"
    bind:value={$laserlineViewfinder.widthValue}
    bind:unit={$laserlineViewfinder.widthUnit}
  />
  <SelectSetting id="laserlineColor" bind:value={$laserlineViewfinder.color}>
    Color
    <svelte:fragment slot="options">
      {#each Object.values(LaserlineViewfinderColorType) as laserlineViewfinderColorType}
        <option value={laserlineViewfinderColorType}>{camelCaseToTitleCase(laserlineViewfinderColorType)}</option>
      {/each}
    </svelte:fragment>
  </SelectSetting>
</div>
