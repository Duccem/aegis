import { DomainError } from "@/contexts/shared/domain/domain-error";

export class CannotUpdateStore extends DomainError {
  constructor() {
    super("Cannot update store");
  }
}
