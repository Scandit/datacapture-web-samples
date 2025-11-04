/// <reference types="svelte" />
/// <reference types="vite/client" />
import type * as SDCCore from "@scandit/web-datacapture-core";
import type * as SDCId from "@scandit/web-datacapture-id";

declare module "*.svelte" {
  import type { ComponentType } from "svelte";
  const component: ComponentType;
  export default component;
}
