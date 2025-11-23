import { z } from "zod";
import { Config, Env, Nested } from "../configs/decorators";

export type DbType = "postgres" | "mysql" | "mariadb" | "sqlite";

const dbTypeSchema = z.enum(["postgres", "mysql", "mariadb", "sqlite"]);
const portSchema = z.coerce.number().int().positive();
const boolSchema = z.coerce.boolean();

class LoggingConfig {
  @Env("DB_LOGGING_ENABLED", boolSchema)
  enabled: boolean = false;

  @Env("DB_LOGGING_OPTIONS")
  options: string = "error";
}

class PostgresSSLConfig {
  @Env("DB_SSL_ENABLED", boolSchema)
  enabled: boolean = false;

  @Env("DB_SSL_REJECT_UNAUTHORIZED", boolSchema)
  rejectUnauthorized?: boolean;

  @Env("DB_SSL_CA")
  ca?: string;

  @Env("DB_SSL_CERT")
  cert?: string;

  @Env("DB_SSL_KEY")
  key?: string;
}

class PostgresConfig {
  @Env("DB_HOST")
  host: string = "localhost";

  @Env("DB_PORT", portSchema)
  port: number = 5432;

  @Env("DB_USER")
  user: string = "postgres";

  @Env("DB_PASSWORD")
  password: string = "";

  @Env("DB_DATABASE")
  database: string = "mydb";

  @Env("DB_SCHEMA")
  schema: string = "public";

  @Nested()
  ssl!: PostgresSSLConfig;
}

class MySQLConfig {
  @Env("DB_HOST")
  host: string = "localhost";

  @Env("DB_PORT", portSchema)
  port: number = 3306;

  @Env("DB_USER")
  user: string = "root";

  @Env("DB_PASSWORD")
  password: string = "";

  @Env("DB_DATABASE")
  database: string = "mydb";
}

class SqliteConfig {
  @Env("DB_DATABASE")
  database: string = "./data/database.sqlite";
}

@Config()
export class DatabaseConfig {
  @Env("DB_TYPE", dbTypeSchema)
  type: DbType = "postgres";

  @Nested()
  logging!: LoggingConfig;

  @Nested()
  postgres!: PostgresConfig;

  @Nested()
  mysql!: MySQLConfig;

  @Nested()
  sqlite!: SqliteConfig;
}
