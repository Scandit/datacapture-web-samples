<script lang="ts">
  import NumberSetting from "@/components/molecules/NumberSetting.svelte";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import { MeasureUnit, SizingMode } from "@scandit/web-datacapture-core";

  export let id: string = "";
  export let sizingMode: SizingMode = SizingMode.WidthAndHeight;

  export let widthValue: number = 0;
  export let widthUnit: MeasureUnit = MeasureUnit.Fraction;
  export let widthAspect: number = 0;

  export let heightValue: number = 0;
  export let heightUnit: MeasureUnit = MeasureUnit.Fraction;
  export let heightAspect: number = 0;

  export let shorterDimensionFraction: number = 0;
  export let longerDimensionAspect: number = 1;

  export let showShorterDimensionOption: boolean = false;
</script>

<div class="bg-white">
  <h3 class="px-4 font-bold">Size Specification</h3>
  <SelectSetting id={id + "SizingMode"} bind:value={sizingMode}>
    Sizing Mode
    <svelte:fragment slot="options">
      {#each Object.values(SizingMode) as sizingMode}
        {#if showShorterDimensionOption || sizingMode !== SizingMode.ShorterDimensionAndAspectRatio}
          <option value={sizingMode}>{camelCaseToTitleCase(sizingMode)}</option>
        {/if}
      {/each}
    </svelte:fragment>
  </SelectSetting>
  {#if sizingMode === SizingMode.WidthAndHeight}
    <h3 class="px-4 font-bold">Width</h3>
    <NumberWithUnitSetting id={id + "Width"} bind:value={widthValue} bind:unit={widthUnit} />
    <h3 class="px-4 font-bold">Height</h3>
    <NumberWithUnitSetting id={id + "Height"} bind:value={heightValue} bind:unit={heightUnit} />
  {:else if sizingMode === SizingMode.WidthAndAspectRatio}
    <h3 class="px-4 font-bold">Width</h3>
    <NumberWithUnitSetting id={id + "Width"} bind:value={widthValue} bind:unit={widthUnit} />
    <h3 class="px-4 font-bold">Height</h3>
    <NumberSetting id={id + "HeightAspect"} bind:value={heightAspect}>Aspect</NumberSetting>
  {:else if sizingMode === SizingMode.HeightAndAspectRatio}
    <h3 class="px-4 font-bold">Width</h3>
    <NumberSetting id={id + "WidthAspect"} bind:value={widthAspect}>Aspect</NumberSetting>
    <h3 class="px-4 font-bold">Height</h3>
    <NumberWithUnitSetting id="height" bind:value={heightValue} bind:unit={heightUnit} />
  {:else}
    <h3 class="px-4 font-bold">Shorter Dimension</h3>
    <NumberSetting id={id + "Dimension"} bind:value={shorterDimensionFraction}>Fraction</NumberSetting>
    <h3 class="px-4 font-bold">Longer Dimension</h3>
    <NumberSetting id={id + "Aspect"} bind:value={longerDimensionAspect}>Aspect</NumberSetting>
  {/if}
</div>
