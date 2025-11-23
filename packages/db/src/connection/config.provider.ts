import { DatabaseConfig } from "../../../config/src/configs/database.config";
import { loadConfig } from "../../../config/src";

export const databaseConfigProvider = {
  provide: DatabaseConfig,
  useFactory: () => loadConfig(DatabaseConfig),
};
