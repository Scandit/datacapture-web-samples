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
              src={`${get(scannedDocumentFaceImage)}`}
              alt="document's face"
            />
          </div>
        {/if}
        {#if $scannedDocumentFrontImage}
          <div>
            <img
              class="doc-image"
              src={`${get(scannedDocumentFrontImage)}`}
              alt="document's front side"
            />
          </div>
        {/if}
        {#if $scannedDocumentBackImage}
          <div>
            <img
              class="doc-image"
              src={`${get(scannedDocumentBackImage)}`}
              alt="document's back side"
            />
          </div>
        {/if}
        {#if $scannedDocumentFrontFrameImage}
          <div>
            <img
              class="doc-image"
              src={`${get(scannedDocumentFrontFrameImage)}`}
              alt="frame's front side"
            />
          </div>
        {/if}
        {#if $scannedDocumentBackFrameImage}
          <div>
            <img
              class="doc-image"
              src={`${get(scannedDocumentBackFrameImage)}`}
              alt="frame's back side"
            />
          </div>
        {/if}
      {/if}

      <div class="border p-4 rounded-md shadow-md">
        <ScanResultCommon data={$scannedDocument} />
      </div>

      {#if $scannedDocument.vizResult}
        <h3 class="font-bold mt-2">VIZ Result</h3>
        <div class="border p-4 rounded-md shadow-md mt-2">
          <ScanResultViz data={$scannedDocument.vizResult} />
        </div>
      {/if}

      {#if $scannedDocument.barcode}
        <h3 class="font-bold mt-2">Barcode Result</h3>
        <div class="border p-4 rounded-md shadow-md mt-2">
          <ScanResultBarcode data={$scannedDocument.barcode} />
        </div>
      {/if}

      {#if $scannedDocument.mrzResult != null}
        <h3 class="font-bold mt-2">MRZ Result</h3>
        <div class="border p-4 rounded-md shadow-md mt-2">
          <ScanResultMrz data={$scannedDocument.mrzResult} />
        </div>
      {/if}
    {/if}
  </div>
  <button slot="footer" class="w-full cta cta--primary" on:click={onModalClose}>OK</button>
</Modal>

<style lang="postcss">
  img.doc-image {
    @apply h-[140px];
  }
</style>
