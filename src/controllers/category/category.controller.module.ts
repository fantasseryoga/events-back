import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryServiceModule } from "src/services/category/category.service.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [CategoryServiceModule],
  controllers: [CategoryController],
  providers: [CategoryController, JwtService],
})
export class CategoryControllerModule {}
