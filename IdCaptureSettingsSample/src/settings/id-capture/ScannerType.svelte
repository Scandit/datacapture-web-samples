<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import SidebarRoute from "../SidebarRoute.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import { idCaptureSettingsStore } from "./store";
  import { IdCaptureScanner, SingleSideScanner } from "@scandit/web-datacapture-id";
  import { valueFromCheckbox, valueFromInput } from "@/helper";
  import { ScannerType } from "@/sdkManager/enums";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";

  let currentScannerType = IdCaptureScanner.isFullDocumentScanner($idCaptureSettingsStore.scannerType)
    ? ScannerType.FullDocument
    : ScannerType.SingleSide;

  let currentOptions: Pick<SingleSideScanner, "barcode" | "machineReadableZone" | "visualInspectionZone"> =
    currentScannerType === ScannerType.SingleSide
      ? ($idCaptureSettingsStore.scannerType as SingleSideScanner).toJSONObject().options
      : { barcode: false, machineReadableZone: false, visualInspectionZone: false };

  function updateScanner(newValue: string) {
    currentScannerType = newValue as ScannerType;
    if (
      newValue === ScannerType.FullDocument &&
      !IdCaptureScanner.isFullDocumentScanner($idCaptureSettingsStore.scannerType)
    ) {
      sdkManager.idCapture.updateScanner(ScannerType.FullDocument);
      return;
    }
    if (
      newValue === ScannerType.SingleSide &&
      !IdCaptureScanner.isSingleSideScanner($idCaptureSettingsStore.scannerType)
    ) {
      sdkManager.idCapture.updateScanner(ScannerType.SingleSide, currentOptions);
      return;
    }
  }

  function onSingleSideScannerUpdate(property: keyof typeof currentOptions, value: unknown) {
    currentOptions = { ...currentOptions, [property]: value };
    sdkManager.idCapture.updateScanner(ScannerType.SingleSide, currentOptions);
  }
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold flex items-center gap-4">Scanner Type</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting
      id="scannerType"
      value={IdCaptureScanner.isFullDocumentScanner($idCaptureSettingsStore.scannerType)
        ? ScannerType.FullDocument
        : ScannerType.SingleSide}
      on:change={(e) => updateScanner(valueFromInput(e))}
    >
      Scanner type
      <svelte:fragment slot="options">
        <option value={ScannerType.FullDocument}>Full</option>
        <option value={ScannerType.SingleSide}>Single side</option>
      </svelte:fragment>
    </SelectSetting>

    {#if currentScannerType == ScannerType.SingleSide}
      <div>
        <CheckboxSetting
          id="barcode"
          checked={currentOptions.barcode}
          on:change={(e) => onSingleSideScannerUpdate("barcode", valueFromCheckbox(e))}>Barcode</CheckboxSetting
        >

        <CheckboxSetting
          id="machineReadableZone"
          checked={currentOptions.machineReadableZone}
          on:change={(e) => onSingleSideScannerUpdate("machineReadableZone", valueFromCheckbox(e))}
          >Machine Readable Zone</CheckboxSetting
        >

        <CheckboxSetting
          id="visualInspectionZone"
          checked={currentOptions.visualInspectionZone}
          on:change={(e) => onSingleSideScannerUpdate("visualInspectionZone", valueFromCheckbox(e))}
          >Visual Inspection Zone</CheckboxSetting
        >
      </div>
    {/if}
  </svelte:fragment>
</SidebarRoute>
