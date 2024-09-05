import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CityDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
