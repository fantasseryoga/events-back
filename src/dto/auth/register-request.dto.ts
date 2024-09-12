import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class RegisterRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @Min(12)
  @Max(100)
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: `Email must be a valid email address` })
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cityId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[0-9]).{8,32}$/, {
    message:
      "Password must be between 8 and 32 characters long and contain at least one number",
  })
  password: string;
}
