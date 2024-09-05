import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CityEntity } from "src/infrastructure/db/entities/city.entity";
import { CityCreationRequestDTO } from "src/dto/city/cty-creation-request.dto";
import { CityDTO } from "src/dto/city/city.dto";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async setCitiesManually(model: CityCreationRequestDTO): Promise<boolean> {
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
