<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { continuousScanning } from "@/settings/result/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Result</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <CheckboxSetting id="continuousScanning" bind:checked={$continuousScanning}>Continuous Scanning</CheckboxSetting>
  </svelte:fragment>
</SidebarRoute>
