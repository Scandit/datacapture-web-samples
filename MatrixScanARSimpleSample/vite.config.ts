import dotenv from "dotenv";
import type { IncomingMessage, OutgoingMessage } from "node:http";
import { type Plugin, type ResolvedConfig, defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
  let config: ResolvedConfig;

  return {
    name: "vite-plugin-scandit",
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    transform(code: string) {
      const shouldReplaceLicenseKey = config.mode === "development" || !process.env.SKIP_LICENSE_KEY_REPLACEMENT;
      if (shouldReplaceLicenseKey) {
        return {
          code: code.replace(options.licenseKeyPlaceholder, options.licenseKey),
        };
      }
      return null;
    },
    transformIndexHtml(html: string) {
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
        assetFileNames: "[name].[extname]",
        chunkFileNames: "[name].js",
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
