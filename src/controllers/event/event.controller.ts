import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { EventCreationRequestDTO } from "src/dto/event/event-creation-request.dto";
import { EventPaginatedRequestDTO } from "src/dto/event/event-pagination-request.dto";
import { EventUpdateRequestDTO } from "src/dto/event/event-update-request.dto";
import { EventDTO } from "src/dto/event/event.dto";
import { EventRoutes } from "src/enums/routes/event-routes.enum";
import { EventService } from "src/services/event/event.service";

@Controller(EventRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Post(EventRoutes.Create)
  async createEvent(@Body() model: EventCreationRequestDTO): Promise<boolean> {
    const result: boolean = await this.eventService.createEvent(model);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post(EventRoutes.ListPaginated)
  async getEventsPaginated(
    @Body() model: EventPaginatedRequestDTO,
  ): Promise<EventDTO[]> {
    const result: EventDTO[] = await this.eventService.getPaginatedList(model);
    return result;
  }

  @UseGuards(AuthGuard)
  @Patch(EventRoutes.Update)
  async updateEvent(
    @Body() model: EventUpdateRequestDTO,
    @Param("eventId") eventId: string,
  ): Promise<boolean> {
    const result: boolean = await this.eventService.updateEvent(model, eventId);
    return result;
  }

  @UseGuards(AuthGuard)
  @Delete(EventRoutes.Delete)
  async deleteEvent(@Param("eventId") eventId: string): Promise<boolean> {
    const result: boolean = await this.eventService.deleteEvent(eventId);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(EventRoutes.ListSimilar)
  async getSimilarEvent(
    @Param("eventId") eventId: string,
  ): Promise<EventDTO[]> {
    const result: EventDTO[] =
      await this.eventService.getSimilarEvents(eventId);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(EventRoutes.Get)
  async getEvent(@Param("eventId") eventId: string): Promise<EventDTO> {
    const result: EventDTO = await this.eventService.getEventById(eventId);
    return result;
  }
}
