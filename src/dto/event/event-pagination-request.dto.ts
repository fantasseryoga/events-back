import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";
import { SortDirection } from "src/enums/common/sort-direction.enum";
import { EventSortBy } from "src/enums/event/event-sort-by.enum";

export class EventPaginatedRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(1)
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  cityIds?: string[];

  @IsOptional()
  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  categoryIds?: string[];

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @IsNumber()
  @IsNotEmpty()
  pageNumber: number;

  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection = SortDirection.ASC;

  @IsEnum(EventSortBy)
  @IsOptional()
  sortBy?: EventSortBy = EventSortBy.EventDate;
}
