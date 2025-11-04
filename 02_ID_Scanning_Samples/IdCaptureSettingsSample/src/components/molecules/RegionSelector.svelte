<script lang="ts">
  import { Region } from "@scandit/web-datacapture-id";
  import FilterList from "./FilterList.svelte";

  export let selectedRegions: Region[];

  const allRegions = Object.values(Region).sort();
  const allRegionButAny = allRegions.filter((region) => region !== Region.Any);
  // Any region comes first
  let displayedRegions = [Region.Any, ...allRegionButAny];

  function filterList(input: string) {
    if (input.trim().length === 0) {
      displayedRegions = [Region.Any, ...allRegionButAny];
      return;
    }
    const needle = input.toLowerCase();
    displayedRegions = allRegionButAny
      // filter out non-matching
      .filter((region) => region.toLowerCase().includes(needle))
      // shortest match should come first
      .sort((a, b) => a.length - b.length);
  }

  function toggleRegion(region: string, newValue: boolean, event: Event) {
    let updatedRegions = [...selectedRegions];

    if (region === Region.Any) {
      // when Any is checked, or when it's the only region selected, remove all regions and only keep "Any"
      if (newValue || selectedRegions.length === 1) {
        // prevent unchecking the checkbox
        !newValue && event.preventDefault();
        selectedRegions = [Region.Any];
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

    // only update the parent variable once
    selectedRegions = updatedRegions;
  }
</script>

<FilterList
  items={displayedRegions}
  selectedItems={selectedRegions}
  {filterList}
  on:change={(e) => toggleRegion(e.detail.item, e.detail.checked, e.detail.originalEvent)}
/>
