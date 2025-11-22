import { DataSourceOptions } from "typeorm";
import * as entities from "../entities";
import * as migrations from "../migerations";

export class DbConnectionOptionsBuilder {
  constructor(private env: NodeJS.ProcessEnv = process.env) {}

  private getCommonOptions() {
    return {
      entities,
      migrations,
      synchronized: false,
      logging: this.env.DB_LOGGING === "true",
    };
  }

  private getTLSOptions() {
    const enabled = this.env.DB_SSL === "true";

    if (!enabled) return false;

    return {
      ca: this.env.DB_SSL_CA || undefined,
      cert: this.env.DB_SSL_CERT || undefined,
      key: this.env.DB_SSL_KEY || undefined,
      rejectUnauthorized:
        this.env.DB_SSL_REJECT_UNAUTHORIZED === "false" ? false : true,
    };
  }

  private getPostgresOptions(): DataSourceOptions {
    return {
      type: "postgres",
      host: this.env.DB_HOST,
      port: Number(this.env.DB_PORT),
      username: this.env.DB_USER,
      password: this.env.DB_PASS,
      database: this.env.DB_NAME,
      ssl: this.getTLSOptions(),
      ...this.getCommonOptions(),
      extra: {
        max: Number(this.env.DB_POOL_SIZE || 10),
      },
    };
  }

  private getMySqlOptions(): DataSourceOptions {
    return {
      type: "mysql",
      host: this.env.DB_HOST,
      port: Number(this.env.DB_PORT),
      username: this.env.DB_USER,
      password: this.env.DB_PASS,
      database: this.env.DB_NAME,
      ...this.getCommonOptions(),
      extra: {
        connectionLimit: Number(this.env.DB_POOL_SIZE || 10),
      },
    };
  }

//   private getSqliteOptions(): DataSourceOptions {
//     return {
//       type: "sqlite",
//       database: path.resolve(process.cwd(), this.env.DB_SQLITE_PATH!),
//       ...this.getCommonOptions(),
//     };
//   }
}
