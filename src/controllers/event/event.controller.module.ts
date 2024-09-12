import { Module } from "@nestjs/common";
import { EventServiceModule } from "src/services/event/event.service.module";
import { EventController } from "./event.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [EventServiceModule],
  controllers: [EventController],
  providers: [EventController, JwtService],
})
export class EventControllerModule {}
