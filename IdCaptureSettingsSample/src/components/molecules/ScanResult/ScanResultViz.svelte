<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { VIZResult } from "@scandit/web-datacapture-id";

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
    firstName: "VIZ First Name",
    fullName: "VIZ Full Name",
    lastName: "VIZ Last Name",
    secondaryLastName: "VIZ Secondary Last Name",
    mothersName: "Mother's Name",
    fathersName: "Father's Name",
    drivingLicenseDetails: "Driving License Details",
    bloodType: "Blood Type",
    sponsor: "Sponsor",
    visaNumber: "Visa Number",
    passportNumber: "Passport Number",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  {#if key === "drivingLicenseDetails" && data[key] != null}
    {#if data.drivingLicenseDetails != null}
      {#each data.drivingLicenseDetails.drivingLicenseCategories as category, index}
        <ResultField name={`Driving License Details ${index + 1} -  code`} value={category.code} />
        <ResultField name={`Driving License Details ${index + 1} -  date of issue`} value={category.dateOfIssue} />
        <ResultField name={`Driving License Details ${index + 1} -  date of expiry`} value={category.dateOfExpiry} />
      {/each}

      <ResultField name={`Driving License Details - Restrictions`} value={data.drivingLicenseDetails.restrictions} />
      <ResultField name={`Driving License Details - Endorsements`} value={data.drivingLicenseDetails.endorsements} />
    {/if}
  {:else}
    <ResultField {name} value={data[key]} />
  {/if}
{/each}
