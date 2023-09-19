<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ChinaOneWayPermitFrontMrzResult } from "scandit-web-datacapture-id/build/js/captured-id/ChinaOneWayPermitFrontMrzResult";

  type MainType = ChinaOneWayPermitFrontMrzResult;
  export let data: MainType;

  const fieldNameByKey = {
    documentCode: "Document Code",
    fullNameSimplifiedChinese: "Full Name in Simplified Chinese",
    capturedMrz: "Captured MRZ",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
