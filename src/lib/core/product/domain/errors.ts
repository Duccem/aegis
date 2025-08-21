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

export class CategoryNotFoundError extends DomainError {
  constructor(categoryId: string) {
    super(`Category with ID ${categoryId} not found`);
  }
}

export class BrandNotFoundError extends DomainError {
  constructor(brandId: string) {
    super(`Brand with ID ${brandId} not found`);
  }
}

export class CannotUpdateBrandError extends DomainError {
  constructor() {
    super(`You do not have permission to update this brand`);
  }
}

export class CannotUpdateCategoryError extends DomainError {
  constructor() {
    super(`You do not have permission to update this category`);
  }
}
