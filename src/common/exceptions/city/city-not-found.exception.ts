import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class CityNorFoundException extends BaseException {
  constructor() {
    super(`City Not Found`, HttpStatus.NOT_FOUND);
  }
}
