import { DataSource, DataSourceOptions } from "typeorm";
import { appConfigInstance } from "../app-config/app-config";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: appConfigInstance.DB_USER_NAME,
  password: appConfigInstance.DB_USER_PASSWORD,
  database: appConfigInstance.DB_NAME,
  synchronize: true,
  entities: [],
};
export const appDataSource = new DataSource(dataSourceOptions);
