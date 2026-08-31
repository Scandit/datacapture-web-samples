import { preloadBindings } from "@scandit/web-datacapture-core/build/electron/preload";
import { ipcRenderer } from "electron";

preloadBindings(ipcRenderer);
