import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./user-role";

@Entity("permission")
export class Permission {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({unique:true})
  name!: string;

  @Column({nullable:true})
  description?: string

  @ManyToMany(() => Role,(role) => role.permissions)
  roles!: Role[]
}
