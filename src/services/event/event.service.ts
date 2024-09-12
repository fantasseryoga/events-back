import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { EventEntity } from "src/infrastructure/db/entities/event.entity";
import { EventCreationRequestDTO } from "src/dto/event/event-creation-request.dto";
import { CityService } from "../city/city.service";
import { CityNorFoundException } from "src/common/exceptions/city/city-not-found.exception";
import { EventCreationDTO } from "src/dto/event/event-creation.dto";
import { EventIsNotUniqueException } from "src/common/exceptions/event/event-is-not-unique.exception";
import { CategoryService } from "../category/category.service";
import { CategoryNotMappedException } from "src/common/exceptions/category/category-match.exeption";
import { EventUpdateRequestDTO } from "src/dto/event/event-update-request.dto";
import { EventNotFoundException } from "src/common/exceptions/event/event-not-found.exception";
import { EventPaginatedRequestDTO } from "src/dto/event/event-pagination-request.dto";
import { EventDTO } from "src/dto/event/event.dto";
import { SortDirection } from "src/enums/common/sort-direction.enum";
import { EventSortBy } from "src/enums/event/event-sort-by.enum";
import { RoleService } from "../role/role.service";
import { UserRolesEnum } from "src/enums/roles/roles.enum";
import { UserDoesNotHavePersmissionException } from "src/common/exceptions/auth/user-does-not-has-permission.exception";
import { TokenModelDTO } from "src/dto/token/token-model.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly cityService: CityService,
    private readonly categoryService: CategoryService,
    private readonly roleService: RoleService,
  ) {}

  async createEvent(
    model: EventCreationRequestDTO,
    currentUser: TokenModelDTO,
  ): Promise<boolean> {
    const isUserAdmin = await this.roleService.isUserHasRole(
      UserRolesEnum.Admin,
      currentUser.userId,
    );

    if (!isUserAdmin) {
      throw new UserDoesNotHavePersmissionException();
    }
    const cityExists = await this.cityService.getCityById(model.cityId);
    if (!cityExists) {
      throw new CityNorFoundException();
    }

    const eventUnique = await this.isEventUique(model.title);
    if (!eventUnique) {
      throw new EventIsNotUniqueException();
    }

    const categoriesMapped = await this.categoryService.getCategoryListByIds(
      model.categoryIds,
    );

    if (categoriesMapped.length < model.categoryIds.length) {
      throw new CategoryNotMappedException();
    }

    const eventCreationalModel: EventCreationDTO = {
      ...model,
      city: cityExists,
      categories: categoriesMapped,
    };
    await this.eventRepository.save(eventCreationalModel);

    return true;
  }

  async updateEvent(
    model: EventUpdateRequestDTO,
    eventId: string,
    currentUser: TokenModelDTO,
  ): Promise<boolean> {
    const isUserAdmin = await this.roleService.isUserHasRole(
      UserRolesEnum.Admin,
      currentUser.userId,
    );

    if (!isUserAdmin) {
      throw new UserDoesNotHavePersmissionException();
    }
    const existingEvent = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["categories"],
    });

    if (!existingEvent) {
      throw new EventNotFoundException();
    }

    const eventUpdateModel: Partial<EventEntity> = {
      ...existingEvent,
      ...model,
    };

    if (model.cityId) {
      const cityExists = await this.cityService.getCityById(model.cityId);
      if (!cityExists) {
        throw new CityNorFoundException();
      }
      eventUpdateModel.city = cityExists;
    }

    if (model.title) {
      const eventUnique = await this.isEventUiqueUpdate(model.title, eventId);
      if (!eventUnique) {
        throw new EventIsNotUniqueException();
      }
    }

    if (model.categoryIds) {
      const categoriesMapped = await this.categoryService.getCategoryListByIds(
        model.categoryIds,
      );

      if (categoriesMapped.length < model.categoryIds.length) {
        throw new CategoryNotMappedException();
      }

      eventUpdateModel.categories = categoriesMapped;
    }

    await this.eventRepository.save(eventUpdateModel);

    return true;
  }

  async deleteEvent(
    eventId: string,
    currentUser: TokenModelDTO,
  ): Promise<boolean> {
    const isUserAdmin = await this.roleService.isUserHasRole(
      UserRolesEnum.Admin,
      currentUser.userId,
    );

    if (!isUserAdmin) {
      throw new UserDoesNotHavePersmissionException();
    }
    const existingEvent = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new EventNotFoundException();
    }

    await this.eventRepository.delete(eventId);

    return true;
  }

  async getSimilarEvents(eventId: string): Promise<EventEntity[]> {
    const targetEvent = await this.eventRepository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.categories", "category")
      .where("event.id = :eventId", { eventId })
      .getOne();

    if (!targetEvent) {
      throw new EventNotFoundException();
    }

    const targetCategoryIds = targetEvent.categories.map((c) => c.id);

    const similarEvents = await this.eventRepository
      .createQueryBuilder("event")
      .leftJoin("event.categories", "category")
      .where("event.id != :eventId", { eventId })
      .andWhere("category.id IN (:...targetCategoryIds)", { targetCategoryIds })
      .groupBy("event.id")
      .having("COUNT(category.id) >= 2")
      .limit(3)
      .getMany();

    return similarEvents;
  }

  async getPaginatedList(model: EventPaginatedRequestDTO): Promise<EventDTO[]> {
    const idsQueryBuilder = this.eventRepository
      .createQueryBuilder("event")
      .select("DISTINCT ON (event.id) event.id", "event_id")
      .leftJoin("event.city", "city")
      .leftJoin("event.categories", "category");

    if (model.title) {
      idsQueryBuilder.andWhere("event.title LIKE :title", {
        title: `%${model.title}%`,
      });
    }

    if (model.description) {
      idsQueryBuilder.andWhere("event.description LIKE :description", {
        description: `%${model.description}%`,
      });
    }

    if (model.cityIds) {
      idsQueryBuilder.andWhere("city.id IN (:...cityIds)", {
        cityIds: model.cityIds,
      });
    }

    if (model.categoryIds) {
      idsQueryBuilder.andWhere("category.id IN (:...categoryIds)", {
        categoryIds: model.categoryIds,
      });
    }

    const sortDirection = model.sortDirection || SortDirection.ASC;
    const sortBy = model.sortBy || EventSortBy.EventDate;
    idsQueryBuilder
      .orderBy("event.id", sortDirection)
      .addOrderBy(`event.${sortBy}`, sortDirection);

    const pageSize = model.pageSize;
    const pageNumber = model.pageNumber;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    idsQueryBuilder.offset(skip).limit(take);

    const idsResult = await idsQueryBuilder.getRawMany();
    const eventIds = idsResult.map((result) => result.event_id);

    if (eventIds.length === 0) {
      return [];
    }

    const eventsQueryBuilder = this.eventRepository
      .createQueryBuilder("event")
      .select([
        "event.id",
        "event.title",
        "event.description",
        "event.eventDate",
        "city.id",
        "city.name",
        "category.id",
        "category.name",
      ])
      .leftJoin("event.city", "city")
      .leftJoin("event.categories", "category")
      .where("event.id IN (:...eventIds)", { eventIds });

    eventsQueryBuilder.orderBy(`event.${sortBy}`, sortDirection);
    const events = await eventsQueryBuilder.getMany();

    return events;
  }

  async getEventById(eventId: string): Promise<EventDTO> {
    const existingEvent = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new EventNotFoundException();
    }

    const userCount = await this.eventRepository
      .createQueryBuilder("event")
      .leftJoin("event.users", "user")
      .where("event.id = :eventId", { eventId })
      .getCount();

    const eventResponse: EventDTO = existingEvent;
    eventResponse.userCount = userCount;

    return eventResponse;
  }

  async isEventUique(title: string): Promise<boolean> {
    const event = await this.eventRepository.findOne({ where: { title } });

    return event?.id ? false : true;
  }

  async isEventUiqueUpdate(title: string, id: string): Promise<boolean> {
    const event = await this.eventRepository.findOne({
      where: { title: title, id: Not(id) },
    });

    return event?.id ? false : true;
  }
}
