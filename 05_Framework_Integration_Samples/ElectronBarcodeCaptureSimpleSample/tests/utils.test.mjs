import test from "node:test";

import { saveKeyAndIVToEnvFile, readKeyAndIVFromEnvFile, encryptText, decryptText } from "../utils/index.mjs";
import fs from "node:fs";
import path from "node:path";

import { assert } from "node:console";

test("should correctly encrypt decrypt a large text", async () => {
  const largeString = Array(2200).fill("A").join("");
  const base64String = Buffer.from(largeString).toString("base64");
  const testFile = path.join(new URL(".", import.meta.url).pathname, ".envfile");

  const { key, iv } = await saveKeyAndIVToEnvFile(testFile, "TEST_KEY");
  const encrypted = encryptText(base64String, key, iv);
  const storedKey = await readKeyAndIVFromEnvFile(testFile, "TEST_KEY");
  const decrypted = decryptText(encrypted.toString("utf8"), storedKey.key, storedKey.iv);
  assert(base64String, decrypted);
  fs.unlinkSync(testFile);
});
