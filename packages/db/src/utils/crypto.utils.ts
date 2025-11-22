import * as crypto from "crypto";
import * as bcrypt from "bcrypt";

const ENC_SECRET = Buffer.from(process.env.PRIVATE_KEY_ENC_SECRET!, "hex");

// Generate Api Key
export function generateApiKey(): string {
  return "api_tb_" + crypto.randomBytes(32).toString("hex");
}

// Generate Hash Api Key
export async function hashApiKey(apiKey: string): Promise<string> {
  return bcrypt.hash(apiKey, 12);
}

// Generate Private Key
export function encryptPrivateKey(privateKey: string): string {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", ENC_SECRET, iv);

  let encrypted = cipher.update(privateKey, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  // Format: iv:encrypted:authTag
  return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}

// Decrypt Private key
export function decryptPrivateKey(encrypted: string): string {
  const [ivHex, data, authTagHex] = encrypted.split(":");

  if (!ivHex || !data || !authTagHex) {
    throw new Error("Invalid encrypted private key format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", ENC_SECRET, iv);

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
