/* eslint-disable unicorn/no-process-exit */
/* eslint-disable security/detect-non-literal-fs-filename */
// eslint-disable-next-line security/detect-child-process
const { exec } = require("child_process");
const path = require("path");

const fs = require("fs-extra");

const INDEX_FILENAME = "index.js";
const UI_FILENAME = "ui.js";

const LIBRARY_LOCATION = "./library";

function tscCompile() {
  return new Promise((resolve, reject) => {
    exec("npx tsc", (error, stdOut, stdError) => {
      if (error) {
        reject(stdOut != null ? stdOut : stdError);
      }
      resolve(stdOut);
    });
  });
}

function replaceScanditImport(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const regExp = /^import \* as Scandit from/;
  for (let index = 0; index < lines.length; index++) {
    if (regExp.test(lines[index])) {
      lines[index] = `import * as Scandit from "${LIBRARY_LOCATION}/js/index.js";`;
      break;
    }
  }
  fs.writeFileSync(file, lines.join("\n"), "utf8");
}

function copyScanditLibrary() {
  fs.copy("./node_modules/scandit-web-datacapture-barcode/build", LIBRARY_LOCATION, {
    filter: (source) => path.extname(source) !== ".html",
    dereference: true,
  });
}

(async function run() {
  try {
    await tscCompile();
    replaceScanditImport(INDEX_FILENAME);
    replaceScanditImport(UI_FILENAME);
    copyScanditLibrary();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
})();
