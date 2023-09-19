<script lang="ts">
  import { isSdkConfigured, scannedDocument } from "@/store";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();
</script>

<section id="navbar" class="relative w-full p-4 flex justify-between items-center z-10 rounded-b-xl">
  <header>
    <h1 class="text-white">Id Capture Settings</h1>
  </header>
  <button
    id="show-settings-button"
    class="text-white"
    disabled={Boolean($scannedDocument)}
    hidden={!$isSdkConfigured}
    on:click={() => navigate("/settings")}
  >
    Settings
  </button>
</section>
