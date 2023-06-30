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
    content = content.replaceAll("AQIzpSC5AyYeKA6KZgjthjEmMbJBFJEpiUUjkCJu72AUVSWyGjN0xNt0OVgASxKO6FwLejYDRFGraFReiUwL8wp3a8mgX0elHhmx0JhY/QYrbQHJjGIhQAhjcW1cYr+ogWCDUmhM2KuWPlJXBkSGmbwinMAqKusC5zQHGoY6JDKJXbzv97CRhGdjlfgjhTZErgfs+P/fLp0cCCAmP+TTZ6jiyA/my9Ojy7ugt7DKay2ZAkezAO8OwAtnl0GUIflPz6KI68hRPaAV18wwS030+riqfDIcFQ+3BAfqRMpJxrYfKZOvvwyTAbC+5ZzgFmwd9YR0vbFToSmHDemEyRVufdMw0s+jqCHsCY5ox8jBfV1RkmDQxCckkJoS3rhPmLgEyiTm+gI0y30swn2orZ4aaml+aoA55vhN4jY+ZAkMkmhipAXK/TMzyHo4iUDA4/v3TgiJbodw27iI/+f6YxIpA+/nAEItRH7C3vuxAdo8lmk5q0QeCkc6QA0FhQa6S/cu8yrehTi+Lb8khFmt3gkwEubowGdg3cg8KoBsDgY59lAKWy55rmVznq7REv6ugw1KwgW724K4s5ILfgQ2NcV/jFgeTReaTSVYUWKZGXdJmDrteX7tgmdfkpjaCrijgSGwYRaATxVKitCYIPyfuipsSHdC0iLqCoJ8CIc2UclvimPXDzDLk83uIRFjgspykVm+eIsKiMuxrW6OlB7o7NWPcJtEcyO74Mq6scB8+bWP5eJFIPazUcZEtxG2u3UpWz7+EoBADwbUI9G63HcTwt2bi8JZo16pfGxsWti3DJ1HWooGSIVvyZ2jePvhBcuu+EbtOucgdPDvDTCTpm/V", license);
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
copyScanditLibrary("scandit-web-datacapture-barcode");
replaceLicenseKey("./index.js", process.env.SCANDIT_LICENSE_KEY);
