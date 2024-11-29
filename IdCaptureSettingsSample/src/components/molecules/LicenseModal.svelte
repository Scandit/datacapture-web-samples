<script lang="ts">
  import { licenseText, showLicenseText } from "@/store";
  import Modal from "@/components/atoms/Modal.svelte";

  async function onModalClose() {
    showLicenseText.set(false);
  }
</script>

<Modal bind:show={$showLicenseText}>
  <h2 slot="header" class="font-bold text-center">License text</h2>
  <div slot="content" class="flex flex-col gap-2">
    <pre>{$licenseText}</pre>
  </div>
  <button slot="footer" class="w-full cta cta--primary" on:click={onModalClose}>Close</button>
</Modal>

<style>

</style>
