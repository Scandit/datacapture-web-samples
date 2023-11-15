<script lang="ts">
  import Modal from "@/components/atoms/Modal.svelte";
  import { barcodeCapture, isSidebarOpen, scannedBarcode, showScanResults } from "@/store";
  import { SymbologyDescription } from "scandit-web-datacapture-barcode";

  $: symbologyDescription = $scannedBarcode && new SymbologyDescription($scannedBarcode.symbology);

  async function onModalClose() {
    $scannedBarcode = undefined;
    $showScanResults = false;

    if ($isSidebarOpen) {
      return;
    }

    await $barcodeCapture.setEnabled(true);
  }
</script>

<Modal bind:show={$showScanResults}>
  <h2 slot="header" class="font-bold text-center">Scan Results</h2>
  <div slot="content" class="flex flex-col gap-2">
    <p>{symbologyDescription?.readableName}: {$scannedBarcode?.data} {$scannedBarcode?.addOnData ?? ""}</p>
    {#if !symbologyDescription?.activeSymbolCountRange.isFixed}
      <p>Symbol Count: {$scannedBarcode?.symbolCount}</p>
    {/if}
    <button class="cta cta--primary" on:click={onModalClose}>Ok</button>
  </div>
</Modal>
