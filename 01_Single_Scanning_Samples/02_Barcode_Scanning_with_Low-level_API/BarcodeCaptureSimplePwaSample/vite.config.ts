import dotenv from "dotenv";
import { ConfigEnv, Plugin, PluginOption, PreviewServer, ViteDevServer, defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";
import manifest from "./manifest_icons_template.json";

dotenv.config();

interface VitePluginScanditOptions {
  licenseKey: string;
  licenseKeyPlaceholder: string;
}

function crossOriginIsolatedDevServer(): PluginOption {
  return {
    name: "vite-plugin-scandit",
    configureServer: (server: ViteDevServer) => {
      server.config.preview.port = 4137;
      server.config.server.port = 4137;
      server.middlewares.use((_req: any, res: any, next: any) => {
        res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        next();
      });
    },
    configurePreviewServer: (server: PreviewServer) => {
      server.middlewares.use((_req: any, res: any, next: any) => {
        res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        next();
      });
    },
  };
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
  };
}

const createPwaOptions = ({ mode }: { mode: string }): Partial<VitePWAOptions> => {
  return {
    devOptions: {
      enabled: mode !== "production",
    },
    // Chrome 64 compatibility: inline service worker registration
    injectRegister: "inline",
    workbox: {
      globPatterns: ["**/*.{css,html,ico,png,svg,woff2}", "**/*.{wasm,js}"],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // up to 10mb because of wasm files
      // Don't ignore version parameters - let each version have its own cache entry
      runtimeCaching: [
        {
          urlPattern: /^.*\.wasm(\?.*)?$/,
          handler: "NetworkFirst",
          options: {
            cacheName: "wasm-version-cache",
            expiration: {
              maxEntries: 2, // Keep only 2 versions to manage storage
              maxAgeSeconds: 60 * 60 * 24 * 2, // 2 days
            },
            // This ensures the version parameter is part of the cache key
            matchOptions: {
              ignoreSearch: false, // Don't ignore search parameters (like ?v=)
            },
            networkTimeoutSeconds: 5, // Fallback to cache if network is slow
          },
        },
        {
          // Cache all other assets with NetworkFirst
          urlPattern: /^.*\.(js|css|html|png|jpg|jpeg|svg|ico|woff2)(\?.*)?$/,
          handler: "NetworkFirst",
          options: {
            cacheName: "app-assets-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
            },
            matchOptions: {
              ignoreSearch: false,
            },
            networkTimeoutSeconds: 3, // Fallback to cache if network is slow
          },
        },
      ],
      cleanupOutdatedCaches: true,
      // Skip waiting to activate new service worker immediately
      skipWaiting: true,
      clientsClaim: true,
    },
    manifest: {
      name: "Barcode Capture Simple PWA Sample",
      short_name: "Barcode Capture Simple PWA Sample",
      description:
        "Enterprise barcode scanning performance in your browser via JavaScript and WebAssembly. Use cameras and let users easily scan barcodes in your web app.",
      theme_color: "#000000",
      icons: manifest.icons,
      orientation: "any",
      display: "standalone",
      scope: "/",
      start_url: "/?utm_source=web_app_manifest",
    },
    registerType: "autoUpdate",
  };
};

export default defineConfig(({ mode }) => {
  return {
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
      crossOriginIsolatedDevServer(),
      ...(mode === "development" ? [] : [VitePWA(createPwaOptions({ mode }))]),
      viteStaticCopy({
        targets: ["core", "barcode"]
          .map((module) => ({
            src: `./node_modules/@scandit/web-datacapture-${module}/sdc-lib/*`,
            dest: "./library/engine",
          }))
          .concat([{ src: "./assets/pwa/*", dest: "./pwa" }]),
      }),
      scandit({
        licenseKey: process.env.SCANDIT_LICENSE_KEY ?? "",
        licenseKeyPlaceholder: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
      }),
    ],
  };
});
