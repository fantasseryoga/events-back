import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CategoryEntity } from "src/infrastructure/db/entities/category.entity";
import { CategoryCreationRequestDTO } from "src/dto/category/category-creation-request.dto";
import { SomethingWentWrongException } from "src/common/exceptions/base/somthing-went-wrong-base.exception";
import { CategoryDTO } from "src/dto/category/category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async setCategoriesManually(
    model: CategoryCreationRequestDTO,
  ): Promise<boolean> {
    try {
      const uniqueCategories = model.categories.filter(
        (category, index, self) =>
          index === self.findIndex((c) => c.name === category.name),
      );

      await this.categoryRepository.delete({});
      await this.categoryRepository.save(uniqueCategories);
    } catch (e) {
      throw new SomethingWentWrongException();
    }
    return true;
  }

  async getCategoryListByIds(ids: string[]): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.find({
      where: { id: In(ids) },
    });

    return categories;
  }

  async getCategoryList(): Promise<CategoryDTO[]> {
    return await this.categoryRepository.find();
  }
}
