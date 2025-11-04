<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore, anonymizedFieldsStore } from "./store";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import { valueFromInput, valueFromCheckbox, camelCaseToTitleCase } from "@/helper";
  import { IdAnonymizationMode, IdFieldType } from "@scandit/web-datacapture-id";
  import Spinner from "@/components/atoms/Spinner.svelte";

  function handleFieldToggle(fieldType: IdFieldType) {
    return (event: Event) => {
      const isChecked = valueFromCheckbox(event);
      const currentFields = new Set($anonymizedFieldsStore);
      
      if (isChecked) {
        currentFields.add(fieldType);
      } else {
        currentFields.delete(fieldType);
      }
      
      anonymizedFieldsStore.set(currentFields);
      sdkManager.idCapture.updateAnonymizedFields(currentFields);
    };
  }
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold flex items-center gap-2">
      Anonymization
      {#if $idCaptureApplyingSettingStore}<Spinner size="1em" />{/if}
    </h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting
      id="anonymizationMode"
      bind:value={$idCaptureSettingsStore.anonymizationMode}
      disabled={$idCaptureApplyingSettingStore}
      on:change={(e) => sdkManager.idCapture.updateAnonymizationMode(valueFromInput(e))}
    >
      Anonymization mode
      <svelte:fragment slot="options">
        {#each Object.values(IdAnonymizationMode) as mode}
          <option value={mode}>{camelCaseToTitleCase(mode)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>

    <div class="px-4 py-2 font-semibold text-gray-600 text-sm">Anonymized Fields</div>
    {#each Object.values(IdFieldType) as fieldType}
      <CheckboxSetting
        id="field-{fieldType}"
        checked={$anonymizedFieldsStore.has(fieldType)}
        disabled={$idCaptureApplyingSettingStore}
        on:change={handleFieldToggle(fieldType)}
      >
        {camelCaseToTitleCase(fieldType)}
      </CheckboxSetting>
    {/each}
  </svelte:fragment>
</SidebarRoute>