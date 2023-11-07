<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { isTorchAvailable } from "@/settings/camera/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { enableCameraButton, enableTorchButton, enableCameraFOVSwitchControl, isIOSDeviceWithExtendedCameraAccess } from "@/settings/view/controls/store";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Controls</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <CheckboxSetting id="torchSwitchButton" disabled={!$isTorchAvailable} bind:checked={$enableTorchButton}>
      Torch Switch Button
    </CheckboxSetting>
    <CheckboxSetting id="cameraSwitchButton" bind:checked={$enableCameraButton}>Camera Switch Button</CheckboxSetting>
    <CheckboxSetting id="cameraFOVSwitchControl" disabled={!$isIOSDeviceWithExtendedCameraAccess} bind:checked={$enableCameraFOVSwitchControl}>Camera FOV Switch Control</CheckboxSetting>
  </svelte:fragment>
</SidebarRoute>
