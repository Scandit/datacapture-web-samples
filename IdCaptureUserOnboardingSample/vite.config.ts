import dotenv from "dotenv";
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
    // server.middlewares.use((_req, res, next) => {
    //   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    //   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    //   next();
    // });
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
    transformIndexHtml(html) {
      return html.replace(
        '<script type="module" crossorigin src="./index.js"></script>',
        '<script data-id="scandit-main" type="module" crossorigin src="./index.js"></script>'
      );
    },
    configureServer: setupServer,
    configurePreviewServer: setupServer,
  };
}

export default defineConfig({
  base: "./",
  publicDir: "vite_public",
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
      targets: ["core", "id"].map((module) => ({
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
