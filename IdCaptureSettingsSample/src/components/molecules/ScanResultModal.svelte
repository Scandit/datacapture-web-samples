<script lang="ts">
  import Modal from "@/components/atoms/Modal.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import {
    isSidebarOpen,
    scannedDocument,
    scannedDocumentBackFrameImage,
    scannedDocumentBackImage,
    scannedDocumentFaceImage,
    scannedDocumentFrontFrameImage,
    scannedDocumentFrontImage,
    showScanResults,
  } from "@/store";
  import ScanResultViz from "./ScanResult/ScanResultViz.svelte";
  import ScanResultBarcode from "./ScanResult/ScanResultBarcode.svelte";
  import ScanResultCommon from "./ScanResult/ScanResultCommon.svelte";
  import ScanResultMrz from "./ScanResult/ScanResultMrz.svelte";
  import { get } from "svelte/store";

  async function onModalClose() {
    $scannedDocument = null;
    $showScanResults = false;

    if ($isSidebarOpen) {
      return;
    }

    await sdkManager.idCapture.reset();
    void sdkManager.idCapture.setEnabled(true);
  }
</script>

<Modal bind:show={$showScanResults}>
  <h2 slot="header" class="font-bold text-center">Recognized document</h2>
  <div slot="content" class="flex flex-col gap-2">
    {#if $scannedDocument}
      {#if $scannedDocumentFaceImage || $scannedDocumentFrontImage || $scannedDocumentBackImage || $scannedDocumentFrontFrameImage || $scannedDocumentBackFrameImage}
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
        {#if $scannedDocumentFrontFrameImage}
          <div>
            <img
              class="doc-image"
              src={`data:image/png;base64,${get(scannedDocumentFrontFrameImage)}`}
              alt="frame's front side"
            />
          </div>
        {/if}
        {#if $scannedDocumentBackFrameImage}
          <div>
            <img
              class="doc-image"
              src={`data:image/png;base64,${get(scannedDocumentBackFrameImage)}`}
              alt="frame's back side"
            />
          </div>
        {/if}
      {/if}
      <ScanResultCommon data={$scannedDocument} />
      {#if $scannedDocument.vizResult}
        <ScanResultViz data={$scannedDocument.vizResult} />
      {/if}
      {#if $scannedDocument.barcode}
        <ScanResultBarcode data={$scannedDocument.barcode} />
      {/if}
      {#if $scannedDocument.mrzResult != null}
        <ScanResultMrz data={$scannedDocument.mrzResult} />
      {/if}
    {/if}
  </div>
  <button slot="footer" class="w-full cta cta--primary" on:click={onModalClose}>OK</button>
</Modal>

<style>
  img.doc-image {
    @apply h-[140px];
  }
</style>
