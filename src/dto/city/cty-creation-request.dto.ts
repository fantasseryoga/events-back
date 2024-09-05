import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CityCreationalDTO } from "./city-creation.dto";

export class CityCreationRequestDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CityCreationalDTO)
  cities: CityCreationalDTO[];
}
