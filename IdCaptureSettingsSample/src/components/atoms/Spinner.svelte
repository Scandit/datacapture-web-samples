<script lang="ts">
  export let size: string = "3rem";
</script>

<div class="spinner" style={`width: ${size}; height: ${size};`} />

<style>
  .spinner {
    animation: spin 1s linear forwards infinite;
    border-radius: 50%;
    border-right: solid 4px #404040;
    @apply border-4 border-gray-100 border-gray-100 border-r-gray-600;
  }
</style>
