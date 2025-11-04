<script lang="ts">
  import Subtitle from "@/components/atoms/Subtitle.svelte";
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { scanAreaMargins } from "@/settings/view/scan-area/store";
  import type { MarginsWithUnit, NumberWithUnit } from "@scandit/web-datacapture-core";

  function onChange(marginSide: keyof MarginsWithUnit, numberWithUnit: Pick<NumberWithUnit, "unit" | "value">) {
    sdkManager.view.updateScanArea(marginSide, numberWithUnit);
  }
</script>

<SidebarRoute backRoute="/settings/view">
  <h2 slot="header" class="font-bold">Scan Area margins</h2>

  <div slot="content">
    <Subtitle>Left</Subtitle>
    <NumberWithUnitSetting
      id="marginLeft"
      value={$scanAreaMargins.left.value}
      unit={$scanAreaMargins.left.unit}
      on:change={(e) => onChange("left", e.detail)}
    />
    <Subtitle>Top</Subtitle>
    <NumberWithUnitSetting
      id="marginTop"
      value={$scanAreaMargins.top.value}
      unit={$scanAreaMargins.top.unit}
      on:change={(e) => onChange("top", e.detail)}
    />
    <Subtitle>Right</Subtitle>
    <NumberWithUnitSetting
      id="marginRight"
      value={$scanAreaMargins.right.value}
      unit={$scanAreaMargins.right.unit}
      on:change={(e) => onChange("right", e.detail)}
    />
    <Subtitle>Bottom</Subtitle>
    <NumberWithUnitSetting
      id="marginBottom"
      value={$scanAreaMargins.bottom.value}
      unit={$scanAreaMargins.bottom.unit}
      on:change={(e) => onChange("bottom", e.detail)}
    />
  </div>
</SidebarRoute>
