<script lang="ts">
  import Navbar from "@/settings/Navbar.svelte";
  import DataCapture from "@/data-capture/DataCapture.svelte";
  import Sidebar from "@/settings/Sidebar.svelte";
  import { Route } from "svelte-navigator";
  import Settings from "@/settings/Settings.svelte";
  import BarcodeCaptureSettingsPage from "@/settings/barcode-capture/BarcodeCaptureSettings.svelte";
  import CameraSettingsPage from "@/settings/camera/CameraSettings.svelte";
  import ViewSettingsPage from "@/settings/view/ViewSettings.svelte";
  import ResultSettingsPage from "@/settings/result/ResultSettings.svelte";
  import HashRouter from "@/navigation/HashRouter.svelte";
  import SymbologiesSettingsPage from "@/settings/barcode-capture/symbologies/SymbologiesSettings.svelte";
  import CompositeTypesSettingsPage from "@/settings/barcode-capture/composite-types/CompositeTypesSettings.svelte";
  import FeedbackSettingsPage from "@/settings/barcode-capture/feedback/FeedbackSettings.svelte";
  import CodeDuplicateFilterSettingsPage from "@/settings/barcode-capture/code-duplicate-filter/CodeDuplicateFilterSettings.svelte";
  import LocationSelectionSettingsPage from "@/settings/barcode-capture/location-selection/LocationSelectionSettings.svelte";
  import SymbologySettingsPage from "@/settings/barcode-capture/symbologies/symbology/SymbologySettings.svelte";
  import { onMount } from "svelte";
  import ScanResultModal from "@/components/molecules/ScanResultModal.svelte";
  import { continuousScanning } from "@/settings/result/store";
  import ScanResultToast from "@/components/molecules/ScanResultToast.svelte";
  import ScanAreaSettingsPage from "@/settings/view/scan-area/ScanAreaSettings.svelte";
  import {
    BarcodeCapture,
    barcodeCaptureLoader,
    BarcodeCaptureOverlay,
    BarcodeCaptureOverlayStyle,
    BarcodeCaptureSettings,
  } from "scandit-web-datacapture-barcode";
  import OverlaySettingsPage from "@/settings/view/overlay/OverlaySettings.svelte";
  import ViewfinderSettingsPage from "@/settings/view/viewfinder/ViewfinderSettings.svelte";
  import LogoSettingsPage from "@/settings/view/logo/LogoSettings.svelte";
  import ControlsSettingsPage from "@/settings/view/controls/ControlsSettings.svelte";
  import PointOfInterestSettingsPage from "@/settings/view/point-of-interest/PointOfInterestSettings.svelte";
  import {
    barcodeCapture,
    barcodeCaptureOverlay,
    barcodeCaptureSettings,
    dataCaptureContext,
    dataCaptureView,
    isSdkConfigured,
    scannedBarcode,
    showScanResults,
  } from "@/store";
  import {
    Camera,
    configure,
    DataCaptureContext,
    DataCaptureView,
    FrameSourceState,
  } from "scandit-web-datacapture-core";

  onMount(async () => {
    // There is a Scandit sample license key set below here.
    // This license key is enabled for sample evaluation only.
    // If you want to build your own application, get your license key by signing up for a trial at https://ssl.scandit.com/dashboard/sign-up?p=test
    // The library location option represents the location of the wasm file, which will be fetched asynchronously.
    await configure({
      licenseKey: "AYjTKgwFKLhZGtmHmyNAawklGVUpLfmaJ2JN39hPFcbHRdb8Sh3UX45m7PRkJtORsQzsAeBZw7aAZ/VBZlp5ykVZZOOYUI8ZAxAsZ3tOrh5HXX2CzFyh2yNzGtUXQuR5eFHqhXNx8+mfbsvN2zErPt0+TW4TESKXSx4764U8HnIF/01crbTR4/qxeWvIgdmGJkoV2YZc4wfZjpQI2Uvd3/J2jFcv/WrVHgWZ/VAC2lHTzC3JdwtTNJKxxDpsqKp1sDlARxGjw4hlebrAUbft3aWMjbtpVn2T4D+tBN3GVuwlD9Uo7MN3Sto17fSVSD1JLymYPHP7zxsnByy9mCBhKqTf3YKCh8DughdNJpIIWaaoY6t6OTof+TxY25XAboYM1Ii3FdaK1MjK2x9bVujInqaIYzPRYRwQj6lPyVaYSiRRJTsR6l3RLXyorSeqM6Mjyspyb9Gl3ht1grXe8TzMwVUFLYwBlV1zYcKfCVxHIaPo8irO1X7+sImu0166pNeK962FxzUx+rJMsvEIhy8mzF//yRI8WBLZvuBS5AH8EJHBb5p6DcdLgNVf3AwQWw6S5ENIw1Nu+eS2p+nm7msRRWP5jbqo8TfwgoellmtHaljlvmQ47kXfZvo9feDd7qZtGvWuX22yZkb+3k0OEfNKZaBKLrfzKU6X5TlmMvyhU7mF6mMdkBwex+NuKhRl1fYVjzD1hk75j70/QgXyjMv9nJpSEIXEt//AVHZTG4lGvAT0l3hPOie/zS0ixEH11+LJvbzsZQXYngggsJ40oCbajRxnvrMEcJQ5Lcxnp/Ov8qTmApOqK+XmLAV/s+MdeeIatFNTk6o9xGar+cB8",
      libraryLocation: new URL("library/engine/", window.location.href.replace(/index\.html.*/, "")).toString(),
      moduleLoaders: [barcodeCaptureLoader()],
    });

    // Create a new data capture context which will be used for data-capture related tasks.
    $dataCaptureContext = await DataCaptureContext.create();

    // Create the settings object that will be used to configure the barcode scanner.
    $barcodeCaptureSettings = new BarcodeCaptureSettings();

    // Create a new barcode capture that uses the context and settings created earlier.
    $barcodeCapture = await BarcodeCapture.forContext($dataCaptureContext, $barcodeCaptureSettings);

    // Disable barcode capturing until the camera is enabled.
    await $barcodeCapture.setEnabled(false);

    // Retrieve an instance of the world-facing camera and set it as the frame source of the data capture context.
    // The camera is off by default and must be turned on to start streaming frames to the data capture context.
    const camera = Camera.default;
    const cameraSettings = BarcodeCapture.recommendedCameraSettings;
    await camera.applySettings(cameraSettings);
    await $dataCaptureContext.setFrameSource(camera);

    // Create a data capture view that renders the camera preview to the screen.
    // The view must be connected to the data capture context.
    $dataCaptureView = await DataCaptureView.forContext($dataCaptureContext);

    // Attach the data capture view to the DOM.
    $dataCaptureView.connectToElement(document.getElementById("data-capture-view")!);

    // Add an overlay to the data capture view to render the location of captured barcodes on top of
    // the video preview. This is optional, but recommended for better visual feedback.
    $barcodeCaptureOverlay = await BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
      $barcodeCapture,
      $dataCaptureView,
      BarcodeCaptureOverlayStyle.Frame
    );

    // Switch the camera on to start streaming frames to the data capture context.
    // The camera is started asynchronously and will take some time to completely turn on.
    await camera.switchToDesiredState(FrameSourceState.On);

    // Enable barcode capturing.
    await $barcodeCapture.setEnabled(true);

    // Register an event listener to handle successful barcode scans.
    $barcodeCapture.addListener({
      didScan: async (_, barcodeCaptureSession) => {
        // Obtain the newly scanned barcode.
        $scannedBarcode = barcodeCaptureSession.newlyRecognizedBarcodes[0];

        if ($scannedBarcode.data == null) {
          return;
        }

        if ($continuousScanning) {
          $showScanResults = true;
          return;
        }

        // Disable barcode capturing until the user has closed the scan result modal.
        $barcodeCapture.setEnabled(false);

        // Avoid showing the scan results immediately, so the overlay can be seen.
        setTimeout(() => {
          $showScanResults = true;
        }, 300);
      },
    });

    $isSdkConfigured = true;
  });
</script>

<HashRouter>
  <Navbar />
  <Sidebar>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/settings/barcode-capture">
      <BarcodeCaptureSettingsPage />
    </Route>
    <Route path="/settings/camera">
      <CameraSettingsPage />
    </Route>
    <Route path="/settings/view">
      <ViewSettingsPage />
    </Route>
    <Route path="/settings/result">
      <ResultSettingsPage />
    </Route>
    <Route path="/settings/barcode-capture/symbologies">
      <SymbologiesSettingsPage />
    </Route>
    <Route path="/settings/barcode-capture/composite-types">
      <CompositeTypesSettingsPage />
    </Route>
    <Route path="/settings/barcode-capture/location-selection">
      <LocationSelectionSettingsPage />
    </Route>
    <Route path="/settings/barcode-capture/feedback">
      <FeedbackSettingsPage />
    </Route>
    <Route path="/settings/barcode-capture/code-duplicate-filter">
      <CodeDuplicateFilterSettingsPage />
    </Route>
    <Route path="/settings/barcode-capture/symbologies/:symbology">
      <SymbologySettingsPage />
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
    <Route path="/settings/view/viewfinder">
      <ViewfinderSettingsPage />
    </Route>
    <Route path="/settings/view/logo">
      <LogoSettingsPage />
    </Route>
    <Route path="/settings/view/controls">
      <ControlsSettingsPage />
    </Route>
  </Sidebar>
</HashRouter>
<DataCapture />
{#if $scannedBarcode && $showScanResults}
  {#if $continuousScanning}
    <ScanResultToast />
  {:else}
    <ScanResultModal />
  {/if}
{/if}
