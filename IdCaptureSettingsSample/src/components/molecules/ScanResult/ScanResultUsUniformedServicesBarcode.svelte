<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { USUniformedServicesBarcodeResult } from "scandit-web-datacapture-id";

  type MainType = USUniformedServicesBarcodeResult;
  export let data: MainType;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    version: "Version",
    bloodType: "Blood Type",
    branchOfService: "Branch Of Service",
    champusEffectiveDate: "Champus Effective Date",
    champusExpiryDate: "Champus Expiry Date",
    civilianHealthCareFlagCode: "Civilian Health Care Flag Code",
    civilianHealthCareFlagDescription: "Civilian Health Care Flag Description",
    commissaryFlagCode: "Commissary Flag Code",
    commissaryFlagDescription: "Commissary Flag Description",
    deersDependentSuffixCode: "Deers Dependent Suffix Code",
    deersDependentSuffixDescription: "Deers Dependent Suffix Description",
    directCareFlagCode: "Direct Care Flag Code",
    directCareFlagDescription: "Direct Care Flag Description",
    exchangeFlagCode: "Exchange Flag Code",
    exchangeFlagDescription: "Exchange Flag Description",
    eyeColor: "Eye Color",
    familySequenceNumber: "Family Sequence Number",
    formNumber: "Form Number",
    genevaConventionCategory: "Geneva Convention Category",
    hairColor: "Hair Color",
    height: "Height",
    jpegData: "Jpeg Data",
    mwrFlagCode: "Mwr Flag Code",
    mwrFlagDescription: "Mwr Flag Description",
    payGrade: "Pay Grade",
    personDesignatorDocument: "Person Designator Document",
    rank: "Rank",
    relationshipCode: "Relationship Code",
    relationshipDescription: "Relationship Description",
    securityCode: "Security Code",
    serviceCode: "Service Code",
    sponsorFlag: "Sponsor Flag",
    sponsorName: "Sponsor Name",
    sponsorPersonDesignatorIdentifier: "Sponsor Person Designator Identifier",
    statusCode: "Status Code",
    statusCodeDescription: "Status Code Description",
    weight: "Weight",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
