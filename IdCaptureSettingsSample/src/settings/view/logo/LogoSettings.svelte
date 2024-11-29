<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { valueFromInput } from "@/helper";
  import { camelCaseToTitleCase } from "@/helper";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SettingsEntry from "@/settings/SettingsEntry.svelte";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { Anchor, LogoStyle } from "@scandit/web-datacapture-core";
  import { logoAnchor, logoStyle } from "./store";
</script>

<SidebarRoute backRoute="/settings/view">
  <h2 class="font-bold" slot="header">Logo</h2>

  <svelte:fragment slot="content">
    <SelectSetting
      id="logoStyle"
      value={$logoStyle}
      on:change={(e) => sdkManager.view.updateLogoStyle(valueFromInput(e))}
    >
      Style
      <svelte:fragment slot="options">
        {#each Object.values(LogoStyle) as logoStyle}
          <option value={logoStyle}>{camelCaseToTitleCase(logoStyle)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>

    <SelectSetting
      id="logoAnchor"
      value={$logoAnchor}
      on:change={(e) => sdkManager.view.updateLogoAnchor(valueFromInput(e))}
    >
      Anchor
      <svelte:fragment slot="options">
        {#each Object.values(Anchor) as anchor}
          <option value={anchor}>{camelCaseToTitleCase(anchor)}</option>
        {/each}
      </svelte:fragment>
    </SelectSetting>

    <SettingsEntry to="/settings/view/logo/offset">
      <div class="w-full flex">
        <div>Offset</div>
      </div>
    </SettingsEntry>
  </svelte:fragment>
</SidebarRoute>
