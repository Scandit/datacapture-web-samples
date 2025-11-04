<script lang="ts">
  import NumberWithUnitSetting from "@/components/organisms/NumberWithUnitSetting.svelte";
  import { sdkManager } from "@/sdkManager/sdkManager";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { type MeasureUnit, PointWithUnit, NumberWithUnit } from "@scandit/web-datacapture-core";
  import { pointOfInterest } from "./store";
  import Subtitle from "@/components/atoms/Subtitle.svelte";

  function onChange(axis: keyof PointWithUnit, values: { value: number; unit: MeasureUnit }) {
    const pointValues = {
      x: {
        value: sdkManager.dataCaptureView.pointOfInterest.x.value,
        unit: sdkManager.dataCaptureView.pointOfInterest.x.unit,
      },
      y: {
        value: sdkManager.dataCaptureView.pointOfInterest.y.value,
        unit: sdkManager.dataCaptureView.pointOfInterest.y.unit,
      },
    };
    pointValues[axis] = values;
    const newPoint = new PointWithUnit(
      new NumberWithUnit(pointValues.x.value, pointValues.x.unit),
      new NumberWithUnit(pointValues.y.value, pointValues.y.unit)
    );
    sdkManager.view.updatePointOfInterest(newPoint);
  }
</script>

<SidebarRoute backRoute="/settings/view">
  <h2 slot="header" class="font-bold">Point Of Interest</h2>

  <div slot="content">
    <Subtitle>X</Subtitle>
    <NumberWithUnitSetting
      id="x"
      value={$pointOfInterest.x.value}
      unit={$pointOfInterest.x.unit}
      on:change={(e) => onChange("x", e.detail)}
    />
    <Subtitle>Y</Subtitle>
    <NumberWithUnitSetting
      id="y"
      value={$pointOfInterest.y.value}
      unit={$pointOfInterest.y.unit}
      on:change={(e) => onChange("y", e.detail)}
    />
  </div>
</SidebarRoute>
