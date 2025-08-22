import { DomainError } from "@/contexts/shared/domain/domain-error";

export class ItemNotFound extends DomainError {
  constructor(itemId: string) {
    super(`Product with ID ${itemId} not found`);
  }
}
