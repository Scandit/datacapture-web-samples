<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import { range } from "@/helpers/range";
  import CheckboxSetting from "@/components/molecules/CheckboxSetting.svelte";
  import { useParams } from "svelte-navigator";
  import type { Symbology } from "@scandit/web-datacapture-barcode";
  import { useSymbologyStore } from "@/settings/barcode-capture/symbologies/symbology/store";
  import SelectSetting from "@/components/molecules/SelectSetting.svelte";
  import { onMount } from "svelte";

  const params = useParams<{ symbology: Symbology }>();
  const {
    activeSymbolCountMaximum,
    activeSymbolCountMinimum,
    description,
    enabledChecksums,
    enabledExtensions,
    isColorInverted,
    isEnabled,
    isStoreSetup,
    setupSymbologyStore,
    supportedChecksums,
  } = useSymbologyStore($params.symbology);

  onMount(() => {
    if (!$isStoreSetup) {
      setupSymbologyStore();
    }
  });
</script>

<SidebarRoute backRoute="/settings/barcode-capture/symbologies">
  <svelte:fragment slot="header">
    <h2 class="font-bold">{$description?.readableName}</h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <section class="flex flex-col">
      <section class="flex flex-col">
        <CheckboxSetting id="enabled" bind:checked={$isEnabled}>Enabled</CheckboxSetting>
        {#if $description.isColorInvertible}
          <CheckboxSetting id="colorInverted" bind:checked={$isColorInverted}>Color Inverted</CheckboxSetting>
        {/if}
      </section>
      {#if !$description.activeSymbolCountRange.isFixed}
        <section class="flex flex-col bg-white">
          <h3 class="px-4 font-bold">Range</h3>
          <SelectSetting id="minimum" bind:value={$activeSymbolCountMinimum}>
            Minimum
            <svelte:fragment slot="options">
              {#each range($description.activeSymbolCountRange.minimum, $activeSymbolCountMaximum, $description.activeSymbolCountRange.step) as symbol}
                <option value={symbol}>{symbol}</option>
              {/each}
            </svelte:fragment>
          </SelectSetting>
          <SelectSetting id="maximum" bind:value={$activeSymbolCountMaximum}>
            Maximum
            <svelte:fragment slot="options">
              {#each range($activeSymbolCountMinimum, $description.activeSymbolCountRange.maximum, $description.activeSymbolCountRange.step) as symbol}
                <option value={symbol}>{symbol}</option>
              {/each}
            </svelte:fragment>
          </SelectSetting>
        </section>
      {/if}
      {#if $description.supportedExtensions.length > 0}
        <section class="flex flex-col bg-white">
          <h3 class="px-4 font-bold">Extensions</h3>
          {#each $description.supportedExtensions as supportedExtension}
            <CheckboxSetting
              id={supportedExtension}
              checked={$enabledExtensions.has(supportedExtension)}
              on:input={(event) => {
                if (event.detail) {
                  $enabledExtensions.add(supportedExtension);
                } else {
                  $enabledExtensions.delete(supportedExtension);
                }
                $enabledExtensions = $enabledExtensions;
              }}
            >
              {supportedExtension}
            </CheckboxSetting>
          {/each}
        </section>
      {/if}
      {#if $supportedChecksums.length > 0}
        <section class="flex flex-col bg-white">
          <h3 class="px-4 font-bold">Checksums</h3>
          {#each $supportedChecksums as supportedChecksum}
            <CheckboxSetting
              id={supportedChecksum}
              checked={$enabledChecksums.has(supportedChecksum)}
              on:input={(event) => {
                if (event.detail) {
                  $enabledChecksums.add(supportedChecksum);
                } else {
                  $enabledChecksums.delete(supportedChecksum);
                }
                $enabledChecksums = $enabledChecksums;
              }}
            >
              {supportedChecksum}
            </CheckboxSetting>
          {/each}
        </section>
      {/if}
    </section>
  </svelte:fragment>
</SidebarRoute>
