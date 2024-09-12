import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityEntity } from "src/infrastructure/db/entities/city.entity";
import { CityService } from "./city.service";
import { RoleServiceModule } from "../role/role.service.module";

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), RoleServiceModule],
  providers: [CityService],
  exports: [CityService],
})
export class CityServiceModule {}
