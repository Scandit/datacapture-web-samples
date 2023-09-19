<script>
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { camelCaseToTitleCase } from "@/helpers/camelCaseToTitleCase";
  import { aimerViewfinder, AimerViewfinderColorType } from "@/settings/view/viewfinder/aimerViewfinderStore";
</script>

<SelectSetting id="aimerFrameColor" bind:value={$aimerViewfinder.frameColor}>
  Frame Color
  <svelte:fragment slot="options">
    {#each Object.values(AimerViewfinderColorType) as aimerViewfinderColorType}
      <option value={aimerViewfinderColorType}>{camelCaseToTitleCase(aimerViewfinderColorType)}</option>
    {/each}
  </svelte:fragment>
</SelectSetting>
<SelectSetting id="aimerDotColor" bind:value={$aimerViewfinder.dotColor}>
  Dot Color
  <svelte:fragment slot="options">
    {#each Object.values(AimerViewfinderColorType) as aimerViewfinderColorType}
      <option value={aimerViewfinderColorType}>{camelCaseToTitleCase(aimerViewfinderColorType)}</option>
    {/each}
  </svelte:fragment>
</SelectSetting>
