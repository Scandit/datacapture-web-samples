<script lang="ts">
  import { DateResult } from "@scandit/web-datacapture-id";

  export let name: string;
  export let value: unknown;

  $: formattedValue = formatValue(value);

  function isEmpty(value: unknown): boolean {
    return value == null || value === "";
  }

  function formatValue(value: unknown): string | null {
    if (isEmpty(value)) {
      return null;
    }
    if (typeof value === "boolean") {
      return value ? "yes" : "no";
    }
    if (value instanceof DateResult) {
      if (typeof value.day === "number" && typeof value.month === "number" && typeof value.year === "number") {
        const d = new Date(value.year, value.month - 1, value.day);
        return d.toLocaleDateString();
      }
      return null;
    }
    if (Array.isArray(value)) {
      return value.map((element) => formatValue(element)).join(", ");
    }

    return value as string;
  }
</script>

<div>
  <div class="font-bold">{name}</div>
  {#if isEmpty(value) || formattedValue === null}
    <div class="text-italic">
      <i class="opacity-70">empty</i>
    </div>
  {:else}
    <div class="">{formattedValue}</div>
  {/if}
</div>
