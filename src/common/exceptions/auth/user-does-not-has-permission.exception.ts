import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class UserDoesNotHavePersmissionException extends BaseException {
  constructor() {
    super("User does not have permission.", HttpStatus.FORBIDDEN);
  }
}
