import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class CategoryNotMappedException extends BaseException {
  constructor() {
    super(`Category does not exist`, HttpStatus.NOT_FOUND);
  }
}
