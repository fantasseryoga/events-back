import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/infrastructure/db/entities/category.entity";
import { CategoryService } from "./category.service";
import { RoleServiceModule } from "../role/role.service.module";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), RoleServiceModule],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryServiceModule {}
