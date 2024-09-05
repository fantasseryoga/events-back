import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class EventNotFoundException extends BaseException {
  constructor() {
    super(`Event Not Found`, HttpStatus.NOT_FOUND);
  }
}
