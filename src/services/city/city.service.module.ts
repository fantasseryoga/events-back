import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityEntity } from "src/infrastructure/db/entities/city.entity";
import { CityService } from "./city.service";

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService],
  exports: [CityService],
})
export class CityServiceModule {}
