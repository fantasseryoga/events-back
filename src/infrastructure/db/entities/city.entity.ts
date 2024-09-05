import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("city")
export class CityEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({
    type: "varchar",
    length: 500,
    name: "name",
  })
  name: string;
}
