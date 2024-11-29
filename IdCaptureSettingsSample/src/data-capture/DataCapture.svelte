<script lang="ts">
  import { sdkManager } from "@/sdkManager/sdkManager";
  import { onMount } from "svelte";

  onMount(async () => {
    await sdkManager.configure(
      import.meta.env.SCANDIT_LICENSE_KEY ?? "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
      document.getElementById("data-capture-view")!
    );
    await sdkManager.init();
  });
</script>

<main class="relative h-full">
  <div id="data-capture-view" />
</main>

<style>
  #data-capture-view {
    position: absolute;
    inset: 0;
  }

  @supports (-webkit-touch-callout: none) {
    #data-capture-view {
      height: -webkit-fill-available;
    }
  }
</style>
