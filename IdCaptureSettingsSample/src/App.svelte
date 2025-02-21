<script lang="ts">
  import { Route } from "svelte-navigator";
  import ScanResultModal from "@/components/molecules/ScanResultModal.svelte";
  import DataCapture from "@/data-capture/DataCapture.svelte";
  import HashRouter from "@/navigation/HashRouter.svelte";
  import Navbar from "@/settings/Navbar.svelte";
  import Settings from "@/settings/Settings.svelte";
  import Sidebar from "@/settings/Sidebar.svelte";
  import { dataConsistencyResult, isSidebarOpen, scannedDocument, showDataConsistency, showScanResults } from "@/store";
  import CameraSettingsPage from "@/settings/camera/CameraSettings.svelte";
  import DocumentSelection from "@/settings/id-capture/DocumentSelection.svelte";
  import ViewSettingsPage from "@/settings/view/ViewSettings.svelte";
  import IdCaptureSettingsPage from "@/settings/id-capture/IdCaptureSettings.svelte";
  import ResultWithImageTypes from "./settings/id-capture/ResultWithImageTypes.svelte";
  import ScanAreaSettingsPage from "./settings/view/scan-area/ScanAreaSettings.svelte";
  import PointOfInterestSettingsPage from "./settings/view/point-of-interest/PointOfInterestSettings.svelte";
  import OverlaySettingsPage from "./settings/view/overlay/OverlaySettings.svelte";
  import LogoSettingsPage from "./settings/view/logo/LogoSettings.svelte";
  import LogoOffsetSettingsPage from "./settings/view/logo/offset/LogoOffsetSettings.svelte";
  import ControlsSettingsPage from "./settings/view/controls/ControlsSettings.svelte";
  import { isSdkConfigured, showLicenseText } from "./store";
  import { get } from "svelte/store";
  import { sdkManager } from "./sdkManager/sdkManager";
  import { TorchState } from "@scandit/web-datacapture-core";
  import { desiredTorchState } from "./settings/camera/store";
  import ScannerType from "./settings/id-capture/ScannerType.svelte";
  import Feedback from "./settings/id-capture/Feedback.svelte";
  import LicenseModal from "@/components/molecules/LicenseModal.svelte";
  import { modalStore } from "./settings/id-capture/store";
  import Alert from "./components/atoms/Alert.svelte";
  import DataConsitencyModal from "./components/molecules/DataConsitencyModal.svelte";

  // If SDK finishes configuring and the sidebar is open, disable it
  isSdkConfigured.subscribe((configured) => {
    if (configured && get(isSidebarOpen)) {
      sdkManager.idCapture.setEnabled(false);
    }
  });

  // - Disable any capture when the sidebar is open
  // - Switch off the torch whenever opening the settings
  isSidebarOpen.subscribe((isOpen) => {
    if ($isSdkConfigured) {
      sdkManager.idCapture.setEnabled(!isOpen);
    }
    const currentTorchState = get(desiredTorchState);
    if (isOpen && currentTorchState === TorchState.On) {
      void sdkManager.camera.updateTorchState(TorchState.Off);
    } else if (!isOpen && currentTorchState === TorchState.On) {
      void sdkManager.camera.updateTorchState(TorchState.On);
    }
  });
</script>

<HashRouter>
  <Sidebar>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/settings/id-capture">
      <IdCaptureSettingsPage />
    </Route>
    <Route path="/settings/camera">
      <CameraSettingsPage />
    </Route>
    <Route path="/settings/view">
      <ViewSettingsPage />
    </Route>
    <Route path="/settings/id-capture/accepted-documents">
      <DocumentSelection
        title="Accepted documents"
        getDocuments={(settings) => settings.acceptedDocuments}
        updateDocuments={(newDocuments) => sdkManager.idCapture.updateAcceptedDocuments(newDocuments)}
      />
    </Route>
    <Route path="/settings/id-capture/rejected-documents">
      <DocumentSelection
        title="Rejected documents"
        getDocuments={(settings) => settings.rejectedDocuments}
        updateDocuments={(newDocuments) => sdkManager.idCapture.updateRejectedDocuments(newDocuments)}
      />
    </Route>
    <Route path="/settings/id-capture/scanner">
      <ScannerType />
    </Route>
    <Route path="/settings/id-capture/result-with-image-types">
      <ResultWithImageTypes />
    </Route>
    <Route path="/settings/view/scan-area">
      <ScanAreaSettingsPage />
    </Route>
    <Route path="/settings/view/point-of-interest">
      <PointOfInterestSettingsPage />
    </Route>
    <Route path="/settings/view/overlay">
      <OverlaySettingsPage />
    </Route>
    <Route path="/settings/view/logo">
      <LogoSettingsPage />
    </Route>
    <Route path="/settings/view/logo/offset">
      <LogoOffsetSettingsPage />
    </Route>
    <Route path="/settings/view/controls">
      <ControlsSettingsPage />
    </Route>
    <Route path="/settings/id-capture/feedback">
      <Feedback />
    </Route>
  </Sidebar>
  <div class="flex flex-col h-[100dvh]">
    <Navbar />
    <DataCapture />
  </div>
</HashRouter>

{#if $scannedDocument && $showScanResults}
  <ScanResultModal />
{/if}

{#if $dataConsistencyResult && $showDataConsistency}
  <DataConsitencyModal />
{/if}

{#if $showLicenseText}
  <LicenseModal />
{/if}

{#if $modalStore != null}
  <Alert title={$modalStore.title} content={$modalStore.content} />
{/if}
