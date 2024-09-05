import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class SomethingWentWrongException extends BaseException {
  constructor() {
    super(
      `Something went wrong on our side...`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
