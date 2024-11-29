<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SettingsEntry from "@/settings/SettingsEntry.svelte";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "./store";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import { valueFromInput, valueFromCheckbox, camelCaseToTitleCase } from "@/helper";
  import { IdAnonymizationMode, IdCaptureTrigger, IdCaptureScanner } from "@scandit/web-datacapture-id";
  import Spinner from "@/components/atoms/Spinner.svelte";
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold flex items-center gap-2">
      Id Capture
      {#if $idCaptureApplyingSettingStore}<Spinner size="1em" />{/if}
    </h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/id-capture/accepted-documents">
      <div class="w-full flex">
        <div>Accepted documents</div>
        <div class="ml-auto">
          {#if $idCaptureSettingsStore.acceptedDocuments.length === 0}
            None
          {:else}
            {$idCaptureSettingsStore.acceptedDocuments.length} selected
          {/if}
        </div>
      </div>
    </SettingsEntry>
    <SettingsEntry to="/settings/id-capture/rejected-documents">
      <div class="w-full flex">
        <div>Rejected documents</div>
        <div class="ml-auto">
          {#if $idCaptureSettingsStore.rejectedDocuments.length === 0}
            None
          {:else}
            {$idCaptureSettingsStore.rejectedDocuments.length} selected
          {/if}
        </div>
      </div>
    </SettingsEntry>
    <SettingsEntry to="/settings/id-capture/scanner">
      <div class="w-full flex">
        <div>Scanner type</div>
        <div class="ml-auto">
          {IdCaptureScanner.isFullDocumentScanner($idCaptureSettingsStore.scannerType) ? "Full" : "Single side"}
        </div>
      </div>
    </SettingsEntry>
    <SettingsEntry to="/settings/id-capture/result-with-image-types">
      <div class="w-full flex">
        <div>Result with image types</div>
        <div class="ml-auto">
          {Object.values($idCaptureSettingsStore.toJSONObject().imageToResult).filter(Boolean).length} selected
        </div>
      </div>
    </SettingsEntry>
    <SettingsEntry to="/settings/id-capture/feedback">
      <div class="w-full flex">
        <div>Feedbacks</div>
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
    <SelectSetting
      id="captureTrigger"
      bind:value={$idCaptureSettingsStore.captureTrigger}
      disabled={$idCaptureApplyingSettingStore}
      on:change={(e) => sdkManager.idCapture.updateCaptureTrigger(valueFromInput(e))}
    >
      Capture trigger
      <svelte:fragment slot="options">
        {#each Object.values(IdCaptureTrigger) as trigger}
          <option value={trigger}>{camelCaseToTitleCase(trigger)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    <CheckboxSetting
      id="rejectVoidedIds"
      checked={$idCaptureSettingsStore.rejectVoidedIds}
      disabled={$idCaptureApplyingSettingStore}
      on:change={(e) => sdkManager.idCapture.updateRejectVoidedIds(valueFromCheckbox(e))}
      >Reject Voided IDs</CheckboxSetting
    >
    <CheckboxSetting
      id="decodeBackOfEuropeanDrivingLicense"
      checked={$idCaptureSettingsStore.decodeBackOfEuropeanDrivingLicense}
      disabled={$idCaptureApplyingSettingStore}
      on:change={(e) => sdkManager.idCapture.updateDecodeBackOfEuropeanDrivingLicense(valueFromCheckbox(e))}
    >
      Capture back of European DL
    </CheckboxSetting>
  </svelte:fragment>
</SidebarRoute>
