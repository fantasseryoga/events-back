import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { CityDTO } from "../city/city.dto";
import { Type } from "class-transformer";
import { CategoryDTO } from "../category/category.dto";

export class EventCreationDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(2)
  title: string;

  @Type(() => CityDTO)
  city: CityDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  categories: CategoryDTO[];

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(2)
  address: string;

  @IsDateString()
  @IsNotEmpty()
  eventDate: Date;
}
