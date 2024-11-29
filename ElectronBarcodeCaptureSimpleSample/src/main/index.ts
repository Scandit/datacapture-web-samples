import { app, shell, BrowserWindow, ipcMain, systemPreferences } from 'electron'
import path from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { startServer } from './productionServer'

import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import { register, unregister } from '@scandit/web-datacapture-core/build/electron/main'
import { isRemoteDebuggingEnabled } from './utils'

import { isCI } from '../../isCI.js'

async function createWindow(): Promise<void> {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      autoplayPolicy: 'no-user-gesture-required',
      sandbox: false, // needed from bytenode https://electron-vite.org/guide/source-code-protection#enable-bytecode-to-protect-your-electron-source-code
      preload: path.join(__dirname, '../preload/index.js'),
      devTools: isCI() ? true : !app.isPackaged
    }
  })

  /**
   * !! Important !!
   * Please store this key somewhere safe or obfuscate the code with bytenode.
   * remember that bytenode will compile only a preload script and main script
   * If possible to fetch the public key from a secure remote location under authentication.
   * https://electron-vite.org/guide/source-code-protection or https://github.com/bytenode/bytenode
   * */
  const publicKey = import.meta.env.MAIN_VITE_PUBLIC_KEY
  if (publicKey == null) {
    throw new Error('MAIN_VITE_PUBLIC_KEY not injected')
  }

  register({ fs, ipcMain, app, path, crypto }, publicKey)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools({ mode: 'right' })
  } else {
    // for e2e testing
    if (!isCI()) {
      mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.webContents.closeDevTools()
      })
      // Consider avoid remote debugging when in production for safety reasons
      if (isRemoteDebuggingEnabled() && app.isPackaged) {
        app.quit()
      }
    }

    // using a small express server in production. listen to the first free available port
    const port = startServer(path.join(app.getAppPath(), 'out/renderer'))

    await systemPreferences.askForMediaAccess('microphone')
    await systemPreferences.askForMediaAccess('camera')

    mainWindow.loadURL(`http://localhost:${port}/index.html`)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.scandit.electron-barcode-capture-simple-sample')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    unregister()
  }
})

// In this file, you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
