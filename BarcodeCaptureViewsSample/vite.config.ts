import dotenv from "dotenv";
import fs from "node:fs/promises";
import { ConfigEnv, Plugin, PreviewServerForHook, ViteDevServer, defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

dotenv.config();

interface VitePluginScanditOptions {
  licenseKey: string;
  licenseKeyPlaceholder: string;
}

function scandit(options: VitePluginScanditOptions): Plugin {
  let config: ConfigEnv;

  function setupServer(server: ViteDevServer | PreviewServerForHook): void {
    server.config.preview.port = 8888;
    server.config.server.port = 8888;
    server.middlewares.use((_req, res, next) => {
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      next();
    });
  }

  return {
    name: "vite-plugin-scandit",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transform(code) {
      const shouldReplaceLicenseKey = config.command === "serve" || !process.env.SKIP_LICENSE_KEY_REPLACEMENT;
      if (shouldReplaceLicenseKey) {
        return {
          code: code.replace(options.licenseKeyPlaceholder, options.licenseKey),
        };
      }
    },
    async closeBundle() {
      if (config.command === "build") {
        for (const scenario of ["scenarios/fullscreen-view", "scenarios/modal-view", "scenarios/split-view"]) {
          let indexHtml = await fs.readFile(`./dist/${scenario}/index.html`, "utf8");
          indexHtml = indexHtml.replace(
            `<script type="module" crossorigin src="../../${scenario}/index.js"></script>`,
            `<script data-id="scandit-main" type="module" crossorigin src="../../${scenario}/index.js"></script>`
          );
          await fs.writeFile(`./dist/${scenario}/index.html`, indexHtml, "utf8");
        }
      }
    },
    configureServer: setupServer,
    configurePreviewServer: setupServer,
  };
}

export default defineConfig({
  base: "./",
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "./index.html",
        "fullscreen-view": "./scenarios/fullscreen-view/index.html",
        "modal-view": "./scenarios/modal-view/index.html",
        "split-view": "./scenarios/split-view/index.html",
      },
      output: {
        entryFileNames: (chunk) => `scenarios/${chunk.name}/index.js`,
      },
    },
  },
  envPrefix: "SCANDIT",
  plugins: [
    viteStaticCopy({
      targets: ["core", "barcode"].map((module) => ({
        src: `./node_modules/scandit-web-datacapture-${module}/build/engine/*`,
        dest: "./library/engine",
      })),
    }),
    scandit({
      licenseKey: process.env.SCANDIT_LICENSE_KEY ?? "",
      licenseKeyPlaceholder: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    }),
  ],
});
