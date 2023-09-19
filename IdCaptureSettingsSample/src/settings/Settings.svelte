<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SettingsEntry from "./SettingsEntry.svelte";
</script>

<SidebarRoute backRoute="/">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Settings</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/id-capture">Id Capture</SettingsEntry>
    <SettingsEntry to="/settings/camera">Camera</SettingsEntry>
    <SettingsEntry to="/settings/view">View</SettingsEntry>
  </svelte:fragment>
</SidebarRoute>
