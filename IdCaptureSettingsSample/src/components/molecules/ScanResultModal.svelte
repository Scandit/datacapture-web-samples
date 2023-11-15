<script lang="ts">
  import Modal from "@/components/atoms/Modal.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import {
    isSidebarOpen,
    scannedDocument,
    scannedDocumentBackImage,
    scannedDocumentFaceImage,
    scannedDocumentFrontImage,
    showScanResults,
  } from "@/store";
  import ScanResultViz from "./ScanResult/ScanResultViz.svelte";
  import ScanResultAamvaBarcode from "./ScanResult/ScanResultAamvaBarcode.svelte";
  import ScanResultCommon from "./ScanResult/ScanResultCommon.svelte";
  import ScanResultArgentinaIdBarcode from "./ScanResult/ScanResultArgentinaIdBarcode.svelte";
  import ScanResultApecBusinessTravelCardMrz from "./ScanResult/ScanResultApecBusinessTravelCardMrz.svelte";
  import ScanResultChinaExitEntryPermitMrz from "./ScanResult/ScanResultChinaExitEntryPermitMrz.svelte";
  import ScanResultChinaMainlandTravelPermitMrz from "./ScanResult/ScanResultChinaMainlandTravelPermitMrz.svelte";
  import ScanResultChinaOneWayPermitBackMrz from "./ScanResult/ScanResultChinaOneWayPermitBackMrz.svelte";
  import ScanResultChinaOneWayPermitFrontMrz from "./ScanResult/ScanResultChinaOneWayPermitFrontMrz.svelte";
  import ScanResultColombiaDlBarcode from "./ScanResult/ScanResultColombiaDlBarcode.svelte";
  import ScanResultColombiaIdBarcode from "./ScanResult/ScanResultColombiaIdBarcode.svelte";
  import ScanResultCommonAccessCardBarcode from "./ScanResult/ScanResultCommonAccessCardBarcode.svelte";
  import ScanResultMrz from "./ScanResult/ScanResultMrz.svelte";
  import ScanResultSouthAfricaDlBarcode from "./ScanResult/ScanResultSouthAfricaDlBarcode.svelte";
  import ScanResultSouthAfricaIdBarcode from "./ScanResult/ScanResultSouthAfricaIdBarcode.svelte";
  import ScanResultUsUniformedServicesBarcode from "./ScanResult/ScanResultUsUniformedServicesBarcode.svelte";
  import ScanResultUsVisaViz from "./ScanResult/ScanResultUsVisaViz.svelte";
  import ResultField from "../atoms/ResultField.svelte";
  import { get } from "svelte/store";

  let birthDate: string;
  if ($scannedDocument?.dateOfBirth) {
    birthDate = new Intl.DateTimeFormat([], { timeZone: "UTC" }).format(
      Date.UTC(
        $scannedDocument.dateOfBirth.year,
        $scannedDocument.dateOfBirth.month - 1,
        $scannedDocument.dateOfBirth.day
      )
    );
  }

  function onModalClose() {
    $scannedDocument = null;
    $showScanResults = false;

    if ($isSidebarOpen) {
      return;
    }

    void sdkManager.idCapture.setEnabled(true);
  }
</script>

<Modal bind:show={$showScanResults}>
  <h2 slot="header" class="font-bold text-center">Recognized document</h2>
  <div slot="content" class="flex flex-col gap-2">
    {#if $scannedDocument}
      {#if $scannedDocumentFaceImage || $scannedDocumentFrontImage || $scannedDocumentBackImage}
        <div class="font-bold">Images</div>
        {#if $scannedDocumentFaceImage}
          <div>
            <img
              class="doc-image"
              src={`data:image/png;base64,${get(scannedDocumentFaceImage)}`}
              alt="document's face"
            />
          </div>
        {/if}
        {#if $scannedDocumentFrontImage}
          <div>
            <img
              class="doc-image"
              src={`data:image/png;base64,${get(scannedDocumentFrontImage)}`}
              alt="document's front side"
            />
          </div>
        {/if}
        {#if $scannedDocumentBackImage}
          <div>
            <img
              class="doc-image"
              src={`data:image/png;base64,${get(scannedDocumentBackImage)}`}
              alt="document's back side"
            />
          </div>
        {/if}
      {/if}
      <ResultField name="Result types" value={$scannedDocument.capturedResultTypes} />
      <ScanResultCommon data={$scannedDocument} />
      {#if $scannedDocument.vizResult}
        <ScanResultViz data={$scannedDocument.vizResult} />
      {/if}
      {#if $scannedDocument.aamvaBarcodeResult}
        <ScanResultAamvaBarcode data={$scannedDocument.aamvaBarcodeResult} />
      {/if}
      {#if $scannedDocument.apecBusinessTravelCardMrzResult}
        <ScanResultApecBusinessTravelCardMrz data={$scannedDocument.apecBusinessTravelCardMrzResult} />
      {/if}
      {#if $scannedDocument.argentinaIdBarcodeResult}
        <ScanResultArgentinaIdBarcode data={$scannedDocument.argentinaIdBarcodeResult} />
      {/if}
      {#if $scannedDocument.chinaExitEntryPermitMrzResult}
        <ScanResultChinaExitEntryPermitMrz data={$scannedDocument.chinaExitEntryPermitMrzResult} />
      {/if}
      {#if $scannedDocument.chinaMainlandTravelPermitMrzResult}
        <ScanResultChinaMainlandTravelPermitMrz data={$scannedDocument.chinaMainlandTravelPermitMrzResult} />
      {/if}
      {#if $scannedDocument.chinaOneWayPermitFrontMrzResult}
        <ScanResultChinaOneWayPermitFrontMrz data={$scannedDocument.chinaOneWayPermitFrontMrzResult} />
      {/if}
      {#if $scannedDocument.chinaOneWayPermitBackMrzResult}
        <ScanResultChinaOneWayPermitBackMrz data={$scannedDocument.chinaOneWayPermitBackMrzResult} />
      {/if}
      {#if $scannedDocument.colombiaDlBarcodeResult}
        <ScanResultColombiaDlBarcode data={$scannedDocument.colombiaDlBarcodeResult} />
      {/if}
      {#if $scannedDocument.colombiaIdBarcodeResult}
        <ScanResultColombiaIdBarcode data={$scannedDocument.colombiaIdBarcodeResult} />
      {/if}
      {#if $scannedDocument.commonAccessCardBarcodeResult}
        <ScanResultCommonAccessCardBarcode data={$scannedDocument.commonAccessCardBarcodeResult} />
      {/if}
      {#if $scannedDocument.mrzResult != null}
        <ScanResultMrz data={$scannedDocument.mrzResult} />
      {/if}
      {#if $scannedDocument.southAfricaDlBarcodeResult}
        <ScanResultSouthAfricaDlBarcode data={$scannedDocument.southAfricaDlBarcodeResult} />
      {/if}
      {#if $scannedDocument.southAfricaIdBarcodeResult}
        <ScanResultSouthAfricaIdBarcode data={$scannedDocument.southAfricaIdBarcodeResult} />
      {/if}
      {#if $scannedDocument.usUniformedServicesBarcodeResult}
        <ScanResultUsUniformedServicesBarcode data={$scannedDocument.usUniformedServicesBarcodeResult} />
      {/if}
      {#if $scannedDocument.usVisaVIZResult}
        <ScanResultUsVisaViz data={$scannedDocument.usVisaVIZResult} />
      {/if}
    {/if}
  </div>
  <button slot="footer" class="w-full cta cta--primary" on:click={onModalClose}>Ok</button>
</Modal>

<style>
  img.doc-image {
    @apply h-[140px];
  }
</style>
