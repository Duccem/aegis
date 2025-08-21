import { DomainError } from "../domain-error";

export class Unauthenticated extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
