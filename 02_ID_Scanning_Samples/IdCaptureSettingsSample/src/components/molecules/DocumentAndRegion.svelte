<script lang="ts">
  import { type IdCaptureDocumentType, Region } from "@scandit/web-datacapture-id";
  import CheckboxSetting from "./CheckboxSetting.svelte";
  import { camelCaseToTitleCase, valueFromCheckbox } from "@/helper";
  import RegionSelector from "./RegionSelector.svelte";
  import PenIcon from "../atoms/PenIcon.svelte";

  export let checked: boolean;
  export let type: IdCaptureDocumentType;
  export let disabled = false;
  export let regions: Region[];
  export let onChange: (type: IdCaptureDocumentType, enabled: boolean, selectedRegions: Region[]) => void;

  let displayRegions = false;
  let selectedRegions = [...regions];
  let previousRegions: Region[] | null = null;

  function onChecked(enabled: boolean) {
    checked = enabled;

    if (enabled) {
      // restore any region that was previously selected
      if (previousRegions !== null) {
        selectedRegions = [...previousRegions];
        previousRegions = null;
      } else {
        selectedRegions = [Region.Any];
      }
    } else {
      // save the selected regions in case the user re-enables this document
      previousRegions = [...selectedRegions];
      selectedRegions = [Region.Any];
      displayRegions = false;
    }
    onChange(type, enabled, selectedRegions);
  }

  function onDoneClicked() {
    displayRegions = false;
    onChange(type, checked, selectedRegions);
  }
</script>

<div class={`transition-all ${checked ? "bg-gray-100 mb-4" : ""}`}>
  <CheckboxSetting id={type} {checked} {disabled} on:change={(e) => onChecked(valueFromCheckbox(e))}
    >{camelCaseToTitleCase(type)}</CheckboxSetting
  >
  {#if checked}
    <div class="px-4 py-2">
      {#if displayRegions}
        <div class="pb-2 flex flex-col gap-2">
          <RegionSelector bind:selectedRegions />
          <button class="border border-gray-400 px-4 py-2 rounded-md bg-white" on:click={onDoneClicked}>Done</button>
        </div>
      {:else}
        <button class="w-full flex justify-between gap-2 py-2" on:click={() => (displayRegions = true)}>
          <span>Region:</span>
          <span class="ml-auto text-ellipsis overflow-hidden">{regions.map(camelCaseToTitleCase).join(", ")}</span>
          <span class="pl-2"><PenIcon /></span>
        </button>
      {/if}
    </div>
  {/if}
</div>
