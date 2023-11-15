<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ChinaMainlandTravelPermitMrzResult } from "scandit-web-datacapture-id";

  type MainType = ChinaMainlandTravelPermitMrzResult;
  export let data: MainType;

  const fieldNameByKey = {
    documentCode: "Document Code",
    capturedMrz: "Captured MRZ",
    personalIdNumber: "Personal ID Number",
    renewalTimes: "Renewal times",
    fullNameSimplifiedChinese: "Full Name Simplified Chinese",
    omittedCharacterCountInGBKName: "Omitted Character Count In GBK Name",
    omittedNameCount: "Omitted Name Count",
    issuingAuthorityCode: "Issuing Authority Code",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
