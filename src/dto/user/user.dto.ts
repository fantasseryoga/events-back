import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { RoleDTO } from "../role/role.dto";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(100)
  firstName: string;

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

  @Min(12)
  @Max(100)
  age: number;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsArray()
  @IsNotEmpty()
  roles: RoleDTO[];

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
