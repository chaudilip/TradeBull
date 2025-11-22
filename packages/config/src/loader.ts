import "reflect-metadata";
import { z } from "zod";
import { CONFIG_METADATA, ENV_METADATA, NESTED_METADATA } from "./decorators";

//Example

//   {
//     propertyKey: "host",
//     envName: "DB_HOST",
//     schema: z.string()
//   }

// const instance = new cls();

// const instance = new AppConfig();


// instance means the class instance

//@Config()
// class AppConfig {
//   @Env("PORT", z.number())
//   port!: number;

//   @Nested()
//   db!: DatabaseConfig;
// }

// You get:

// {
//   port: 3000,
//   db: {
//     host: "localhost",
//     port: 5432
//   }
// }
export function loadConfig<T>(cls: new () => T): T {
  if (!Reflect.getMetadata(CONFIG_METADATA, cls)) {
    throw new Error(`${cls.name} is not decorated with @Config`);
  }

  const instance = new cls();

  // Handle @Env variable
  const envFields = Reflect.getMetadata(ENV_METADATA, cls) || [];

  for (const field of envFields) {
    const raw = process.env[field.envName];
    let value: any =
      raw !== undefined ? raw : (instance as any)[field.propertyKey];

    if (field.schema) {
      value = field.schema.parse(value);
    }

    (instance as any)[field.propertyKey] = value;
  }

  // Handle nested configs
  const nestedFields: string[] =
    Reflect.getMetadata(NESTED_METADATA, cls) || [];

  for (const field of nestedFields) {
    const NestedClass = Reflect.getMetadata(
      "design:type",
      cls.prototype,
      field
    );
    if (!NestedClass) {
      throw new Error(
        `Unable to resolve nested config type for field "${field}". Ensure emitDecoratorMetadata is enabled.`
      );
    }

    (instance as any)[field] = loadConfig(NestedClass);
  }

  return instance;
}
