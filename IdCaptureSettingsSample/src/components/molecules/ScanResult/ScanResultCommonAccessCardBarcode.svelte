<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { CommonAccessCardBarcodeResult } from "scandit-web-datacapture-id/build/js/captured-id/CommonAccessCardBarcodeResult";

  type MainType = CommonAccessCardBarcodeResult;
  export let data: MainType;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    version: "Version",
    personDesignatorDocument: "Person designator document",
    personDesignatorTypeCode: "Person designator type code",
    ediPersonIdentifier: "EDI person identifier",
    personnelCategoryCode: "Personnel category code",
    branchOfService: "Branch of service",
    personnelEntitlementConditionType: "Personnel entitlement condition type",
    rank: "Rank",
    payPlanCode: "Pay plan code",
    payPlanGradeCode: "Pay plan grade code",
    cardInstanceIdentifier: "Card instance identifier",
    personMiddleInitial: "Person middle initial",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
