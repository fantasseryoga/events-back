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

export class EventCreationRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  cityId: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(2)
  categoryIds: string[];

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
