import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class RoleDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(100)
  name: string;
}
