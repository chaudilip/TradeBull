import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  ColumnOptions,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  getEntityDbType,
  getJSONType,
  getDateTimeType,
} from "./db-column.helper";

import { generateNanoId } from "./generateNanoId";

// -------------------------------
// JSON Column Decorator
// -------------------------------
export function JsonColumn(
  options: Omit<ColumnOptions, "type"> = {}
): PropertyDecorator {
  return (target, propertyKey) => {
    const dbType = getEntityDbType(target);
    const type = getJSONType(dbType);
    Column({ ...options, type })(target, propertyKey);
  };
}

// -------------------------------
// DateTime Column Decorator
// -------------------------------
export function DateTimeColumn(
  options: Omit<ColumnOptions, "type"> = {}
): PropertyDecorator {
  return (target, propertyKey) => {
    const dbType = getEntityDbType(target);
    const type = getDateTimeType(dbType);
    Column({ ...options, type })(target, propertyKey);
  };
}

// -------------------------------
// Mixins
// -------------------------------
export class WithStringId {
  @PrimaryColumn("varchar")
  id!: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = generateNanoId();
  }
}

export class WithTimestamps {
  @CreateDateColumn({
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
  })
  updatedAt!: Date;

  @BeforeUpdate()
  setUpdatedDefault() {
    this.updatedAt = new Date();
  }
}

export class WithStringIdAndTimestamps extends WithTimestamps {
  @PrimaryColumn("varchar")
  id!: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = generateNanoId();
  }
}
