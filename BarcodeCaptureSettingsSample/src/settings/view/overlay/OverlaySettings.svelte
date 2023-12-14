<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { BrushType, brushType } from "@/settings/view/overlay/store";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Overlay</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="bg-white">
      <h3 class="px-4 font-bold">Style</h3>
      <SelectSetting id="brushType" bind:value={$brushType}>
        Brush
        <svelte:fragment slot="options">
          {#each Object.values(BrushType) as brushType}
            <option value={brushType}>{camelCaseToTitleCase(brushType)}</option>
          {/each}
        </svelte:fragment>
      </SelectSetting>
    </div>
  </svelte:fragment>
</SidebarRoute>
