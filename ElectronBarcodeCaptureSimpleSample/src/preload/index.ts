import { ipcRenderer } from 'electron'

import { preloadBindings } from '@scandit/web-datacapture-core/build/electron/preload'

preloadBindings(ipcRenderer)
