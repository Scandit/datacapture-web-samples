<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SettingsEntry from "@/settings/SettingsEntry.svelte";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "./store";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import { valueFromInput, valueFromCheckbox } from "@/helper";
  import { IdAnonymizationMode, IdImageType, SupportedSides } from "scandit-web-datacapture-id";
  import Spinner from "@/components/atoms/Spinner.svelte";

  const selectedImageTypesCount = [
    $idCaptureSettingsStore.getShouldPassImageTypeToResult(IdImageType.Face),
    true,
    true,
  ].filter(Boolean).length;
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold flex items-center gap-2">
      Id Capture
      {#if $idCaptureApplyingSettingStore}<Spinner size="1em" />{/if}
    </h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/id-capture/supported-documents">
      <div class="w-full flex">
        <div>Supported documents</div>
        <div class="ml-auto">{$idCaptureSettingsStore.supportedDocuments.length} selected</div>
      </div>
    </SettingsEntry>
    <SelectSetting
      id="supportedSides"
      bind:value={$idCaptureSettingsStore.supportedSides}
      disabled={$idCaptureApplyingSettingStore}
      on:change={(e) => sdkManager.idCapture.updateSupportedSides(valueFromInput(e))}
    >
      Supported side
      <svelte:fragment slot="options">
        {#each Object.values(SupportedSides) as side}
          <option value={side}>{side}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    <SettingsEntry to="/settings/id-capture/result-with-image-types">
      <div class="w-full flex">
        <div>Result with image types</div>
        <div class="ml-auto">{selectedImageTypesCount} selected</div>
      </div>
    </SettingsEntry>
    <SelectSetting
      id="anonymizationMode"
      bind:value={$idCaptureSettingsStore.anonymizationMode}
      disabled={$idCaptureApplyingSettingStore}
      on:change={(e) => sdkManager.idCapture.updateAnonymizationMode(valueFromInput(e))}
    >
      Anonymization mode
      <svelte:fragment slot="options">
        {#each Object.values(IdAnonymizationMode) as mode}
          <option value={mode}>{mode}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    <SettingsEntry to="/settings/id-capture/feedback">
      <div class="w-full flex">
        <div>Feedbacks</div>
      </div>
    </SettingsEntry>
    <CheckboxSetting
        id="rejectVoidedIds"
        checked={$idCaptureSettingsStore.rejectVoidedIds}
        disabled={$idCaptureApplyingSettingStore}
        on:change={(e) => sdkManager.idCapture.updateRejectVoidedIds(valueFromCheckbox(e))}>Reject Voided IDs</CheckboxSetting>
  </svelte:fragment>
</SidebarRoute>
