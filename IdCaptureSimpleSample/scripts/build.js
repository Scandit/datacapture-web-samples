import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const LIBRARY_LOCATION = "./library";

async function copyScanditLibrary(moduleName) {
  fs.copySync(`./node_modules/${moduleName}/build/engine/`, path.join(LIBRARY_LOCATION, "engine"));
}

async function replaceLicenseKey(path, license) {
  if (typeof license === "string") {
    let content = await fs.promises.readFile(path, "utf8");
    content = content.replaceAll("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", license);
    await fs.writeFile(path, content, "utf8");
  }
}

await esbuild.build({
  bundle: true,
  minify: false,
  sourcemap: true,
  outdir: ".",
  format: "esm",
  target: ["chrome61", "firefox60", "safari11", "edge79"],
  entryPoints: {
    index: "./index.ts",
  },
});

copyScanditLibrary("scandit-web-datacapture-core");
copyScanditLibrary("scandit-web-datacapture-id");
replaceLicenseKey("./index.js", process.env.SCANDIT_LICENSE_KEY);
