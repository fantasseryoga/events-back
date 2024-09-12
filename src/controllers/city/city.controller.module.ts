import { Module } from "@nestjs/common";
import { CityController } from "./city.controller";
import { CityServiceModule } from "src/services/city/city.service.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [CityServiceModule],
  controllers: [CityController],
  providers: [CityController, JwtService],
})
export class CityControllerModule {}
