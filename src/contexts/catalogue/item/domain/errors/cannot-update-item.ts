import { DomainError } from "@/contexts/shared/domain/domain-error";

export class CannotUpdateItemError extends DomainError {
  constructor() {
    super(`You do not have permission to update this item`);
  }
}
