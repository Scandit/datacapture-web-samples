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

<main>
  <div id="data-capture-view" />
</main>

<style>
  #data-capture-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  @supports (-webkit-touch-callout: none) {
    #data-capture-view {
      height: -webkit-fill-available;
    }
  }
</style>
