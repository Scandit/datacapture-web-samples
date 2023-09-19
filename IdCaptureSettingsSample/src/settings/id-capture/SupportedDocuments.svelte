<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { IdDocumentType } from "scandit-web-datacapture-id";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "./store";
  import { valueFromCheckbox } from "@/helper";
  import Spinner from "@/components/atoms/Spinner.svelte";

  async function enableAllDocuments() {
    await updateSdkManager(Object.values(IdDocumentType));
  }

  async function disableAllDocuments() {
    await updateSdkManager([]);
  }

  async function onDocumentTypeToggled(docType: IdDocumentType, enabled: boolean) {
    let currentDocuments: IdDocumentType[];
    if (enabled) {
      currentDocuments = [...new Set([...$idCaptureSettingsStore.supportedDocuments, docType])];
    } else {
      currentDocuments = $idCaptureSettingsStore.supportedDocuments.filter((type) => type != docType);
    }
    await updateSdkManager(currentDocuments);
  }

  async function updateSdkManager(newDocuments: IdDocumentType[]) {
    await sdkManager.idCapture.updateSupportedDocuments(newDocuments);
  }
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold flex items-center gap-4">
      Supported documents
      {#if $idCaptureApplyingSettingStore}<Spinner size="1em" />{/if}
    </h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <button class="cta cta--full" on:click={enableAllDocuments} disabled={$idCaptureApplyingSettingStore}
      >Enable All</button
    >
    <button class="cta cta--full" on:click={disableAllDocuments} disabled={$idCaptureApplyingSettingStore}
      >Disable All</button
    >
    {#each Object.values(IdDocumentType) as documentType}
      <section class="flex flex-col">
        <CheckboxSetting
          id={documentType}
          checked={$idCaptureSettingsStore?.supportedDocuments.includes(documentType)}
          disabled={$idCaptureApplyingSettingStore}
          on:change={(e) => onDocumentTypeToggled(documentType, valueFromCheckbox(e))}>{documentType}</CheckboxSetting
        >
      </section>
    {/each}
  </svelte:fragment>
</SidebarRoute>
