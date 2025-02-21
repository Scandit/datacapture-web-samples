<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { RegionSpecific, CapturedId } from "@scandit/web-datacapture-id";

  type MainType = CapturedId;
  export let data: MainType;

  const fieldNameByKey = {
    firstName: "First Name",
    lastName: "Last Name",
    secondaryLastName: "Secondary Last Name",
    fullName: "Full Name",
    sex: "Sex",
    dateOfBirth: "Date of Birth",
    age: "Age",
    nationality: "Nationality",
    address: "Address",
    issuingCountryIso: "Issuing Country ISO",
    issuingCountry: "Issuing Country",
    documentNumber: "Document Number",
    documentAdditionalNumber: "Document Additional Number",
    dateOfExpiry: "Date of Expiry",
    isExpired: "Is Expired",
    dateOfIssue: "Date of Issue",
    usRealIdStatus: "Is US Real ID",
  } satisfies Partial<Record<keyof MainType, string>>;

  const documentAsRegionSpecific = data.document as RegionSpecific | undefined;
</script>

<ResultField name="Document type" value={data.document?.documentType ?? "unknown"} />
{#if data.document?.isRegionSpecific()}
  <ResultField name="Document subtype" value={documentAsRegionSpecific?.subtype} />
{/if}
{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
