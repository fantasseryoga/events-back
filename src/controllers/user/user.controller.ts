import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { UserShortDTO } from "src/dto/user/user-short.dto";
import { UserRoutes } from "src/enums/routes/user-routes.enum";
import { UserService } from "src/services/user/user.service";

@Controller(UserRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(UserRoutes.UsersFromEvent)
  async getUsersFromEvent(
    @Param("eventId") eventId: string,
  ): Promise<UserShortDTO[]> {
    const result: UserShortDTO[] =
      await this.userService.getUsersFromEvent(eventId);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post(UserRoutes.AddToEvent)
  async addUserToEvent(
    @Param("eventId") eventId: string,
    @Req() request,
  ): Promise<boolean> {
    const result: boolean = await this.userService.addUserToEvent(
      request.user,
      eventId,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Delete(UserRoutes.RemoveFromEvent)
  async removeUserFromEvent(
    @Param("eventId") eventId: string,
    @Req() request,
  ): Promise<boolean> {
    const result: boolean = await this.userService.removeUserFromEvent(
      request.user,
      eventId,
    );
    return result;
  }
}
