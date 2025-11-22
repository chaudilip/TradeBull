import "reflect-metadata";

const DB_TYPES_METADATA_KEY = "entity:db_type";

/**
 * Save dbType on entity class
 */
export function setEntityDbType(target: any, dbType: string) {
  Reflect.defineMetadata(DB_TYPES_METADATA_KEY, dbType, target);
}

/**
 * Read dbType from entity instance
 */
export function getEntityDbType(target: any): string {
  return (
    Reflect.getMetadata(DB_TYPES_METADATA_KEY, target.constructor) ||
    "mysql"
  );
}

/**
 * JSON column type depends on DB
 */
export function getJSONType(dbType: string): "simple-json" | "json" {
  return dbType === "sqlite" ? "simple-json" : "json";
}

/**
 * DateTime column type depends on DB
 */
export function getDateTimeType(dbType: string): "datetime" | "timestamptz" {
  return dbType === "postgres" ? "timestamptz" : "datetime";
}

/**
 * Timestamp default syntax per database
 */
export function getTimestampSyntax(dbType: string) {
  const syntaxMap: Record<string, string> = {
    sqlite: "STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')",
    postgres: "CURRENT_TIMESTAMP(3)",
    mysql: "CURRENT_TIMESTAMP(3)",
    mariadb: "CURRENT_TIMESTAMP(3)",
  };

  return syntaxMap[dbType] ?? "CURRENT_TIMESTAMP(3)";
}
