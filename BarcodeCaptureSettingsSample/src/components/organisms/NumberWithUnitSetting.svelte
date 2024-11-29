<script lang="ts">
  import NumberSetting from "@/components/molecules/NumberSetting.svelte";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import { MeasureUnit } from "@scandit/web-datacapture-core";

  export let id: string = "";
  export let value: number = 0;
  export let unit: MeasureUnit = MeasureUnit.Fraction;
</script>

<NumberSetting id={id + "Value"} bind:value>Value</NumberSetting>
<SelectSetting id={id + "Unit"} bind:value={unit}>
  Unit
  <svelte:fragment slot="options">
    {#each Object.values(MeasureUnit) as measureUnit}
      <option value={measureUnit}>{camelCaseToTitleCase(measureUnit)}</option>
    {/each}
  </svelte:fragment>
</SelectSetting>
