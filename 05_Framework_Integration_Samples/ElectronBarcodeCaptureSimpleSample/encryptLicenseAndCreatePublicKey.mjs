import fs from "node:fs/promises";
import chalk from "chalk";
import dotenv from "dotenv";

import { encryptText, saveKeyAndIVToEnvFile } from "./utils/index.mjs";

dotenv.config();

/**
 * Save generates the the public key
 * and the sdc-license.data file
 * @async
 * @returns {undefined}
 */
async function createLicenseAndPublicKey() {
  const license = process.env.UNIVERSAL_SAMPLE_LICENSE_KEY;

  if (license == null || license === "") {
    throw new Error("Could not encrypt empty or null string");
  }
  try {
    await fs.unlink("sdc-license.data");
    await fs.unlink(".env");
  } catch (_e) {
    // pass
  }

  const { key, iv } = await saveKeyAndIVToEnvFile(".env");

  const encrypted = encryptText(license, key, iv);
  await fs.writeFile("sdc-license.data", Buffer.from(encrypted), "utf8");

  // !!IMPORTANT save your key in another place and don't bundle it within your application
  console.log(
    chalk.red(
      "!! \n" +
        "IMPORTANT save your key to a secure location. Don't bundle it within your application unless you use bytenode plugin." +
        "Remember only main.ts and preload.ts will be compile by bytenote.\n" +
        "If possible fetch the key from a secure remote location" +
        "More info here https://electron-vite.org/guide/source-code-protection or here https://github.com/bytenode/bytenode \n" +
        "!!"
    )
  );
}

createLicenseAndPublicKey();
