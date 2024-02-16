<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { IdImageType } from "scandit-web-datacapture-id";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "./store";
  import { valueFromCheckbox } from "@/helper";

  async function onTypeToggled(docType: string, enabled: boolean) {
    const currentValues = {
      [IdImageType.Face]: $idCaptureSettingsStore.getShouldPassImageTypeToResult(IdImageType.Face),
      [IdImageType.IdBack]: true,
      [IdImageType.IdFront]: true,
    };
    sdkManager.idCapture.updateResultWithImageTypes({ ...currentValues, [docType as IdImageType]: enabled });
  }
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Result with image types</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#each Object.values(IdImageType) as imageType}
      <section class="flex flex-col">
        <CheckboxSetting
          id={imageType}
          checked={imageType == IdImageType.Face ? $idCaptureSettingsStore?.getShouldPassImageTypeToResult(imageType) : true}
          disabled={imageType == IdImageType.Face ? $idCaptureApplyingSettingStore : true}
          on:change={(e) => onTypeToggled(imageType, valueFromCheckbox(e))}>{imageType}</CheckboxSetting
        >
      </section>
    {/each}
  </svelte:fragment>
</SidebarRoute>
