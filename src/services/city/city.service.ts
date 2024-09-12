import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CityEntity } from "src/infrastructure/db/entities/city.entity";
import { CityCreationRequestDTO } from "src/dto/city/cty-creation-request.dto";
import { CityDTO } from "src/dto/city/city.dto";
import { RoleService } from "../role/role.service";
import { UserRolesEnum } from "src/enums/roles/roles.enum";
import { TokenModelDTO } from "src/dto/token/token-model.dto";
import { UserDoesNotHavePersmissionException } from "src/common/exceptions/auth/user-does-not-has-permission.exception";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly roleService: RoleService,
  ) {}

  async setCitiesManually(
    model: CityCreationRequestDTO,
    currentUser: TokenModelDTO,
  ): Promise<boolean> {
    const isUserAdmin = await this.roleService.isUserHasRole(
      UserRolesEnum.Admin,
      currentUser.userId,
    );

    if (!isUserAdmin) {
      throw new UserDoesNotHavePersmissionException();
    }
    const uniqueCities = model.cities.filter(
      (city, index, self) =>
        index === self.findIndex((c) => c.name === city.name),
    );

    await this.cityRepository.delete({});
    await this.cityRepository.save(uniqueCities);

    return true;
  }

  async getCityById(id: string): Promise<CityDTO> {
    return await this.cityRepository.findOne({ where: { id } });
  }

  async getCityList(): Promise<CityDTO[]> {
    return await this.cityRepository.find();
  }
}
