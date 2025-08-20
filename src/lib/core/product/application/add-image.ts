import { FilterByProductId } from "../domain/criteria";
import { CannotUpdateProductError, ProductNotFoundError } from "../domain/errors";
import { CanUpdateProduct } from "../domain/invariants";
import { ProductRepository } from "../domain/product.repository";

export type AddImageError = ProductNotFoundError | CannotUpdateProductError;

export class AddImage {
  constructor(private readonly repository: ProductRepository) {}

  async execute(productId: string, organizationId: string, imageUrl: string): Promise<void> {
    const product = await this.repository.find(FilterByProductId.fromString(productId));
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    if (!CanUpdateProduct.forOrganization(organizationId).isSatisfiedBy(product)) {
      throw new CannotUpdateProductError();
    }

    product.addImage(imageUrl);
    await this.repository.save(product);
  }
}
