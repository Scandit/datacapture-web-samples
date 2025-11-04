<script lang="ts">
  import SettingsEntry from "@/settings/SettingsEntry.svelte";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold">View</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/view/scan-area">Scan Area Margins</SettingsEntry>
    <SettingsEntry to="/settings/view/point-of-interest">Point Of Interest</SettingsEntry>
    <SettingsEntry to="/settings/view/overlay">Overlay</SettingsEntry>
    <SettingsEntry to="/settings/view/logo">Logo</SettingsEntry>
    <SettingsEntry to="/settings/view/controls">Controls</SettingsEntry>
  </svelte:fragment>
</SidebarRoute>
