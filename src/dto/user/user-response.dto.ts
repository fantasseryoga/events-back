import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class UserResponseDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(100)
  firstName: string;

  @Min(12)
  @Max(100)
  age: number;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(100)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Min(5)
  @Max(100)
  email: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
