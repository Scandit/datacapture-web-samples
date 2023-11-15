<script lang="ts">
  export let id: string = "";
</script>

<label for={id} class="flex justify-between items-center gap-4 bg-white p-4">
  <slot />
  <slot name="input" />
</label>
