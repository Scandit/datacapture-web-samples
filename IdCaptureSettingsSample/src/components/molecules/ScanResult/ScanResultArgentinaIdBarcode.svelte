<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ArgentinaIdBarcodeResult } from "scandit-web-datacapture-id";

  type MainType = ArgentinaIdBarcodeResult;
  export let data: MainType;

  const fieldNameByKey = {
    personalIdNumber: "Personal Id Number",
    documentCopy: "Document Copy",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
