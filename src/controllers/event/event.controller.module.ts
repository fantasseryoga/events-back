import { Module } from "@nestjs/common";
import { EventServiceModule } from "src/services/event/event.service.module";
import { EventController } from "./event.controller";

@Module({
  imports: [EventServiceModule],
  controllers: [EventController],
  providers: [EventController],
})
export class EventControllerModule {}
