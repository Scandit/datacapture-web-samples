<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { AAMVABarcodeResult } from "scandit-web-datacapture-id";

  type MainType = AAMVABarcodeResult;
  export let data: MainType;

  const fieldNameByKey = {
    aamvaVersion: "AAMVA Version",
    isRealId: "Is Real ID",
    aliasFamilyName: "Alias Family Name",
    aliasGivenName: "Alias Given Name",
    aliasSuffixName: "Alias Suffix Name",
    driverNamePrefix: "Driver Name Prefix",
    driverNameSuffix: "Driver Name Suffix",
    endorsementsCode: "Endorsements Code",
    eyeColor: "Eye Color",
    firstNameTruncation: "First Name Truncation",
    hairColor: "Hair Color",
    heightCm: "Height CM",
    heightInch: "Height Inch",
    IIN: "IIN",
    issuingJurisdiction: "Issuing Jurisdiction",
    issuingJurisdictionIso: "Issuing Jurisdiction ISO",
    jurisdictionVersion: "Jurisdiction Version",
    lastNameTruncation: "Last Name Truncation",
    middleName: "Middle Name",
    middleNameTruncation: "Middle Name Truncation",
    placeOfBirth: "Place Of Birth",
    race: "Race",
    restrictionsCode: "Restrictions Code",
    vehicleClass: "Vehicle Class",
    weightKg: "Weight Kg",
    weightLbs: "Weight Lbs",
    cardRevisionDate: "Card Revision Date",
    documentDiscriminatorNumber: "Document Discriminator Number",
    barcodeDataElements: "Barcode Data Elements",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
