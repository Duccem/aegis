import { FilterByProductId } from "../domain/criteria";
import { CannotUpdateProductError, ProductNotFoundError } from "../domain/errors";
import { CanUpdateProduct } from "../domain/invariants";
import { ProductRepository } from "../domain/product.repository";

export type ArchiveProductError = ProductNotFoundError | CannotUpdateProductError;

export class ArchiveProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(productId: string, organizationId: string): Promise<void> {
    const product = await this.repository.find(FilterByProductId.fromString(productId));
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    if (!CanUpdateProduct.forOrganization(organizationId).isSatisfiedBy(product)) {
      throw new CannotUpdateProductError();
    }

    product.archive();
    await this.repository.save(product);
  }
}
