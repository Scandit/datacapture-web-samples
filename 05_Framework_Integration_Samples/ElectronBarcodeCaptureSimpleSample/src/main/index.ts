import crypto from "node:crypto";
import { watch as fsWatch } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { register, unregister } from "@scandit/web-datacapture-core/build/electron/main";
import { app, BrowserWindow, ipcMain, shell, systemPreferences } from "electron";
import { isE2E_TESTS } from "../../env";
import icon from "../../resources/icon.png?asset";
import { startServer } from "./productionServer";
import { isRemoteDebuggingEnabled } from "./utils";

async function createWindow(): Promise<void> {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      autoplayPolicy: "no-user-gesture-required",
      sandbox: false, // needed from bytenode https://electron-vite.org/guide/source-code-protection#enable-bytecode-to-protect-your-electron-source-code
      preload: path.join(__dirname, "../preload/index.js"),
      devTools: isE2E_TESTS() ? true : !app.isPackaged,
    },
  });

  /**
   * !! Important !!
   * Please store this key somewhere safe or obfuscate the code with bytenode.
   * remember that bytenode will compile only a preload script and main script
   * If possible to fetch the public key from a secure remote location under authentication.
   * https://electron-vite.org/guide/source-code-protection or https://github.com/bytenode/bytenode
   * */
  let publicKey = import.meta.env.MAIN_VITE_PUBLIC_KEY;
  if (publicKey == null) {
    throw new Error("MAIN_VITE_PUBLIC_KEY not injected");
  }

  register({ fs, ipcMain, app, path, crypto }, publicKey);

  // In dev mode, watch .env so running create-license-data while the server is up
  // rotates the decryption key without requiring a full restart.
  if (is.dev) {
    const envFile = path.join(process.cwd(), ".env");
    let keyTimer: ReturnType<typeof setTimeout> | null = null;
    try {
      fsWatch(envFile, () => {
        if (keyTimer) {
          clearTimeout(keyTimer);
        }
        keyTimer = setTimeout(() => {
          fs.readFile(envFile, "utf8")
            .then((content) => {
              const m = /MAIN_VITE_PUBLIC_KEY="([^"]+)"/.exec(content);
              const newKey = m?.[1];
              if (newKey && newKey !== publicKey) {
                publicKey = newKey;
                unregister();
                register({ fs, ipcMain, app, path, crypto }, newKey);
              }
            })
            .catch((e) => {
              // .env may be mid-write when the watcher fires; the next change event will retry.
              console.warn("[key-rotation] failed to read .env:", e);
            });
        }, 1000);
      });
    } catch (e) {
      console.warn("[key-rotation] fs.watch failed — restart to pick up new keys:", e);
    }
  }

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools({ mode: "right" });
  } else {
    // for e2e testing
    if (!isE2E_TESTS()) {
      mainWindow.webContents.on("devtools-opened", () => {
        mainWindow.webContents.closeDevTools();
      });
      // Consider avoid remote debugging when in production for safety reasons
      if (isRemoteDebuggingEnabled() && app.isPackaged) {
        app.quit();
      }
    }

    // using a small express server in production. listen to the first free available port
    const port = startServer(path.join(app.getAppPath(), "out/renderer"));

    await systemPreferences.askForMediaAccess("microphone");
    await systemPreferences.askForMediaAccess("camera");

    mainWindow.loadURL(`http://localhost:${port}/index.html`);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.scandit.electron-barcode-capture-simple-sample");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  app.on("activate", () => {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    unregister();
  }
});

// In this file, you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
