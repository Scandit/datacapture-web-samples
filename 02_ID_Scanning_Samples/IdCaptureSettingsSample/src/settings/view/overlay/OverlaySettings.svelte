<script lang="ts">
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { camelCaseToTitleCase, valueFromCheckbox, valueFromInput } from "@/helper";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import {
    layoutLineStyle,
    layoutStyle,
    layoutCapturedBrush,
    BrushType,
    layoutLocalizedBrush,
    showTextHints,
  } from "@/settings/view/overlay/store";
  import { IdLayoutLineStyle, IdLayoutStyle } from "@scandit/web-datacapture-id";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
</script>

<SidebarRoute backRoute="/settings/view">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Overlay</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="bg-white">
      <SelectSetting
        id="layoutStyle"
        value={$layoutStyle}
        on:change={(e) => sdkManager.view.updateOverlayLayoutStyle(valueFromInput(e))}
      >
        Corner style
        <svelte:fragment slot="options">
          {#each Object.values(IdLayoutStyle) as style}
            <option value={style}>{camelCaseToTitleCase(style)}</option>
          {/each}
        </svelte:fragment>
      </SelectSetting>

      <SelectSetting
        id="layoutLineStyle"
        value={$layoutLineStyle}
        on:change={(e) => sdkManager.view.updateOverlayLayoutLineStyle(valueFromInput(e))}
      >
        Line style
        <svelte:fragment slot="options">
          {#each Object.values(IdLayoutLineStyle) as style}
            <option value={style}>{camelCaseToTitleCase(style)}</option>
          {/each}
        </svelte:fragment>
      </SelectSetting>

      <CheckboxSetting
        id="showTextHints"
        checked={$showTextHints}
        on:change={(e) => sdkManager.view.updateOverlayShowTextHints(valueFromCheckbox(e))}
        >Show Text Hints</CheckboxSetting
      >

      <SelectSetting
        id="capturedBrush"
        value={$layoutCapturedBrush}
        on:change={(e) => sdkManager.view.updateCapturedBrush(valueFromInput(e))}
      >
        Captured brush style
        <svelte:fragment slot="options">
          {#each Object.values(BrushType) as brush}
            <option value={brush}>{camelCaseToTitleCase(brush)}</option>
          {/each}
        </svelte:fragment>
      </SelectSetting>

      <SelectSetting
        id="localizedBrush"
        value={$layoutLocalizedBrush}
        on:change={(e) => sdkManager.view.updateLocalizedBrush(valueFromInput(e))}
      >
        Localized brush style
        <svelte:fragment slot="options">
          {#each Object.values(BrushType) as brush}
            <option value={brush}>{camelCaseToTitleCase(brush)}</option>
          {/each}
        </svelte:fragment>
      </SelectSetting>
    </div>
  </svelte:fragment>
</SidebarRoute>
