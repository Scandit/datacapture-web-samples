<script lang="ts">
  import { DataCaptureContext } from "@scandit/web-datacapture-core";
  import { Link } from "svelte-navigator";

  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SettingsEntry from "./SettingsEntry.svelte";
  import { licenseText, showLicenseText } from "@/store";

  async function onShowLicenseText(e: Event) {
    e.preventDefault();
    showLicenseText.set(true)
    const license = await DataCaptureContext.getOpenSourceSoftwareLicenseInfo();
    licenseText.set(license.licenseText);
  }
</script>

<SidebarRoute backRoute="/">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Settings</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/id-capture">Id Capture</SettingsEntry>
    <SettingsEntry to="/settings/camera">Camera</SettingsEntry>
    <SettingsEntry to="/settings/view">View</SettingsEntry>
    <Link to="#" class="cta cta--full flex items-center justify-between" on:click={onShowLicenseText}>
      Show License Text
    </Link>
  </svelte:fragment>
</SidebarRoute>
