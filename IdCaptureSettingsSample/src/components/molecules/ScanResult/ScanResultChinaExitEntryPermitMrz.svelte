<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ChinaExitEntryPermitMrzResult } from "scandit-web-datacapture-id";

  type MainType = ChinaExitEntryPermitMrzResult;
  export let data: MainType;

  const fieldNameByKey = {
    documentCode: "Document Code",
    capturedMrz: "Captured MRZ",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
