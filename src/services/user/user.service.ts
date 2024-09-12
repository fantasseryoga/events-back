import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventNotFoundException } from "src/common/exceptions/event/event-not-found.exception";
import { UserExistsOnEventException } from "src/common/exceptions/event/user-exists-on-event.exception";
import { UserNotFoundException } from "src/common/exceptions/user/user-not-found.exception";
import { TokenModelDTO } from "src/dto/token/token-model.dto";
import { UserShortDTO } from "src/dto/user/user-short.dto";
import { EventEntity } from "src/infrastructure/db/entities/event.entity";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addUserToEvent(
    currentUser: TokenModelDTO,
    eventId: string,
  ): Promise<boolean> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["users"],
    });

    if (!event) {
      throw new EventNotFoundException();
    }

    const user = await this.userRepository.findOne({
      where: { id: currentUser.userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (await this.userExistsOnEvent(currentUser.userId, eventId)) {
      throw new UserExistsOnEventException();
    }
    event.users.push(user);
    await this.eventRepository.save(event);

    return true;
  }

  async removeUserFromEvent(
    currentUser: TokenModelDTO,
    eventId: string,
  ): Promise<boolean> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["users"],
    });

    if (!event) {
      throw new EventNotFoundException();
    }

    const user = await this.userRepository.findOne({
      where: { id: currentUser.userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.eventRepository
      .createQueryBuilder()
      .relation(EventEntity, "users")
      .of(eventId)
      .remove(currentUser.userId);

    return true;
  }

  async getUsersFromEvent(eventId: string): Promise<UserShortDTO[]> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["users"],
    });

    if (!event) {
      throw new EventNotFoundException();
    }

    return event.users.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      } as UserShortDTO;
    });
  }

  private async userExistsOnEvent(
    userId: string,
    eventId: string,
  ): Promise<boolean> {
    const exists = await this.eventRepository.findOne({
      where: {
        id: eventId,
        users: {
          id: userId,
        },
      },
      relations: ["users"],
    });

    return !!exists;
  }
}
