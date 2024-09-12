import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { EventEntity } from "src/infrastructure/db/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EventEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}
