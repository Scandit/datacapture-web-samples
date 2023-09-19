<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { MRZResult } from "scandit-web-datacapture-id";

  type MainType = MRZResult;
  export let data: MainType;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    documentCode: "Document Code",
    namesAreTruncated: "Names Are Truncated",
    optional: "Optional",
    optional1: "Optional1",
    capturedMrz: "Captured Mrz",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
