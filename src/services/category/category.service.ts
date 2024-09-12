import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CategoryEntity } from "src/infrastructure/db/entities/category.entity";
import { CategoryCreationRequestDTO } from "src/dto/category/category-creation-request.dto";
import { SomethingWentWrongException } from "src/common/exceptions/base/somthing-went-wrong-base.exception";
import { CategoryDTO } from "src/dto/category/category.dto";
import { UserRolesEnum } from "src/enums/roles/roles.enum";
import { TokenModelDTO } from "src/dto/token/token-model.dto";
import { UserDoesNotHavePersmissionException } from "src/common/exceptions/auth/user-does-not-has-permission.exception";
import { RoleService } from "../role/role.service";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly roleService: RoleService,
  ) {}

  async setCategoriesManually(
    model: CategoryCreationRequestDTO,
    currentUser: TokenModelDTO,
  ): Promise<boolean> {
    const isUserAdmin = await this.roleService.isUserHasRole(
      UserRolesEnum.Admin,
      currentUser.userId,
    );

    if (!isUserAdmin) {
      throw new UserDoesNotHavePersmissionException();
    }
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
