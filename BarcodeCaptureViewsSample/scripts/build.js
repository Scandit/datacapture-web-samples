import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

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
    content = content.replaceAll("AWHjFzlFHa+fLq/kfS8GCBU/hT60NkQeVGQOWhhtRVcDZxJfsD0OY9NK0YErLuxTtTKLC1BLdrvDdsJ1dnxmcx9fDIeeaQlxawtkiq1pmEFxHOvYa3emcbAfOeiwbFPtQEWCWvdc95KoIFxAuDiYcfccdywzH2KONgwmnV9cEcX11FhIPLtX74RLua7VkOukFfNTOGExxhiCq96qZnzGgrgViuagpL0ekK6xv8K4bYt7lVkxloUMM6dFRSZ4aummJ2Q1uZNR78kSGCpCn/uJjaf/5lyNbYWpnxYvsYRPI7jOFYZykI0nIjhjt/ncukCEsz4BQLAh5hp1qocvQ2+dw3ADD8LJLXcnX7JaCOKV5cfHEHGSLR4moTxNtxPXdUNlM5w75iHZub5BsIfkJCknKrLn5oJ15k5Rx4/JnFj11tGLqtfRs+jdtXSGxAb86BxwPM1mEBO/Va1yV//CGku5UWR5MwspCf7pl8OUH7frkCtV4kDB6y5jusSMSIEGnKCLd2sWKE04mAURrpWt8pgsIB89xXPPTgPh1C+nAeMuuEN3dPYAJYrJKvy44w130JrUvxWLcTM1oFVWikC6CluLC7WGgRhZCew0eROnv9neITolB6Gmy04dlF0euA595dJcw2lLTwwxEydGp5gGIIDtofviho7JdHtPrMer/Ptz1/LOVeF55OY9eg8z1Lq2CkZf6cgWZBPa1uakuZzxWXZUprJMdTquhInmqP4ELLxGXhv+CXoT2n0p022+wyiWAXatmhvcK+n2uCWX30SL0Sri1qPmf6Ldtgqj2aFEMLM+LouJg6Ukv0PKUTXlgPW7L0vYrNGtPjvRlaR7Nwph", license);
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
