<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { MRZResult } from "@scandit/web-datacapture-id";

  type MainType = MRZResult;
  export let data: MainType;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    documentCode: "Document Code",
    namesAreTruncated: "Names Are Truncated",
    optional: "Optional",
    optional1: "Optional1",
    optionalDataInLine1: "Optional Data in Line 1",
    optionalDataInLine2: "Optional Data in Line 2",
    capturedMrz: "Captured Mrz",
    personalIdNumber: "Personal ID Number",
    renewalTimes: "Renewal times",
    fullNameSimplifiedChinese: "Full Name Simplified Chinese",
    omittedCharacterCountInGbkName: "Omitted Character Count In GBK Name",
    omittedNameCount: "Omitted Name Count",
    issuingAuthorityCode: "Issuing Authority Code",
    passportNumber: "Passport Number",
    passportIssuerIso: "Passport Issuer ISO",
    passportDateOfExpiry: "Passport Date of Expiry",
    firstName: "First Name",
    lastName: "Last Name",
    fullName: "Full Name",
    sex: "Sex",
    dateOfBirth: "Date of Birth",
    nationality: "Nationality",
    address: "Address",
    documentNumber: "Document Number",
    dateOfIssue: "Date of Issue",
    dateOfExpiry: "Date of Expiry"
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
