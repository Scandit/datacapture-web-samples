<script lang="ts">
  import Setting from "@/components/atoms/Setting.svelte";

  export let id: string = "";
  export let value: string | number | boolean = "";
</script>

<Setting {id}>
  <slot />
  <select slot="input" class="w-4/12 truncate bg-gray-100 " {id} bind:value>
    <slot name="options" />
  </select>
</Setting>
