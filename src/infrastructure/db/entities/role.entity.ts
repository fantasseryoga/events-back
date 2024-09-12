import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role")
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ type: "varchar", nullable: false, name: "name", length: 50 })
  name: string;
}
