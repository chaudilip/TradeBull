import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user-entity";
import { WithTimestamps } from "./abstract-entity";

@Entity("api_keys")
export class ApiKey extends WithTimestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.apiKey, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "api_key", type: "varchar" })
  apiKey!: string;

  @Column({ name: "private_key", type: "text" })
  privateKey!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
