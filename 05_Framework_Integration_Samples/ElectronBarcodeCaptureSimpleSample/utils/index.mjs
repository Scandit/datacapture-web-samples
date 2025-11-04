import dotenv from "dotenv";
import crypto from "node:crypto";
import fs from "node:fs/promises";

export async function saveKeyAndIVToEnvFile(filepath = ".env", envKey = "MAIN_VITE_PUBLIC_KEY") {
  const key = crypto.randomBytes(32); // Generate a random key
  const iv = crypto.randomBytes(16); // Generate a random IV
  const keyAndIV = `${key.toString("base64")}:${iv.toString("base64")}`;
  await fs.writeFile(filepath, `${envKey}=${JSON.stringify(keyAndIV)}`);
  console.log("Key and IV saved to file:", filepath);
  return { key, iv };
}

export function encryptText(text, key, iv) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedText = cipher.update(text, "utf8", "hex");
  encryptedText += cipher.final("hex");
  return encryptedText;
}

export async function readKeyAndIVFromEnvFile(filepath = ".env", envKey = "MAIN_VITE_PUBLIC_KEY") {
  const envConfig = dotenv.parse(await fs.readFile(filepath));
  const [key, iv] = envConfig[envKey].split(":");
  console.log("Key and IV read from file:", filepath);
  return { key: Buffer.from(key, "base64"), iv: Buffer.from(iv, "base64") };
}

export function decryptText(encryptedText, key, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedText = decipher.update(encryptedText, "hex", "utf8");
  decryptedText += decipher.final("utf8");
  return decryptedText;
}
