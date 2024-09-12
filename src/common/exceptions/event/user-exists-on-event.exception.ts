import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class UserExistsOnEventException extends BaseException {
  constructor() {
    super(`User is already exists on this event.`, HttpStatus.CONFLICT);
  }
}
