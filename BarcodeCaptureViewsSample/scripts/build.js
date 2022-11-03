import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";

const LIBRARY_LOCATION = "./library";
const FILE_LIST = [
  "scenarios/split-view/index.ts",
  "scenarios/fullscreen-view/index.ts",
  "scenarios/modal-view/index.ts",
];

async function copyScanditLibrary(moduleName) {
  fs.copySync(`./node_modules/${moduleName}/build/engine/`, path.join(LIBRARY_LOCATION, "engine"));
}

async function replaceLicenseKey(path, license) {
  if (typeof license === "string") {
    let content = await fs.promises.readFile(path, "utf8");
    content = content.replaceAll("YOUR_LICENSE_KEY_HERE", license);
    await fs.writeFile(path, content, "utf8");
  }
}

for (const file of FILE_LIST) {
  await esbuild.build({
    bundle: true,
    minify: false,
    sourcemap: true,
    outdir: ".",
    format: "esm",
    target: ["chrome61", "firefox60", "safari11", "edge79"],
    entryPoints: {
      [file.replace(".ts", "")]: `./${file}`,
    },
  });
}

copyScanditLibrary("scandit-web-datacapture-core");
copyScanditLibrary("scandit-web-datacapture-barcode");
replaceLicenseKey("./scenarios/split-view/index.js", process.env.SCANDIT_LICENSE_KEY);
replaceLicenseKey("./scenarios/fullscreen-view/index.js", process.env.SCANDIT_LICENSE_KEY);
replaceLicenseKey("./scenarios/modal-view/index.js", process.env.SCANDIT_LICENSE_KEY);
