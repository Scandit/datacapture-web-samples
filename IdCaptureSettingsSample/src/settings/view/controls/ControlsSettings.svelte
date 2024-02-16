<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { valueFromCheckbox } from "@/helper";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { currentCamera } from "@/settings/camera/store";
  import { cameraSwitchControlEnabled, torchSwitchControlEnabled, allowPictureInPicture } from "@/settings/view/controls/store";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Controls</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#await $currentCamera.isTorchAvailable() then isTorchAvailable}
      <CheckboxSetting
        id="torchSwitchButton"
        disabled={!isTorchAvailable}
        checked={$torchSwitchControlEnabled}
        on:change={(e) => sdkManager.view.toggleTorchSwitchControl(valueFromCheckbox(e))}
      >
        Torch Switch Button
      </CheckboxSetting>
    {/await}
    <CheckboxSetting
      id="cameraSwitchButton"
      checked={$cameraSwitchControlEnabled}
      on:change={(e) => sdkManager.view.toggleCameraSwitchControl(valueFromCheckbox(e))}
      >Camera Switch Button</CheckboxSetting
    >
    <CheckboxSetting
      id="allowPictureInPicture"
      checked={$allowPictureInPicture}
      on:change={async (e) => {
        await sdkManager.view.allowPictureInPicture(valueFromCheckbox(e));
        $allowPictureInPicture = valueFromCheckbox(e)
      }}
    >Allow Picture-in-Picture</CheckboxSetting>
  </svelte:fragment>
</SidebarRoute>
