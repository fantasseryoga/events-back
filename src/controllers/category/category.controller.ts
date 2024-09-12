import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CategoryCreationRequestDTO } from "src/dto/category/category-creation-request.dto";
import { CategoryDTO } from "src/dto/category/category.dto";
import { CategoryRoutes } from "src/enums/routes/category-routes.enum";
import { CategoryService } from "src/services/category/category.service";

@Controller(CategoryRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Put(CategoryRoutes.Set)
  async setCategoriesManually(
    @Body() model: CategoryCreationRequestDTO,
    @Req() request,
  ): Promise<boolean> {
    const result: boolean = await this.categoryService.setCategoriesManually(
      model,
      request.user,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(CategoryRoutes.List)
  async getCategoryList(): Promise<CategoryDTO[]> {
    const result: CategoryDTO[] = await this.categoryService.getCategoryList();
    return result;
  }
}
