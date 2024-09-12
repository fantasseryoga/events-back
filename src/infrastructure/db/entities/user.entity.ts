import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RoleEntity } from "./role.entity";
import { CityEntity } from "./city.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ type: "varchar", name: "first_name", length: 100 })
  firstName: string;

  @Column({ type: "varchar", name: "last_name", length: 100 })
  lastName: string;

  @Column({ type: "varchar", name: "email", length: 200 })
  email: string;

  @Column({ type: "integer", name: "age" })
  age: number;

  @Column({
    type: "varchar",
    length: "500",
    name: "refreshToken",
  })
  refreshToken: string;

  @Column({ type: "varchar", name: "password", length: 500 })
  password: string;

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable()
  roles: RoleEntity[];

  @ManyToOne(() => CityEntity, { eager: true })
  @JoinColumn({ name: "city_id" })
  city: CityEntity;

  @CreateDateColumn({
    type: "timestamp without time zone",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
