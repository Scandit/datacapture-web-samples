<script lang="ts">
  import Modal from "./Modal.svelte";
  import { closeAlert } from "./Alert";

  export let title: string;
  export let content: string;
</script>

<Modal className="h-auto sm-xy:h-auto w-80 max-w-auto sm-xy:w-80" show>
  <span class="font-bold" slot="header">{title}</span>
  <p slot="content" class="py-4">{content}</p>
  <div slot="footer">
    <button class="w-full cta cta--primary" on:click={closeAlert}>OK</button>
  </div>
</Modal>
