<script lang="ts">
  import Modal from "./Modal.svelte";
  import { closeAlert } from "./Alert";

  export let title: string;
  export let content: string;

  // Split content into intro and JSON if diagnostic report exists
  const diagnosticMarker = "\n\nDiagnostic Report:\n";
  const hasDiagnostic = content.includes(diagnosticMarker);
  const [introText, jsonText] = hasDiagnostic
    ? content.split(diagnosticMarker)
    : [content, null];
</script>

<Modal className="h-auto sm-xy:h-auto w-80 max-w-auto sm-xy:w-80" show>
  <span class="font-bold" slot="header">{title}</span>
  <div slot="content" class="py-4">
    <p>{introText}</p>
    {#if jsonText}
      <div class="mt-4">
        <p class="font-semibold mb-2">Diagnostic Report:</p>
        <pre class="text-sm overflow-auto max-h-96 bg-gray-100 p-2 rounded">{jsonText}</pre>
      </div>
    {/if}
  </div>
  <div slot="footer">
    <button class="w-full cta cta--primary" on:click={closeAlert}>OK</button>
  </div>
</Modal>
