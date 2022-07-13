const path = require("path");

const fs = require("fs-extra");

const LIBRARY_LOCATION = "library";
const FILE_LIST = [
  "scenarios/split-view/index.js",
  "scenarios/fullscreen-view/index.js",
  "scenarios/modal-view/index.js",
];

function replaceScanditImport() {
  const regExp = /^import \* as Scandit from/;
  for (const file of FILE_LIST) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    for (let index = 0; index < lines.length; index++) {
      if (regExp.test(lines[index])) {
        lines[index] = `import * as Scandit from "../../${LIBRARY_LOCATION}/js/index.js";`;
        break;
      }
    }
    fs.writeFileSync(file, lines.join("\n"), "utf8");
  }
}

function copyScanditLibrary() {
  fs.copy("./node_modules/scandit-web-datacapture-barcode/build", LIBRARY_LOCATION, {
    filter: (source) => path.extname(source) !== ".html",
    dereference: true,
  });
}

replaceScanditImport();
copyScanditLibrary();
