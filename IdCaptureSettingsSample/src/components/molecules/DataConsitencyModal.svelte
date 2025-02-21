<script lang="ts">
  import Modal from "@/components/atoms/Modal.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import {
    dataConsistencyResult,
    isSidebarOpen,
    frontReviewImage,
    showDataConsistency,
  } from "@/store";
  import DataConsistencyFields from "./DataConsistencyFields.svelte";
  import { get } from "svelte/store";

  async function onModalClose() {
    $dataConsistencyResult = null;
    $showDataConsistency = false;

    if ($isSidebarOpen) {
      return;
    }

    await sdkManager.idCapture.reset();
    void sdkManager.idCapture.setEnabled(true);
  }
</script>

<Modal bind:show={$showDataConsistency}>
  <h2 slot="header" class="font-bold text-center">Inconsistent Data</h2>
  <div slot="content" class="flex flex-col gap-2">
    {#if $dataConsistencyResult}
      {#if $frontReviewImage}
        <div class="font-bold">Front Review Image</div>
        {#if $frontReviewImage}
          <div>
            <img
              class="doc-image"
              src={`${get(frontReviewImage)}`}
              alt="front review"
            />
          </div>
        {/if}
      {/if}
      <DataConsistencyFields data={$dataConsistencyResult} />
    {/if}
  </div>
  <button slot="footer" class="w-full cta cta--primary" on:click={onModalClose}>OK</button>
</Modal>

<style>
  img.doc-image {
    @apply h-[200px];
  }
</style>
