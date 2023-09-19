<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { ApecBusinessTravelCardMrzResult } from "scandit-web-datacapture-id/build/js/captured-id/ApecBusinessTravelCardMrzResult";

  type MainType = ApecBusinessTravelCardMrzResult;
  export let data: MainType;

  const fieldNameByKey = {
    documentCode: "Document Code",
    capturedMrz: "Captured MRZ",
    passportNumber: "Passport Number",
    passportIssuerIso: "Passport Issuer ISO",
    passportDateOfExpiry: "Passport Date of Expiry",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
