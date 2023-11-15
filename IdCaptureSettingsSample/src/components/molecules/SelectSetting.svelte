<script lang="ts">
  import Setting from "@/components/atoms/Setting.svelte";

  export let id: string = "";
  export let value: string | number | boolean | any = "";
  export let disabled: boolean = false;
</script>

<Setting {id}>
  <slot />
  <select slot="input" class="w-fit min-w-0 truncate border border-gray-200 p-2" {id} bind:value on:change {disabled}>
    <slot name="options" />
  </select>
</Setting>
