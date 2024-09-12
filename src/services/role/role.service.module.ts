import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleEntity } from "src/infrastructure/db/entities/role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleServiceModule {}
