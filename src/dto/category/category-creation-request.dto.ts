import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CategoryCreationalDTO } from "./category-creation.dto";

export class CategoryCreationRequestDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryCreationalDTO)
  categories: CategoryCreationalDTO[];
}
