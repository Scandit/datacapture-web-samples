<script lang="ts">
  import { Region } from "@scandit/web-datacapture-id";
  import { writable } from "svelte/store";
  import FilterList from "./FilterList.svelte";

  export let onChange: (selectedRegions: Region[]) => void;
  export let regions: Region[];

  const allRegions = Object.values(Region).sort();
  const enabledRegions = writable<Region[]>(regions);
  let displayedRegions = [Region.Any, ...allRegions.filter((region) => region !== Region.Any)];

  function filterList(input: string) {
    if (input.trim().length === 0) {
      displayedRegions = allRegions;
      return;
    }
    displayedRegions = allRegions.filter((region) => region.toLowerCase().includes(input.toLowerCase()));
  }

  // Whenever the store is updated, trigger the onChange callback
  enabledRegions.subscribe((selectedRegions) => onChange(selectedRegions));

  function toggleRegion(region: string, newValue: boolean, event: Event) {
    let updatedRegions = [...$enabledRegions];

    if (region === Region.Any) {
      // when Any is checked, or when it's the only region selected, remove all regions and only keep "Any"
      if (newValue || $enabledRegions.length === 1) {
        // prevent unchecking the checkbox
        !newValue && event.preventDefault();
        $enabledRegions = [Region.Any];
        return;
      }
    } else if (newValue) {
      // remove "Any" region if another one was selected
      updatedRegions = updatedRegions.filter((enabledRegion) => enabledRegion !== Region.Any);
    }

    if (newValue) {
      updatedRegions = [...updatedRegions, region as Region];
    } else {
      updatedRegions = updatedRegions.filter((enabledRegion) => enabledRegion !== region);
    }

    // force "Any" region if no region is selected
    if (updatedRegions.length === 0) {
      updatedRegions = [Region.Any];
    }

    // only update the store once
    $enabledRegions = updatedRegions;
  }
</script>

<FilterList
  items={displayedRegions}
  selectedItems={$enabledRegions}
  {filterList}
  on:change={(e) => toggleRegion(e.detail.item, e.detail.checked, e.detail.originalEvent)}
/>
