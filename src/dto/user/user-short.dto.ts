import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class UserShortDTO {
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
}
