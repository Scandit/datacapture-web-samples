<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { CapturedId } from "scandit-web-datacapture-id";

  type MainType = CapturedId;
  export let data: MainType;

  const fieldNameByKey = {
    firstName: "First Name",
    lastName: "Last Name",
    fullName: "Full Name",
    sex: "Sex",
    dateOfBirth: "Date of Birth",
    age: "Age",
    nationality: "Nationality",
    address: "Address",
    documentType: "Document Type",
    issuingCountryIso: "Issuing Country ISO",
    issuingCountry: "Issuing Country",
    documentNumber: "Document Number",
    dateOfExpiry: "Date of Expiry",
    isExpired: "Is Expired",
    dateOfIssue: "Date of Issue",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
