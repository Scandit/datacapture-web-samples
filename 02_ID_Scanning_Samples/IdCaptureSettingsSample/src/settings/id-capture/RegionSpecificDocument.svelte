<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { valueFromCheckbox } from "@/helper";
  import {
    IdCaptureDocument,
    IdCaptureDocumentType,
    IdCaptureSettings,
    RegionSpecific,
    RegionSpecificSubtype,
  } from "@scandit/web-datacapture-id";
  import { idCaptureSettingsStore } from "./store";
  import FilterList from "@/components/molecules/FilterList.svelte";
  import PenIcon from "@/components/atoms/PenIcon.svelte";

  export let getDocuments: (idCaptureSettings: IdCaptureSettings) => IdCaptureDocument[];
  export let updateDocuments: (documents: IdCaptureDocument[]) => Promise<void>;

  let allSubtypes = (Object.values(RegionSpecificSubtype) as RegionSpecificSubtype[]).sort();
  let displaySubtypes = [...allSubtypes];
  let selectedSubtypes = getRegionSpecificDocuments($idCaptureSettingsStore).reduce(
    (list, type) => [...list, type.subtype],
    [] as RegionSpecificSubtype[]
  );
  let checked = getRegionSpecificDocuments($idCaptureSettingsStore).length > 0;
  let displayRegions = false;

  function getRegionSpecificDocuments(settings: IdCaptureSettings): RegionSpecific[] {
    return getDocuments(settings).filter(
      (document) => document.documentType === IdCaptureDocumentType.RegionSpecific
    ) as RegionSpecific[];
  }

  function applySelectedSubtypes() {
    let documents = selectedSubtypes.map((subtype) => new RegionSpecific(subtype));
    updateDocuments([
      ...getDocuments($idCaptureSettingsStore).filter(
        (doc) => doc.documentType !== IdCaptureDocumentType.RegionSpecific
      ),
      ...documents,
    ]);
  }

  function toggleSubtype(_subtype: string, enabled: boolean, _originalEvent: Event) {
    const subtype = _subtype as RegionSpecificSubtype;
    if (enabled) {
      selectedSubtypes = [...selectedSubtypes, subtype];
    } else {
      selectedSubtypes = selectedSubtypes.filter((type) => type !== subtype);
    }
  }

  function filterList(input: string) {
    if (input.trim().length === 0) {
      displaySubtypes = allSubtypes;
      return;
    }
    displaySubtypes = allSubtypes.filter((item) => item.toLowerCase().includes(input.toLowerCase()));
  }

  function onChecked(newValue: boolean) {
    checked = newValue;
    // when disabled region specific, remove all region-specific documents
    if (!checked) {
      updateDocuments([
        ...getDocuments($idCaptureSettingsStore).filter(
          (doc) => doc.documentType !== IdCaptureDocumentType.RegionSpecific
        ),
      ]);
    } else {
      applySelectedSubtypes();
    }
  }

  function onDoneClicked() {
    displayRegions = false;
    applySelectedSubtypes();
  }
</script>

<div class={`transition-all ${checked ? "bg-gray-100" : ""}`}>
  <CheckboxSetting id="RegionSpecific" {checked} on:change={(e) => onChecked(valueFromCheckbox(e))}
    >Region specific</CheckboxSetting
  >
  {#if checked}
    <div class="px-4 py-2">
      {#if !displayRegions}
        <button class="w-full flex justify-between gap-2 py-2" on:click={() => (displayRegions = true)}>
          <span>Region:</span>
          <span class="ml-auto text-ellipsis overflow-hidden">{selectedSubtypes.length} selected</span>
          <span class="pl-2"><PenIcon /></span>
        </button>
      {/if}
      {#if displayRegions}
        <div class="pb-2 flex flex-col gap-2">
          <FilterList
            items={displaySubtypes}
            selectedItems={selectedSubtypes}
            {filterList}
            on:change={(e) => toggleSubtype(e.detail.item, e.detail.checked, e.detail.originalEvent)}
          />
          <button class="border border-gray-400 px-4 py-2 rounded-md bg-white" on:click={onDoneClicked}>Done</button>
        </div>
      {/if}
    </div>
  {/if}
</div>
