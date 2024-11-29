<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import NumberSetting from "@/components/molecules/NumberSetting.svelte";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import SizingModeSetting from "@/components/organisms/SizingModeSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import {
    rectangularViewfinder,
    RectangularViewfinderColorType,
  } from "@/settings/view/viewfinder/rectangularViewfinderStore";
  import { RectangularViewfinderLineStyle, RectangularViewfinderStyle } from "@scandit/web-datacapture-core";
</script>

<SelectSetting id="rectangularStyle" bind:value={$rectangularViewfinder.style}>
  Style
  <svelte:fragment slot="options">
    {#each Object.values(RectangularViewfinderStyle) as rectangularViewfinderStyle}
      <option value={rectangularViewfinderStyle}>{camelCaseToTitleCase(rectangularViewfinderStyle)}</option>
    {/each}
  </svelte:fragment>
</SelectSetting>
<SelectSetting id="rectangularLineStyle" bind:value={$rectangularViewfinder.lineStyle}>
  Line Style
  <svelte:fragment slot="options">
    {#each Object.values(RectangularViewfinderLineStyle) as rectangularViewfinderLineStyle}
      <option value={rectangularViewfinderLineStyle}>
        {camelCaseToTitleCase(rectangularViewfinderLineStyle)}
      </option>
    {/each}
  </svelte:fragment>
</SelectSetting>
<NumberSetting id="rectangularDimming" min="0" max="1" step="0.1" bind:value={$rectangularViewfinder.dimming}>
  Dimming
</NumberSetting>
<SelectSetting id="rectangularColor" bind:value={$rectangularViewfinder.color}>
  Color
  <svelte:fragment slot="options">
    {#each Object.values(RectangularViewfinderColorType) as rectangularViewfinderColorType}
      <option value={rectangularViewfinderColorType}>
        {camelCaseToTitleCase(rectangularViewfinderColorType)}
      </option>
    {/each}
  </svelte:fragment>
</SelectSetting>
<CheckboxSetting id="rectangularAnimation" bind:checked={$rectangularViewfinder.animation}>Animation</CheckboxSetting>
<SizingModeSetting
  id="rectangular"
  showShorterDimensionOption
  bind:sizingMode={$rectangularViewfinder.sizingMode}
  bind:widthValue={$rectangularViewfinder.widthValue}
  bind:widthUnit={$rectangularViewfinder.widthUnit}
  bind:widthAspect={$rectangularViewfinder.widthAspect}
  bind:heightValue={$rectangularViewfinder.heightValue}
  bind:heightUnit={$rectangularViewfinder.heightUnit}
  bind:heightAspect={$rectangularViewfinder.heightAspect}
  bind:shorterDimensionFraction={$rectangularViewfinder.shorterDimensionFraction}
  bind:longerDimensionAspect={$rectangularViewfinder.longerDimensionAspect}
/>
