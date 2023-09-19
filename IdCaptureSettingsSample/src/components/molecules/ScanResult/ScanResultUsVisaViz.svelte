<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { USVisaVIZResult } from "scandit-web-datacapture-id/build/js/captured-id/UsVisaVizResult";

  type MainType = USVisaVIZResult;
  export let data: MainType;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    visaNumber: "Visa Number",
    passportNumber: "Passport Number",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
