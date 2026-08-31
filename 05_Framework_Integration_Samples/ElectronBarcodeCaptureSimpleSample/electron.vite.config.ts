import fs from "node:fs/promises";
import path from "node:path";
import { defineConfig, loadEnv } from "electron-vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// In dev mode viteStaticCopy serves files via HTTP middleware and never writes them to disk.
// The main process reads sdc-license.data via fs.readFile, so it must exist on disk.
// syncLicenseDataPlugin (main config): copies the file at build start.
// watchLicenseDataPlugin (renderer config): re-copies + reloads the renderer when the file changes.
// The reload is delayed by RENDERER_RELOAD_DELAY_MS, which must exceed the .env debounce in
// src/main/index.ts (1000ms) so the main process re-registers the IPC decryption handler with the
// new key before the renderer requests it. create-license-data writes .env before sdc-license.data,
// so the main-process timer always starts first; 1200ms here leaves a safe 200ms margin.
function syncLicenseDataPlugin(projectRoot: string) {
  return {
    name: "sync-license-data",
    async buildStart() {
      const src = path.join(projectRoot, "sdc-license.data");
      const destDir = path.join(projectRoot, "out/renderer/data");
      try {
        await fs.mkdir(destDir, { recursive: true });
        await fs.copyFile(src, path.join(destDir, "sdc-license.data"));
      } catch {
        // sdc-license.data not yet created — run create-license-data first
        console.warn("[sync-license-data] sdc-license.data not found — run 'create-license-data' first");
      }
    },
  };
}

const RENDERER_RELOAD_DELAY_MS = 1200; // must exceed the .env debounce in src/main/index.ts

function watchLicenseDataPlugin(projectRoot: string) {
  return {
    name: "watch-license-data-dev",
    apply: "serve" as const,
    configureServer(server: any) {
      const src = path.resolve(projectRoot, "sdc-license.data");
      const destDir = path.resolve(projectRoot, "out/renderer/data");
      const dest = path.join(destDir, "sdc-license.data");
      server.watcher.add(src);
      server.watcher.on("change", async (file) => {
        if (path.resolve(file) !== src) {
          return;
        }
        try {
          await fs.mkdir(destDir, { recursive: true });
          await fs.copyFile(src, dest);
          await new Promise<void>((resolve) => setTimeout(resolve, RENDERER_RELOAD_DELAY_MS));
          server.ws.send({ type: "full-reload" });
        } catch (e) {
          console.warn("[watch-license-data] failed to sync sdc-license.data:", e);
        }
      });
    },
  };
}

export default ({ mode }): ReturnType<typeof defineConfig> => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    main: {
      plugins: [syncLicenseDataPlugin(__dirname)],
      build: { externalizeDeps: true, bytecode: true },
    },
    preload: {
      build: { externalizeDeps: true, bytecode: true },
    },
    renderer: {
      server: {
        headers: {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
        },
      },
      plugins: [
        watchLicenseDataPlugin(__dirname),
        viteStaticCopy({
          targets: ["core", "barcode"]
            .map((module) => ({
              src: path.resolve(__dirname, `./node_modules/@scandit/web-datacapture-${module}/sdc-lib/**/*`),
              dest: "./library/engine",
            }))
            .concat([
              {
                src: path.resolve(__dirname, `./sdc-license.data`),
                dest: "./data",
              },
            ]),
        }),
      ],
    },
  });
};
