import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryServiceModule } from "src/services/category/category.service.module";

@Module({
  imports: [CategoryServiceModule],
  controllers: [CategoryController],
  providers: [CategoryController],
})
export class CategoryControllerModule {}
