<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ColombiaIdBarcodeResult } from "scandit-web-datacapture-id";

  type MainType = ColombiaIdBarcodeResult;
  export let data: MainType;

  const fieldNameByKey = {
    bloodType: "Blood Type",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
