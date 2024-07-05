<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { VIZResult } from "scandit-web-datacapture-id";

  type MainType = VIZResult;
  export let data: MainType;

  const fieldNameByKey: Record<
    Exclude<keyof MainType, "toJSONObject" | "capturedSides" | "isBackSideCaptureSupported">,
    string
  > = {
    additionalAddressInformation: "Additional Address Information",
    additionalNameInformation: "Additional Name Information",
    documentAdditionalNumber: "Document Additional Number",
    employer: "Employer",
    issuingAuthority: "Issuing Authority",
    issuingJurisdiction: "Issuing Jurisdiction",
    issuingJurisdictionIso: "Issuing Jurisdiction ISO",
    maritalStatus: "Marital Status",
    personalIdNumber: "Personal Id Number",
    placeOfBirth: "Place Of Birth",
    profession: "Profession",
    race: "Race",
    religion: "Religion",
    residentialStatus: "Residential Status",
    mothersName: "Mother's Name",
    fathersName: "Father's Name",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
