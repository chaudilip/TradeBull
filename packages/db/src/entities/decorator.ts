import { setEntityDbType } from "./db-column.helper";

export function EntityFor(dbType: string): ClassDecorator {
  return (target) => setEntityDbType(target, dbType)
}
