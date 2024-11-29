<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SettingsEntry from "@/settings/SettingsEntry.svelte";
</script>

<SidebarRoute backRoute="/settings">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Barcode Capture</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/barcode-capture/symbologies">Symbologies</SettingsEntry>
    <SettingsEntry to="/settings/barcode-capture/composite-types">Composite Types</SettingsEntry>
    <SettingsEntry to="/settings/barcode-capture/location-selection">Location Selection</SettingsEntry>
    <SettingsEntry to="/settings/barcode-capture/feedback">Feedback</SettingsEntry>
    <SettingsEntry to="/settings/barcode-capture/code-duplicate-filter">Code Duplicate Filter</SettingsEntry>
    <SettingsEntry to="/settings/barcode-capture/scan-intention">Scan Intention</SettingsEntry>
  </svelte:fragment>
</SidebarRoute>
