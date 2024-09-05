import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class EventUpdateRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(2)
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  cityId?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(2)
  @IsOptional()
  categoryIds?: string[];

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
