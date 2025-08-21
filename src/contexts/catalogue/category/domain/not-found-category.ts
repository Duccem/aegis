import { DomainError } from "@/contexts/shared/domain/domain-error";

export class CategoryNotFoundError extends DomainError {
  constructor(categoryId: string) {
    super(`Category with ID ${categoryId} not found`);
  }
}
