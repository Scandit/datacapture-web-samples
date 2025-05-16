<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import CameraSettings from "./CameraSettings.svelte";
  import SingleImageUploaderSettings from "./SingleImageUploaderSettings.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import { FrameSourceState } from "@scandit/web-datacapture-core";
  import { currentCamera, currentFrameSource, singleImageUploader } from "./store";
  import { valueFromInput } from "@/helper";

  async function changeFrameSource(frameSource: string) {
    $currentFrameSource = frameSource as "camera" | "singleImageUploader";
    await sdkManager.context.frameSource?.switchToDesiredState(FrameSourceState.Off);
    if (frameSource === "singleImageUploader") {
      await sdkManager.context.setFrameSource($singleImageUploader);
    } else {
      await sdkManager.context.setFrameSource($currentCamera);
    }
    await sdkManager.context?.frameSource?.switchToDesiredState(FrameSourceState.On);
  }
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Frame Source</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <section class="flex flex-col">
      <SelectSetting
        id="frameSource"
        value={$currentFrameSource}
        on:change={(e) => changeFrameSource(valueFromInput(e))}
      >
        Frame Source
        <svelte:fragment slot="options">
          <option value="camera">Camera</option>
          <option value="singleImageUploader">Single Image Uploader</option>
        </svelte:fragment>
      </SelectSetting>
    </section>

    {#if $currentFrameSource === "camera"}
      <CameraSettings />
    {:else}
      <SingleImageUploaderSettings />
    {/if}
  </svelte:fragment>
</SidebarRoute>
