<script context="module" lang="ts">
  export type Item = string;
</script>

<script lang="ts">
  import { camelCaseToTitleCase, valueFromCheckbox } from "@/helper";
  import { createEventDispatcher } from "svelte";

  export let filterList: (input: string) => unknown;
  export let items: Item[];
  export let selectedItems: Item[];

  let input = "";
  const dispatcher = createEventDispatcher<{ change: { item: Item; checked: boolean; originalEvent: Event } }>();

  function onKeyboardEvent(event: KeyboardEvent) {
    if ((event as KeyboardEvent).key === "Escape") {
      input = "";
      filterList(input);
    }
  }

  function toggleItem(item: Item, checked: boolean, originalEvent: Event) {
    let selectedItemsUpdated = [...selectedItems];
    if (checked) {
      selectedItemsUpdated.push(item);
    } else {
      selectedItemsUpdated = selectedItemsUpdated.filter((_item) => _item !== item);
    }
    dispatcher("change", { item, checked, originalEvent });
  }
</script>

<div class="bg-white">
  <input
    placeholder="search"
    class="p-2 border border-gray-400 w-full rounded-md"
    bind:value={input}
    on:input={() => filterList(input)}
    on:keyup={onKeyboardEvent}
  />
  <ul class="list-none border border-gray-400 border-t-0 rounded-md max-h-64 overflow-auto">
    {#each items as item}
      <li class="list-none flex gap-2 px-3 py-1 hover:bg-slate-200 items-center">
        <input
          type="checkbox"
          checked={selectedItems.includes(item)}
          id={String(item)}
          on:click={(event) => toggleItem(item, valueFromCheckbox(event), event)}
        />
        <label class="flex-grow" for={String(item)}>{camelCaseToTitleCase(item)}</label>
      </li>
    {/each}
  </ul>
</div>
