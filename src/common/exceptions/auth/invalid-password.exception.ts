import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class InvalidPasswordException extends BaseException {
  constructor() {
    super("Invalid Password.", HttpStatus.FORBIDDEN);
  }
}
