<script lang="ts">
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { enabledCompositeTypes } from "@/settings/barcode-capture/composite-types/store";
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { CompositeType } from "@scandit/web-datacapture-barcode";

  function onCompositeTypeToggle(compositeType: CompositeType) {
    return (event: CustomEvent<boolean>) => {
      if (event.detail) {
        $enabledCompositeTypes.add(compositeType);
      } else {
        $enabledCompositeTypes.delete(compositeType);
      }
      $enabledCompositeTypes = $enabledCompositeTypes;
    };
  }
</script>

<SidebarRoute backRoute="/settings/barcode-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold">Composite Types</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#each Object.values(CompositeType) as compositeType}
      <CheckboxSetting
        id={compositeType}
        checked={$enabledCompositeTypes.has(compositeType)}
        on:input={onCompositeTypeToggle(compositeType)}
      >
        {compositeType}
      </CheckboxSetting>
    {/each}
  </svelte:fragment>
</SidebarRoute>
