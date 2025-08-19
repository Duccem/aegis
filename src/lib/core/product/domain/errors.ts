import { DomainError } from "@/lib/types/domain-error";

export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found`);
  }
}

export class CannotUpdateProductError extends DomainError {
  constructor() {
    super(`You do not have permission to update this product`);
  }
}
