<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { SouthAfricaDlBarcodeResult } from "scandit-web-datacapture-id";

  type MainType = SouthAfricaDlBarcodeResult;
  export let data: MainType;
  data.vehicleRestrictions;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    version: "Version",
    licenseCountryOfIssue: "License Country Of Issue",
    personalIdNumber: "Personal Id Number",
    personalIdNumberType: "Personal Id Number Type",
    documentCopy: "Document Copy",
    driverRestrictionCodes: "Driver Restriction Codes",
    professionalDrivingPermit: "Professional Driving Permit",
    vehicleRestrictions: "Vehicle Restrictions",
  };
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
  {:else}
    <ResultField {name} value={data[key]} />
  {/if}
{/each}
