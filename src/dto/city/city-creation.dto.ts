import { IsNotEmpty, IsString } from "class-validator";

export class CityCreationalDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
