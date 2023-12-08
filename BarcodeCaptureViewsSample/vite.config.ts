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
      licenseKeyPlaceholder: "AW7z5wVbIbJtEL1x2i7B3/cet/ClBNVHZTfPtvJ2n3L/LY6/FDbqtzYItFO0DmhIJ2JP1Vxu7po1f74HqF9UTtRB/1DHY+CJdTiq/6dQ8vFgd9rzwlVfSYFgWPp9fK5nVUmnHyt9W5oRMcXObjYeC7Q/FO0NA0yRHUEtt/aBpnv/AxYTKG8wyVNqZKMJn+bhz/CFbH5pjtdj2aE85TlPGfQK4sBP/K2ONcx2ndbmY82SOquLlcZ55uAFuj4yCuQEI6iuokblpDVsql+vDiw3XMOmqwbmuGnAuCtGbtjyyWyQCKeiKWtZzdy+Cz7NnW/yRdwKY1xBjkaMA+A+NWeBxp9O2Ou6dBCPsRPg0Nqfv92sbv050dQc/+xccvEXWSi8UnD+AQoKp5V3gR/Yae/5+4fII9X3Tqjf/aNvXDw3m7YDQ+b+IJnkzLN5EgwGnzUmI8z3qMx9xcqhkWwBE/SSuIP47tBp5xwz02kN6qb+vZc/1p5EUQ/VtGVBfD1e+5Dii56BHsfPId/JpKpGUX1FFAYuT1uEbf7xLREDtFobn05tDxYPLrCa0hciRwCdWxHbUnYR1BF3zQQHih5Dd5qGyA5yKsgCsg7Na+9gC8O6hxpWlB4SbIFMEDluvJ+0v0ww5nnP2PWAO7v4k+Sgn7cQa7gDhQNee+pfuDvUlprUufio+dUmOUYNbn2TVwRVATmPx4U+p8Acg+Ohj85bSwPk+cNoq3Te6N0Ts5JnwrjCvVq6yrfbqyGFbgIhJiSxtgiZOfMZu8KoCvBfIUFE2A5WlNNaMZmQAtPozR31iX/Z2LuCIBhkFXGdd9CW/YPKhs8m25jlbOKnl0DWiBnM",
    }),
  ],
});
