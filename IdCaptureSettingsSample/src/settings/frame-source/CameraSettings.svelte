<script lang="ts">
  import Setting from "@/components/atoms/Setting.svelte";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import RangeSetting from "@/components/molecules/RangeSetting.svelte";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { valueFromCheckbox, valueFromInput } from "@/helper";
  import { camelCaseToTitleCase } from "@/helper";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import {
    availableCameras,
    currentCamera,
    cameraSettings,
    isResolutionSupported,
    mapVideoResolutionToLabel,
    desiredTorchState,
  } from "@/settings/frame-source/store";
  desiredTorchState;
  import { TorchState, VideoResolution } from "@scandit/web-datacapture-core";
</script>

<h2 class="font-bold p-4">Camera</h2>
<section class="flex flex-col">
  <SelectSetting
    id="cameraId"
    value={$currentCamera.deviceId}
    on:change={(e) => sdkManager.camera.updateFrameSource(valueFromInput(e))}
  >
    Camera
    <svelte:fragment slot="options">
      {#each $availableCameras as availableCamera}
        <option value={availableCamera.deviceId}>{camelCaseToTitleCase(availableCamera.label)}</option>
      {/each}
    </svelte:fragment>
  </SelectSetting>
</section>
{#await $currentCamera.isTorchAvailable() then isTorchAvailable}
  {#if isTorchAvailable}
    <section class="flex flex-col">
      <CheckboxSetting
        id="torchEnabled"
        checked={$desiredTorchState == TorchState.On}
        on:change={(e) => ($desiredTorchState = valueFromCheckbox(e) ? TorchState.On : TorchState.Off)}
        >Torch</CheckboxSetting
      >
    </section>
  {/if}
{/await}
<section class="flex flex-col bg-white">
  <SelectSetting
    id="preferredResolution"
    bind:value={$cameraSettings.preferredResolution}
    on:change={(e) => sdkManager.camera.updatePreferredResolution($currentCamera, valueFromInput(e))}
  >
    Preferred Resolution
    <svelte:fragment slot="options">
      {#each Object.values(VideoResolution) as availableResolution}
        <option value={availableResolution}>{mapVideoResolutionToLabel(availableResolution)}</option>
      {/each}
    </svelte:fragment>
  </SelectSetting>
  <Setting>
    <div>Current resolution</div>
    <div slot="input" class="text-right">
      {$currentCamera.currentResolution?.width} x {$currentCamera.currentResolution?.height}
      {#if !isResolutionSupported($currentCamera, $cameraSettings.preferredResolution)}
        <div class="text-xs">(cannot match preferred resolution)</div>
      {/if}
    </div>
  </Setting>
  <RangeSetting
    id="zoomFactor"
    min="1"
    max="20"
    bind:value={$cameraSettings.zoomFactor}
    on:change={(e) => sdkManager.camera.updateZoomFactor($currentCamera, valueFromInput(e))}>Zoom Factor</RangeSetting
  >
</section>
