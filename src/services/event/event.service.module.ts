import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventService } from "./event.service";
import { EventEntity } from "src/infrastructure/db/entities/event.entity";
import { CityServiceModule } from "../city/city.service.module";
import { CityEntity } from "src/infrastructure/db/entities/city.entity";
import { CategoryEntity } from "src/infrastructure/db/entities/category.entity";
import { CategoryServiceModule } from "../category/category.service.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, CityEntity, CategoryEntity]),
    CityServiceModule,
    CategoryServiceModule,
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventServiceModule {}
