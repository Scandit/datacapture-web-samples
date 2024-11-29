<script lang="ts">
  import { camelCaseToTitleCase } from "@/helper";
  import { MeasureUnit } from "@scandit/web-datacapture-core";
  import { createEventDispatcher } from "svelte";

  export let id: string = "";
  export let value: number = 0;
  export let unit: MeasureUnit = MeasureUnit.Fraction;

  let dispatcher = createEventDispatcher<{ change: { value: number; unit: MeasureUnit } }>();

  function onChange() {
    dispatcher("change", { value, unit });
  }
</script>

<div class="flex justify-start gap-4 p-4">
  <input
    bind:value
    on:change={onChange}
    type="number"
    step={unit == MeasureUnit.Fraction ? 0.1 : 1}
    max={unit == MeasureUnit.Fraction ? 1 : undefined}
    min="0"
  />
  <select class="w-fit min-w-0 truncate border border-gray-200 p-2" {id} bind:value={unit} on:change={onChange}>
    {#each Object.values(MeasureUnit) as measureUnit}
      <option value={measureUnit}>{camelCaseToTitleCase(measureUnit)}</option>
    {/each}
  </select>
</div>
