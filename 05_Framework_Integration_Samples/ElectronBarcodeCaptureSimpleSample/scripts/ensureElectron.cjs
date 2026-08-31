/**
 * Ensures the Electron binary is downloaded and path.txt is written.
 *
 * electron@36's install.js fires an un-awaited async download — on some CI runners
 * the process exits before the download completes. This script downloads the
 * binary via @electron/get and extracts it with the system unzip (because
 * extract-zip's Promise never resolves under Node.js v24 when loaded via
 * createRequire from the pnpm virtual store).
 */
"use strict";

const path = require("path");
const fs = require("fs");
const os = require("os");
const { execFileSync } = require("child_process");
const { createRequire } = require("module");

(async () => {
  // Resolve the real path to the electron package (follows pnpm symlinks)
  const electronPkgJson = require.resolve("electron/package.json");
  const electronDir = path.dirname(electronPkgJson);
  const { version } = require(electronPkgJson);

  // Resolve @electron/get from electron's own dep scope in the pnpm virtual store
  const electronRequire = createRequire(electronPkgJson);
  const { downloadArtifact } = electronRequire("@electron/get");

  const platformPath =
    os.platform() === "darwin"
      ? "Electron.app/Contents/MacOS/Electron"
      : os.platform() === "win32"
        ? "electron.exe"
        : "electron";

  const pathTxtFile = path.join(electronDir, "path.txt");
  const distDir = path.join(electronDir, "dist");
  const binaryFile = path.join(distDir, platformPath);

  console.log("[ensure-electron] electronDir:", electronDir);
  console.log("[ensure-electron] version:", version);
  console.log("[ensure-electron] platform:", os.platform(), "arch:", os.arch());
  console.log("[ensure-electron] binary exists:", fs.existsSync(binaryFile));

  if (fs.existsSync(binaryFile)) {
    console.log("[ensure-electron] binary already present, writing path.txt");
    fs.writeFileSync(pathTxtFile, platformPath);
    return;
  }

  console.log("[ensure-electron] binary missing — downloading electron", version, "...");

  fs.mkdirSync(distDir, { recursive: true });

  const zipPath = await downloadArtifact({
    version,
    artifactName: "electron",
    platform: os.platform(),
    arch: os.arch(),
  });

  console.log("[ensure-electron] downloaded zip:", zipPath);
  console.log("[ensure-electron] extracting with system unzip...");

  execFileSync("unzip", ["-q", "-o", zipPath, "-d", distDir]);

  console.log("[ensure-electron] extracted to:", distDir);
  console.log("[ensure-electron] binary now exists:", fs.existsSync(binaryFile));

  if (!fs.existsSync(binaryFile)) {
    throw new Error(`Binary not found after extraction: ${binaryFile}`);
  }

  fs.writeFileSync(pathTxtFile, platformPath);
  console.log("[ensure-electron] wrote path.txt:", platformPath);
})().catch((err) => {
  console.error("[ensure-electron] FATAL:", err.message || err);
  process.exit(1);
});
