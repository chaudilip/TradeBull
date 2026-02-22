import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { entities } from "../entities";

@Injectable()
export class DbConnectionOptions {
  constructor(private readonly config: ConfigService) {}

  getOptions(): TypeOrmModuleOptions {
    const type = this.config.get<"postgres" | "mysql" | "sqlite">("db.type");

    if (type === "postgres") return this.postgres();
    if (type === "mysql") return this.mysql();
    if (type === "sqlite") return this.sqlite();

    throw new Error(`Unsupported DB type: ${type}`);
  }

  private postgres(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.config.get("db.host"),
      port: this.config.get<number>("db.port"),
      username: this.config.get("db.username"),
      password: this.config.get("db.password"),
      database: this.config.get("db.database"),
      entities,
      synchronize: false,
      logging: this.config.get("db.logging"),
    };
  }

  private mysql(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.config.get("db.host"),
      port: this.config.get<number>("db.port"),
      username: this.config.get("db.username"),
      password: this.config.get("db.password"),
      database: this.config.get("db.database"),
      entities,
      synchronize: false,
      logging: this.config.get("db.logging"),
    };
  }

  private sqlite(): TypeOrmModuleOptions {
    return {
      type: "sqlite",
      database: this.config.get("db.database"),
      entities,
      synchronize: false,
      logging: this.config.get("db.logging"),
    };
  }
}
