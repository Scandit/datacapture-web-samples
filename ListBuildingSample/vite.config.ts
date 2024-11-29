import dotenv from "dotenv";
import { ConfigEnv, Plugin, defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import type { IncomingMessage, OutgoingMessage } from "node:http";

dotenv.config();

interface VitePluginScanditOptions {
  licenseKey: string;
  licenseKeyPlaceholder: string;
}

function crossOriginIsolationMiddleware(_: IncomingMessage, response: OutgoingMessage, next: VoidFunction) {
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
}

function scandit(options: VitePluginScanditOptions): Plugin {
  let config: ConfigEnv;

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
    transformIndexHtml(html) {
      return html.replace(
        '<script type="module" crossorigin src="./index.js"></script>',
        '<script data-id="scandit-main" type="module" crossorigin src="./index.js"></script>'
      );
    },
    configureServer: (server) => {
      server.middlewares.use(crossOriginIsolationMiddleware);
    },
    configurePreviewServer: (server) => {
      server.middlewares.use(crossOriginIsolationMiddleware);
    },
  };
}

export default defineConfig({
  server: {
    port: 8888,
  },
  base: "./",
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "[name].[ext]",
        chunkFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
      },
    },
  },
  envPrefix: "SCANDIT",
  plugins: [
    viteStaticCopy({
      targets: ["core", "barcode"].map((module) => ({
        src: `./node_modules/@scandit/web-datacapture-${module}/sdc-lib/*`,
        dest: "./library/engine",
      })),
    }),
    scandit({
      licenseKey: process.env.SCANDIT_LICENSE_KEY ?? "",
      licenseKeyPlaceholder: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
    }),
  ],
});
