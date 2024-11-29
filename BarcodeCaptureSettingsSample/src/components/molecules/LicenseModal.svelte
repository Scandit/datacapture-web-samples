<script lang="ts">
  import Modal from "@/components/atoms/Modal.svelte";
  import { licenseText, showLicense } from "@/store";


  async function onModalClose() {
    $showLicense = false;
  }
</script>

<Modal bind:show={$showLicense}>
  <h2 slot="header" class="font-bold text-center">License Text</h2>
  <div slot="content" class="flex flex-col gap-2">
    <pre>{$licenseText}</pre>
  </div>
  <button slot="footer" class="cta cta--primary flex-grow" on:click={onModalClose}>Close</button>
</Modal>
