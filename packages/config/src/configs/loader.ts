import { Class, CONFIG_METADATA, readEnv } from "./decorators";

export function loadConfig<T>(cls: Class<T>) {
  const metadata = CONFIG_METADATA.get(cls);
  const instance = new cls();

  if (!metadata) return instance;

  for (const [propertKey, meta] of metadata.entries()) {
    const { envName, nested, schema, type } = meta;

    if (nested) {
      (instance as any)[propertKey] = loadConfig(type as Class);
      continue;
    }

    if (!envName) continue;

    const raw = readEnv(envName);
    if (raw === undefined) continue;

    let value: any = raw;

    if (schema) {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        try {
          const json = JSON.parse(value);
          const parsed2 = schema.safeParse(json);
          if (parsed2.success) value = parsed2.data;
          else continue;
        } catch {
          continue;
        }
      } else {
        value = parsed.data;
      }
    } else {
      switch (type) {
        case Number:
          value = Number(value);
          if (Number.isNaN(value)) continue;
          break;
        case Boolean:
          value = ["1", "true", "yes", "on"].includes(
            String(value).toLowerCase()
          );
          break;
        case Date:
          const ts = Date.parse(value);
          if (Number.isNaN(ts)) continue;
          value = new Date(ts);
          break;
        case String:
          value = String(value);
          break;
        default:
          value = raw;
      }
    }
     (instance as any)[propertKey] = value;
  }
  return instance;
}
