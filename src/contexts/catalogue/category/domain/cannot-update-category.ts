import { DomainError } from "@/contexts/shared/domain/domain-error";

export class CannotUpdateCategoryError extends DomainError {
  constructor() {
    super(`You do not have permission to update this category`);
  }
}
