<script lang="ts">
  import Toast from "@/components/atoms/Toast.svelte";
  import { scannedBarcode, showScanResults } from "@/store";
  import { SymbologyDescription } from "@scandit/web-datacapture-barcode";
  import { onDestroy } from "svelte";

  let toastTimeoutID: number;

  $: if ($scannedBarcode) {
    window.clearTimeout(toastTimeoutID);
    toastTimeoutID = window.setTimeout(() => {
      $showScanResults = false;
    }, 3000);
  }

  $: symbologyDescription = $scannedBarcode && new SymbologyDescription($scannedBarcode.symbology);

  onDestroy(() => {
    window.clearTimeout(toastTimeoutID);
  });
</script>

<Toast>
  <p>{symbologyDescription?.readableName}: {$scannedBarcode?.data} {$scannedBarcode?.addOnData ?? ""}</p>
  <p>Symbol Count: {$scannedBarcode?.symbolCount}</p>
</Toast>
