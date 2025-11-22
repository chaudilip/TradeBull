import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WithTimestamps } from "./abstract-entity";
import { lowerCaser } from "../utils/transformer";
import { Role } from "./user-role";
import { ApiKey } from "./api-key.entity";

@Entity("user")
export class User extends WithTimestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    length: 254,
    nullable: true,
    transformer: lowerCaser,
  })
  @Index({ unique: true })
  email!: string;

  @Column({
    length: 32,
    nullable: true,
  })
  userName!: string;

  @Column({
    type: String,
    nullable: true,
  })
  password!: string;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  disabled!: boolean;

  @Column({
    type: "date",
    nullable: true,
  })
  lastActiveAt?: Date | null;

  @Column({
    type: "boolean",
    default: false,
  })
  mfaEnabled!: boolean;

  @Column({
    type: String,
    nullable: true,
  })
  mfaSecret?: string | null;

  @Column({
    type: "simple-array",
    default: "",
  })
  mfaRecoveryCodes!: string[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles!: Role[];

  @OneToOne(() => ApiKey, (apikey) => apikey.user)
  apiKey!: ApiKey;
}
