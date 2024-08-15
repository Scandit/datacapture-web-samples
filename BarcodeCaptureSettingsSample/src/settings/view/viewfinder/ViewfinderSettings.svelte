<script lang="ts">
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { ViewfinderType, viewfinderType } from "@/settings/view/viewfinder/store";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import RectangularViewfinderSettings from "@/settings/view/viewfinder/RectangularViewfinderSettings.svelte";
  import AimerViewfinderSettings from "@/settings/view/viewfinder/AimerViewfinderSettings.svelte";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Viewfinder</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <SelectSetting id="type" bind:value={$viewfinderType}>
      Type
      <svelte:fragment slot="options">
        {#each Object.values(ViewfinderType) as viewfinderType}
          <option value={viewfinderType}>{camelCaseToTitleCase(viewfinderType)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>
    {#if $viewfinderType === ViewfinderType.Rectangular}
      <RectangularViewfinderSettings />
    {:else if $viewfinderType === ViewfinderType.Aimer}
      <AimerViewfinderSettings />
    {/if}
  </svelte:fragment>
</SidebarRoute>
