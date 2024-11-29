<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { BarcodeResult } from "@scandit/web-datacapture-id";

  type MainType = BarcodeResult;
  export let data: MainType;

  const fieldNameByKey = {
    aamvaVersion: "AAMVA Version",
    aliasFamilyName: "Alias Family Name",
    aliasGivenName: "Alias Given Name",
    aliasSuffixName: "Alias Suffix Name",
    bloodType: "Blood Type",
    branchOfService: "Branch Of Service",
    cardInstanceIdentifier: "Card Instance Identifier",
    cardRevisionDate: "Card Revision Date",
    categories: "Categories",
    champusEffectiveDate: "Champus Effective Date",
    champusExpiryDate: "Champus Expiry Date",
    citizenshipStatus: "Citizenship Status",
    civilianHealthCareFlagCode: "Civilian Health Care Flag Code",
    civilianHealthCareFlagDescription: "Civilian Health Care Flag Description",
    commissaryFlagCode: "Commissary Flag Code",
    commissaryFlagDescription: "Commissary Flag Description",
    countryOfBirth: "Country Of Birth",
    countryOfBirthIso: "Country Of Birth Iso",
    deersDependentSuffixCode: "Deers Dependent Suffix Code",
    deersDependentSuffixDescription: "Deers Dependent Suffix Description",
    directCareFlagCode: "Direct Care Flag Code",
    directCareFlagDescription: "Direct Care Flag Description",
    documentCopy: "Document Copy",
    documentDiscriminatorNumber: "Document Discriminator Number",
    driverNamePrefix: "Driver Name Prefix",
    driverNameSuffix: "Driver Name Suffix",
    driverRestrictionCodes: "Driver Restriction Codes",
    ediPersonIdentifier: "Edi Person Identifier",
    endorsementsCode: "Endorsements Code",
    exchangeFlagCode: "Exchange Flag Code",
    exchangeFlagDescription: "Exchange Flag Description",
    eyeColor: "Eye Color",
    familySequenceNumber: "Family Sequence Number",
    firstNameTruncation: "First Name Truncation",
    firstNameWithoutMiddleName: "First Name Without Middle Name",
    formNumber: "Form Number",
    genevaConventionCategory: "Geneva Convention Category",
    hairColor: "Hair Color",
    heightCm: "Height Cm",
    heightInch: "Height Inch",
    IIN: "Iin",
    identificationType: "Identification Type",
    issuingJurisdiction: "Issuing Jurisdiction",
    issuingJurisdictionIso: "Issuing Jurisdiction Iso",
    jpegData: "Jpeg Data",
    jurisdictionVersion: "Jurisdiction Version",
    lastNameTruncation: "Last Name Truncation",
    licenseCountryOfIssue: "License Country Of Issue",
    middleName: "Middle Name",
    middleNameTruncation: "Middle Name Truncation",
    mwrFlagCode: "Mwr Flag Code",
    mwrFlagDescription: "Mwr Flag Description",
    payGrade: "Pay Grade",
    payPlanCode: "Pay Plan Code",
    payPlanGradeCode: "Pay Plan Grade Code",
    personDesignatorDocument: "Person Designator Document",
    personDesignatorTypeCode: "Person Designator Type Code",
    personMiddleInitial: "Person Middle Initial",
    personalIdNumber: "Personal Id Number",
    personalIdNumberType: "Personal Id Number Type",
    personnelCategoryCode: "Personnel Category Code",
    personnelEntitlementConditionType: "Personnel Entitlement Condition Type",
    placeOfBirth: "Place Of Birth",
    professionalDrivingPermit: "Professional Driving Permit",
    race: "Race",
    rank: "Rank",
    relationshipCode: "Relationship Code",
    relationshipDescription: "Relationship Description",
    restrictionsCode: "Restrictions Code",
    securityCode: "Security Code",
    serviceCode: "Service Code",
    sponsorFlag: "Sponsor Flag",
    sponsorName: "Sponsor Name",
    sponsorPersonDesignatorIdentifier: "Sponsor Person Designator Identifier",
    statusCode: "Status Code",
    statusCodeDescription: "Status Code Description",
    vehicleClass: "Vehicle Class",
    vehicleRestrictions: "Vehicle Restrictions",
    version: "Version",
    weightKg: "Weight Kg",
    weightLbs: "Weight Lbs",
    isRealId: "Is Real Id",
    barcodeDataElements: "Barcode Data Elements",
    barcodeMetadata: "Barcode Metadata",
  } satisfies Partial<Record<keyof MainType, string>>;
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  {#if key === "professionalDrivingPermit" && data[key] != null}
    <ResultField
      name="Professional Driving Permit - date of expiry"
      value={data.professionalDrivingPermit?.["dateOfExpiry"]}
    />
    <ResultField name="Professional Driving Permit - codes" value={data.professionalDrivingPermit?.["codes"]} />
  {:else if key === "vehicleRestrictions"}
    {#each data.vehicleRestrictions as restriction, index}
      <ResultField name={`Vehicle Restrictions ${index + 1} -  date of issue`} value={restriction.dateOfIssue} />
      <ResultField name={`Vehicle Restrictions ${index + 1} -  vehicle code`} value={restriction.vehicleCode} />
      <ResultField name={`Vehicle Restrictions ${index + 1} -  restriction`} value={restriction.vehicleRestriction} />
    {/each}
  {:else if key === "barcodeDataElements" && data[key] != null}
    {#if data.barcodeDataElements != null}
      <div class="font-bold">{name}</div>
      {#each Object.entries(data.barcodeDataElements) as [title, content]}
        <ResultField name={`${title}: `} value={content} />
      {/each}
    {/if}
  {:else if key === "barcodeMetadata" && data[key] != null}
    <div class="font-bold">{name}</div>
    <ResultField name="Error Correction Level" value={data.barcodeMetadata?.["errorCorrection"]} />
    <ResultField name="Module Count X" value={data.barcodeMetadata?.["moduleCountX"]} />
    <ResultField name="Module Count Y" value={data.barcodeMetadata?.["moduleCountY"]} />
  {:else}
    <ResultField {name} value={data[key]} />
  {/if}
{/each}
