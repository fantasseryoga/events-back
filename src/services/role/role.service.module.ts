import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleEntity } from "src/infrastructure/db/entities/role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleServiceModule {}
