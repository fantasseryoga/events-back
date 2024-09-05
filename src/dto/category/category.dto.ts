import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CategoryDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
