import { DbConfig,loadConfig } from "@repo/config";


export const databaseConfigProvider = {
  provide : DbConfig,
  useFactory: () => loadConfig(DbConfig)
}