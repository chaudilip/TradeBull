import "reflect-metadata";
import { ZodTypeAny } from "zod";

export const CONFIG_METADATA = Symbol("config:root");
export const ENV_METADATA = Symbol("config:env");
export const NESTED_METADATA = Symbol("config:nested");

/* -------------------------------------------------------------------------- */
/*                                @Config()                                   */
/* -------------------------------------------------------------------------- */
export function Config(): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(CONFIG_METADATA, true, target);
  };
}

/* -------------------------------------------------------------------------- */
/*                                @Env()                                      */
/* -------------------------------------------------------------------------- */
export function Env(envName: string, schema?: ZodTypeAny) {
  return (target: any, propertyKey: string) => {
    const existing =
      Reflect.getMetadata(ENV_METADATA, target.constructor) || [];

    existing.push({
      propertyKey,
      envName,
      schema,
    });

    Reflect.defineMetadata(ENV_METADATA, existing, target.constructor);
  };
}

/* -------------------------------------------------------------------------- */
/*                                @Nested()                                   */
/* -------------------------------------------------------------------------- */
export function Nested() {
  return (target: any, propertyKey: string) => {
    const existing =
      Reflect.getMetadata(NESTED_METADATA, target.constructor) || [];

    existing.push(propertyKey);

    Reflect.defineMetadata(NESTED_METADATA, existing, target.constructor);
  };
}
