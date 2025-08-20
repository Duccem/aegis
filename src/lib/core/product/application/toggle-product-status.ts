import { FilterByProductId } from "../domain/criteria";
import { CannotUpdateProductError, ProductNotFoundError } from "../domain/errors";
import { CanUpdateProduct } from "../domain/invariants";
import { ProductRepository } from "../domain/product.repository";

export type ToggleProductStatusError = ProductNotFoundError | CannotUpdateProductError;

export class ToggleProductStatus {
  constructor(private readonly repository: ProductRepository) {}

  async execute(productId: string, organizationId: string) {
    const product = await this.repository.find(FilterByProductId.fromString(productId));

    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    if (!CanUpdateProduct.forOrganization(organizationId).isSatisfiedBy(product)) {
      throw new CannotUpdateProductError();
    }

    product.toggleStatus();

    await this.repository.save(product);
  }
}
