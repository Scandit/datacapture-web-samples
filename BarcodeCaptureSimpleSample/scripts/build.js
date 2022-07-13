const path = require("path");

const fs = require("fs-extra");

const file = "index.js";

const LIBRARY_LOCATION = "./library";

function replaceScanditImport() {
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

replaceScanditImport();
copyScanditLibrary();
