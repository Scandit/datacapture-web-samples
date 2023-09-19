<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { isSoundEnabled, isVibrationEnabled, isVibrationSupported } from "@/settings/barcode-capture/feedback/store";
</script>

<SidebarRoute backRoute="/settings/barcode-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Feedback</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <CheckboxSetting id="sound" bind:checked={$isSoundEnabled}>Sound</CheckboxSetting>
    <CheckboxSetting id="vibration" disabled={!$isVibrationSupported} bind:checked={$isVibrationEnabled}>
      Vibration
    </CheckboxSetting>
  </svelte:fragment>
</SidebarRoute>
