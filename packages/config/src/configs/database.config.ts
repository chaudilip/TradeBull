// database.config.ts     ← your current file (keep it)
import { registerAs } from "@nestjs/config";

export default registerAs("db", () => ({
  type: process.env.DB_TYPE || "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === "true",

  // you can also add these here if you want
  entities: [], // ← usually better to add later
  migrations: [],
  synchronize: false, // ← almost never true in production!
}));
