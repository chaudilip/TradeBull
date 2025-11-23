import { Injectable } from "@nestjs/common";
import { DataSourceOptions, LoggerOptions } from "typeorm";
import { entities } from "../entities";
import path from "path";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions.js";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { TlsOptions } from "tls";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions.js";
import { DatabaseConfig, DbType } from "../../../config/src/configs/database.config";

@Injectable()
export class DbConnectionOptions {
  constructor(private readonly config: DatabaseConfig) {}

  getOptions(): DataSourceOptions {
    switch (this.config.type as DbType) {
      case "postgres":
        return this.postgres();

      case "mysql":
      case "mariadb":
        return this.mysql(this.config.type);

      case "sqlite":
        return this.sqlite();

      default:
        throw new Error(`Unsupported DB type: ${this.config.type}`);
    }
  }

  private common(): Partial<DataSourceOptions> {
    const loggingEnabled = this.config.logging.enabled;

    let logging: LoggerOptions | false = false;

    if (loggingEnabled) {
      logging =
        this.config.logging.options === "all"
          ? "all"
          : (this.config.logging.options as LoggerOptions);
    }

    return {
      entities,
      migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
      migrationsRun: true,
      synchronize: false,
      logging,
    };
  }

  private sqlite(): SqliteConnectionOptions {
    const cfg = this.config.sqlite;

    return {
      type: "sqlite",
      database: path.resolve(process.cwd(), cfg.database),
      ...this.common(),
    };
  }

  private postgres(): PostgresConnectionOptions {
    const cfg = this.config.postgres;

    let ssl: string | TlsOptions | boolean = false;

    if (cfg.ssl.enabled) {
      ssl = {
        rejectUnauthorized: cfg.ssl.rejectUnauthorized ?? true,
        ca: cfg.ssl.ca || undefined,
        cert: cfg.ssl.cert || undefined,
        key: cfg.ssl.key || undefined,
      };
    }

    return {
      type: "postgres",
      host: cfg.host,
      port: cfg.port,
      username: cfg.user,
      password: cfg.password,
      database: cfg.database,
      schema: cfg.schema,
      ssl,
      ...this.common(),
    };
  }

  private mysql(type: "mysql" | "mariadb"): MysqlConnectionOptions {
    const cfg = this.config.mysql;

    return {
      type,
      host: cfg.host,
      port: cfg.port,
      username: cfg.user,
      password: cfg.password,
      database: cfg.database,
      timezone: "Z",
      ...this.common(),
    };
  }
}