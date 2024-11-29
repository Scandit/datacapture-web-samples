<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import RangeSetting from "@/components/molecules/RangeSetting.svelte";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import {
    availableCameras,
    cameraLabel,
    focusGestureStrategy,
    isResolutionSupported,
    isTorchAvailable,
    isTorchEnabled,
    mapVideoResolutionToLabel,
    preferredResolution,
    zoomFactor,
    zoomGestureZoomFactor,
  } from "@/settings/camera/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { FocusGestureStrategy, VideoResolution } from "@scandit/web-datacapture-core";
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Camera</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <section class="flex flex-col">
      <SelectSetting id="cameraLabel" bind:value={$cameraLabel}>
        Camera Label
        <svelte:fragment slot="options">
          {#each $availableCameras as availableCamera}
            <option value={availableCamera.label}>{availableCamera.label}</option>
          {/each}
        </svelte:fragment>
      </SelectSetting>
    </section>
    {#if $isTorchAvailable}
      <section class="flex flex-col">
        <h3 class="font-bold">Torch</h3>
        <CheckboxSetting id="torchEnabled" bind:checked={$isTorchEnabled}>Enabled</CheckboxSetting>
      </section>
    {/if}
    <section class="flex flex-col bg-white">
      <SelectSetting id="preferredResolution" bind:value={$preferredResolution}>
        Preferred Resolution
        <svelte:fragment slot="options">
          {#each Object.values(VideoResolution) as availableResolution}
            {#if isResolutionSupported(availableResolution)}
              <option value={availableResolution}>{mapVideoResolutionToLabel(availableResolution)}</option>
            {/if}
          {/each}
        </svelte:fragment>
      </SelectSetting>
      <RangeSetting id="zoomFactor" min="1" max="20" bind:value={$zoomFactor}>Zoom Factor</RangeSetting>
      <RangeSetting id="zoomGestureZoomFactor" min="1" max="20" bind:value={$zoomGestureZoomFactor}>
        Zoom Gesture Zoom Factor
      </RangeSetting>
      <SelectSetting id="focusGestureStrategy" bind:value={$focusGestureStrategy}>
        Focus Gesture Strategy
        <svelte:fragment slot="options">
          {#each Object.values(FocusGestureStrategy) as focusGestureStrategy}
            <option value={focusGestureStrategy}>
              {camelCaseToTitleCase(focusGestureStrategy)}
            </option>
          {/each}
        </svelte:fragment>
      </SelectSetting>
    </section>
  </svelte:fragment>
</SidebarRoute>
