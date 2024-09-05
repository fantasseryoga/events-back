import { Module } from "@nestjs/common";
import { CityController } from "./city.controller";
import { CityServiceModule } from "src/services/city/city.service.module";

@Module({
  imports: [CityServiceModule],
  controllers: [CityController],
  providers: [CityController],
})
export class CityControllerModule {}
