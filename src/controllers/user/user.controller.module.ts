import { Module } from "@nestjs/common";
import { UserServiceModule } from "src/services/user/user.service.module";
import { UserController } from "./user.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [UserServiceModule],
  controllers: [UserController],
  providers: [UserController, JwtService],
})
export class UserControllerModule {}
