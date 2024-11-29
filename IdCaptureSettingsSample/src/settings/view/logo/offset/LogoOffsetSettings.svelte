<script lang="ts">
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { MeasureUnit, NumberWithUnit, PointWithUnit } from "@scandit/web-datacapture-core";
  import { logoOffset } from "./../store";
  import Subtitle from "@/components/atoms/Subtitle.svelte";

  function onOffsetChange(axis: keyof PointWithUnit, values: { value: number; unit: MeasureUnit }) {
    const pointValues = {
      x: {
        value: sdkManager.dataCaptureView.logoOffset.x.value,
        unit: sdkManager.dataCaptureView.logoOffset.x.unit,
      },
      y: {
        value: sdkManager.dataCaptureView.logoOffset.y.value,
        unit: sdkManager.dataCaptureView.logoOffset.y.unit,
      },
    };
    pointValues[axis] = values;
    const newPoint = new PointWithUnit(
      new NumberWithUnit(pointValues.x.value, pointValues.x.unit),
      new NumberWithUnit(pointValues.y.value, pointValues.y.unit)
    );
    sdkManager.view.updateLogoOffset(newPoint);
  }
</script>

<SidebarRoute backRoute="/settings/view/logo">
  <h2 class="font-bold" slot="header">Logo offset</h2>

  <svelte:fragment slot="content">
    <Subtitle>X</Subtitle>
    <NumberWithUnitSetting
      id="x"
      value={$logoOffset.x.value}
      unit={$logoOffset.x.unit}
      on:change={(e) => onOffsetChange("x", e.detail)}
    />
    <Subtitle>Y</Subtitle>
    <NumberWithUnitSetting
      id="y"
      value={$logoOffset.y.value}
      unit={$logoOffset.y.unit}
      on:change={(e) => onOffsetChange("y", e.detail)}
    />
  </svelte:fragment>
</SidebarRoute>
