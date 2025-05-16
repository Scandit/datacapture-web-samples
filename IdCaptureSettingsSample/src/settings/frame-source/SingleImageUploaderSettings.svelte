<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { valueFromCheckbox } from "@/helper";
  import { singleImageUploader } from "@/settings/frame-source/store";
  import { SingleImageUploaderSettings } from "@scandit/web-datacapture-core";

  function onUpdateOnlyCameraCapture(value: boolean) {
    const newSettings = new SingleImageUploaderSettings($singleImageUploader.settings);
    newSettings.onlyCameraCapture = value;
    $singleImageUploader.applySettings(newSettings);
  }
</script>

<h2 class="font-bold p-4">Single Image Uploader</h2>

<section class="flex flex-col">
  <CheckboxSetting
    id="onlyCameraCapture"
    checked={$singleImageUploader.settings.onlyCameraCapture}
    on:change={(e) => onUpdateOnlyCameraCapture(valueFromCheckbox(e))}>Only Allow Camera Capture</CheckboxSetting
  >
  <p class="-mt-4 px-4 text-sm text-gray-500">effective on mobile devices only</p>
</section>
