import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({
    type: "varchar",
    length: 500,
    name: "name",
    nullable: false,
  })
  name: string;
}
