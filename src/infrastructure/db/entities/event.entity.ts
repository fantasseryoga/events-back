import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { CategoryEntity } from "./category.entity";
import { CityEntity } from "./city.entity";
import { UserEntity } from "./user.entity";

@Entity("event")
export class EventEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({
    type: "varchar",
    length: 200,
    name: "title",
  })
  title: string;

  @Column({
    type: "varchar",
    length: 2000,
    name: "description",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    length: 200,
    name: "address",
  })
  address: string;

  @Column({
    type: "timestamp",
    name: "event_date",
  })
  eventDate: Date;

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

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "creator_id" })
  creator: UserEntity;

  @ManyToMany(() => CategoryEntity, { eager: true })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToOne(() => CityEntity, { eager: true })
  @JoinColumn({ name: "city_id" })
  city: CityEntity;
}
