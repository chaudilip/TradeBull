import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { DatabaseConfig } from "../../../config/src/configs/database.config";
import { databaseConfigProvider } from "./config.provider";
import { DbConnectionOptions } from "./db-connection-option";
import { DatabaseProvider } from "./database.provider";

@Module({
  providers: [databaseConfigProvider, DbConnectionOptions, DatabaseProvider],
  exports: [DbConnectionOptions, DatabaseProvider],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DbConnectionOptions],
      useFactory: (db: DbConnectionOptions) => db.getOptions(),
    }),
  ],
})
export class DatabaseModule {}
