import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exeption";

export class EventIsNotUniqueException extends BaseException {
  constructor() {
    super(`Event with this title is already exsts`, HttpStatus.CONFLICT);
  }
}
