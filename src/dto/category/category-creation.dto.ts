import { IsNotEmpty, IsString } from "class-validator";

export class CategoryCreationalDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
