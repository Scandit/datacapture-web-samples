<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { DataConsistencyResult } from "@scandit/web-datacapture-id";

  type MainType = DataConsistencyResult;
  export let data: MainType;

  const fieldNameByKey = {
    allChecksPassed: "All Checks Passed",
    failedChecks: "Failed Checks",
    skippedChecks: "Skipped Checks",
    passedChecks: "Passed Checks",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
