<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ColombiaDlBarcodeResult } from "scandit-web-datacapture-id";

  type MainType = ColombiaDlBarcodeResult;
  export let data: MainType;

  const fieldNameByKey = {
    identificationType: "Identification Type",
    categories: "Categories",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
