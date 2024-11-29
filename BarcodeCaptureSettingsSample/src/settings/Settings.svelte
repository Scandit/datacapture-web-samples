<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SettingsEntry from "./SettingsEntry.svelte";
  import { Link } from "svelte-navigator";
  import { DataCaptureContext } from "@scandit/web-datacapture-core";
  import { licenseText, showLicense } from "@/store";

  async function onShowLicenseText(ev: Event) {
    const license = await DataCaptureContext.getOpenSourceSoftwareLicenseInfo();
    $licenseText = license.licenseText;
    $showLicense = true;
  }
</script>

<SidebarRoute backRoute="/">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Settings</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SettingsEntry to="/settings/barcode-capture">Barcode Capture</SettingsEntry>
    <SettingsEntry to="/settings/camera">Camera</SettingsEntry>
    <SettingsEntry to="/settings/view">View</SettingsEntry>
    <SettingsEntry to="/settings/result">Result</SettingsEntry>
    <Link to="#" class="cta cta--full flex items-center justify-between" on:click={onShowLicenseText}>
      Show License Text
    </Link>
  </svelte:fragment>
</SidebarRoute>
