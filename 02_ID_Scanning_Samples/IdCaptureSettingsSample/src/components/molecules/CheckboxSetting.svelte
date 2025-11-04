<script lang="ts">
  import Setting from "@/components/atoms/Setting.svelte";

  export let id: string = "";
  export let disabled: boolean = false;
  export let checked: boolean = false;
</script>

<Setting {id}>
  <slot />
  <div
    slot="input"
    class="relative w-16 h-8 cursor-pointer"
    class:opacity-50={disabled}
    class:pointer-events-none={disabled}
  >
    <input
      type="checkbox"
      class="absolute top-2/4 left-2/4 w-min transform -translate-x-2/4 -translate-y-2/4 opacity-0"
      {id}
      {disabled}
      bind:checked
      on:change
    />
    <div class="absolute w-16 h-8 bg-gray-200 rounded-3xl transition" class:bg-green-400={checked} />
    <div
      class="absolute w-8 h-8 bg-white border border-gray-300 rounded-full transform transition"
      class:translate-x-full={checked}
      class:border-green-400={checked}
    />
  </div>
</Setting>
