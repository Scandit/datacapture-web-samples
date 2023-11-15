<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import SizingModeSetting from "@/components/organisms/SizingModeSetting.svelte";
  import {
    heightAspect,
    heightUnit,
    heightValue,
    LocationSelectionType,
    locationSelectionType,
    radiusUnit,
    radiusValue,
    sizingMode,
    widthAspect,
    widthUnit,
    widthValue,
  } from "@/settings/barcode-capture/location-selection/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
</script>

<SidebarRoute backRoute="/settings/barcode-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Location Selection</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting id="locationSelectionType" bind:value={$locationSelectionType}>
      Type
      <svelte:fragment slot="options">
        {#each Object.values(LocationSelectionType) as locationSelectionType}
          <option value={locationSelectionType}>{locationSelectionType}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    {#if $locationSelectionType === LocationSelectionType.Radius}
      <div class="bg-white">
        <h3 class="px-4 font-bold">Size</h3>
        <NumberWithUnitSetting id="radius" bind:value={$radiusValue} bind:unit={$radiusUnit} />
      </div>
    {/if}
    {#if $locationSelectionType === LocationSelectionType.Rectangular}
      <SizingModeSetting
        id="rectangular"
        bind:sizingMode={$sizingMode}
        bind:widthValue={$widthValue}
        bind:widthUnit={$widthUnit}
        bind:widthAspect={$widthAspect}
        bind:heightValue={$heightValue}
        bind:heightUnit={$heightUnit}
        bind:heightAspect={$heightAspect}
      />
    {/if}
  </svelte:fragment>
</SidebarRoute>
