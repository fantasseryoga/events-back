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

export class EventUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(2)
  @IsOptional()
  title?: string;

  @Type(() => CityDTO)
  @IsOptional()
  city?: CityDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  @IsOptional()
  categories?: CategoryDTO[];

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(2)
  @IsOptional()
  address?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  eventDate?: Date;
}
