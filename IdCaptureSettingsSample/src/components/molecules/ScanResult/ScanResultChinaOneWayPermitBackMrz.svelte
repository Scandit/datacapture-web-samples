<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ChinaOneWayPermitBackMrzResult } from "scandit-web-datacapture-id/build/js/captured-id/ChinaOneWayPermitBackMrzResult";

  type MainType = ChinaOneWayPermitBackMrzResult;
  export let data: MainType;

  const fieldNameByKey = {
    documentCode: "Document Code",
    namesAreTruncated: "Names Are Truncated",
    capturedMrz: "Captured MRZ",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
