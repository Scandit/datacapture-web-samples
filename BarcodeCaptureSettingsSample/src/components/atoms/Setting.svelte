<script lang="ts">
  export let id: string = "";
</script>

<label for={id} class="flex justify-between items-center bg-white p-4 py-6 rounded">
  <slot />
  <slot name="input" />
</label>
