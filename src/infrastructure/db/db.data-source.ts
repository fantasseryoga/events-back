import { DataSource, DataSourceOptions } from "typeorm";
import { appConfigInstance } from "../app-config/app-config";
import { CategoryEntity } from "./entities/category.entity";
import { UserEntity } from "./entities/user.entity";
import { CityEntity } from "./entities/city.entity";
import { RoleEntity } from "./entities/role.entity";
import { EventEntity } from "./entities/event.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: appConfigInstance.DB_USER_NAME,
  password: appConfigInstance.DB_USER_PASSWORD,
  database: appConfigInstance.DB_NAME,
  synchronize: true,
  entities: [CategoryEntity, UserEntity, CityEntity, RoleEntity, EventEntity],
};
export const appDataSource = new DataSource(dataSourceOptions);
