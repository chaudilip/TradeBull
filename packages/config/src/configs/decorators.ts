import "reflect-metadata";
import { z } from "zod";

export type Class<T = any> = new (...args: any[]) => T;

export const CONFIG_METADATA = new Map<
  any,
  Map<
    string,
    {
      envName?: string;
      type?: any;
      schema?: z.ZodTypeAny;
      nested?: boolean;
    }
  >
>();

export function Config(): ClassDecorator {
  return (target) => {
    CONFIG_METADATA.set(target, new Map());
  };
}

export function Env(envName: string, schema?: z.ZodTypeAny): PropertyDecorator {
  return (target, propertyKey) => {
    const cls = target.constructor;
    const map = CONFIG_METADATA.get(cls)!;
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    map.set(propertyKey as string, { envName, type, schema });
  };
}

export function Nested(type: Class<any>): PropertyDecorator {
  return (target, propertyKey) => {
    const cls = target.constructor;
    const map = CONFIG_METADATA.get(cls)!;
    map.set(propertyKey as string, { nested: true, type });
  };
}

export function readEnv(name: string): string | undefined {
  return process.env[name] ?? undefined;
}
