import {
  Body,
  Controller,
  Get,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryCreationRequestDTO } from "src/dto/category/category-creation-request.dto";
import { CategoryDTO } from "src/dto/category/category.dto";
import { CategoryRoutes } from "src/enums/routes/category-routes.enum";
import { CategoryService } from "src/services/category/category.service";

@Controller(CategoryRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Put(CategoryRoutes.Set)
  async setCategoriesManually(
    @Body() model: CategoryCreationRequestDTO,
  ): Promise<boolean> {
    const result: boolean =
      await this.categoryService.setCategoriesManually(model);
    return result;
  }

  @Get(CategoryRoutes.List)
  async getCategoryList(): Promise<CategoryDTO[]> {
    const result: CategoryDTO[] = await this.categoryService.getCategoryList();
    return result;
  }
}
