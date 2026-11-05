<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { PassportType } from "@scandit/web-datacapture-id";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "./store";
  import { valueFromCheckbox, camelCaseToTitleCase } from "@/helper";

  async function onTypeToggled(passportType: PassportType, enabled: boolean) {
    const types = new Set($idCaptureSettingsStore.rejectPassportTypes);
    if (enabled) {
      types.add(passportType);
    } else {
      types.delete(passportType);
    }
    sdkManager.idCapture.updateRejectPassportTypes(types);
  }
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Reject passport types</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#each Object.values(PassportType) as passportType}
      <section class="flex flex-col">
        <CheckboxSetting
          id={passportType}
          checked={$idCaptureSettingsStore?.rejectPassportTypes.has(passportType)}
          disabled={$idCaptureApplyingSettingStore}
          on:change={(e) => onTypeToggled(passportType, valueFromCheckbox(e))}
          >{camelCaseToTitleCase(passportType)}</CheckboxSetting
        >
      </section>
    {/each}
  </svelte:fragment>
</SidebarRoute>
