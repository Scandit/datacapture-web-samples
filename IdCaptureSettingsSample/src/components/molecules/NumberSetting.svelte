<script lang="ts">
  import Setting from "@/components/atoms/Setting.svelte";

  export let id: string = "";
  export let min: string = "";
  export let max: string = "";
  export let step: string = "";
  export let value: number = 0;
</script>

<Setting {id}>
  <slot />
  <input slot="input" type="number" class="w-4/12 text-right" {id} {min} {max} {step} bind:value on:change />
</Setting>
