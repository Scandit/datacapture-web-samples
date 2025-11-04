<script lang="ts">
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { FeedbackType } from "./FeedbackType";
  import { idCapturedFeedbackStore, idRejectedFeedbackStore } from "./store";
  import { valueFromInput } from "@/helper";
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">ID Capture Feedbacks</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting
      id="idCapturedFeedback"
      bind:value={$idCapturedFeedbackStore}
      on:change={(e) => sdkManager.idCapture.setIdCapturedFeedback(valueFromInput(e))}
    >
      ID captured feedback
      <svelte:fragment slot="options">
        {#each Object.values(FeedbackType) as type}
          <option value={type}>{type}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    <SelectSetting
      id="IdRejectedFeedback"
      bind:value={$idRejectedFeedbackStore}
      on:change={(e) => sdkManager.idCapture.setIdRejectedFeedback(valueFromInput(e))}
    >
      ID rejected feedback
      <svelte:fragment slot="options">
        {#each Object.values(FeedbackType) as type}
          <option value={type}>{type}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
  </svelte:fragment>
</SidebarRoute>
