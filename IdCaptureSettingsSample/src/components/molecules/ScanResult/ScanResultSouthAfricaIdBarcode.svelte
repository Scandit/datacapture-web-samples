<script lang="ts">
  import ResultField from "@/components/atoms/ResultField.svelte";
  import type { SouthAfricaIdBarcodeResult } from "scandit-web-datacapture-id";

  type MainType = SouthAfricaIdBarcodeResult;
  export let data: MainType;

  const fieldNameByKey: Record<Exclude<keyof MainType, "toJSONObject">, string> = {
    countryOfBirth: "Country Of Birth",
    countryOfBirthIso: "Country Of Birth ISO",
    citizenshipStatus: "Citizenship Status",
    personalIdNumber: "Personal Id Number",
  };
</script>

{#each Object.entries(fieldNameByKey) as [key, name]}
  <ResultField {name} value={data[key]} />
{/each}
