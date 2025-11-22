import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WithTimestamps } from "./abstract-entity";
import { UserRole } from "../interfaces/role";
import { User } from "./user-entity";
import { Permission } from "./permission-entity";

@Entity({
  name: "role",
})
export class Role extends WithTimestamps {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: "boolean",
    default: false,
  })
  disabled!: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];

  @ManyToMany(() => Permission, (perm) => perm.roles)
  @JoinTable({
    name: "role_permission",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
  })
  permissions!: Permission[];
}
