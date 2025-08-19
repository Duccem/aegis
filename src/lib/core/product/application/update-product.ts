import { FilterByProductId } from "../domain/criteria";
import { CannotUpdateProductError, ProductNotFoundError } from "../domain/errors";
import { CanUpdateProduct } from "../domain/invariants";
import { ProductRepository } from "../domain/product.repository";

export type UpdateProductPayload = {
  name: string;
  sku: string;
  description: string;
  brandId: string;
  unitId: string;
  categories: string[];
};

export type UpdateProductErrors = ProductNotFoundError | CannotUpdateProductError;

export class UpdateProduct {
  constructor(private repository: ProductRepository) {}

  async execute(
    productId: string,
    organizationId: string,
    payload: UpdateProductPayload,
  ): Promise<void> {
    const product = await this.repository.find(FilterByProductId.fromString(productId));

    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    if (!CanUpdateProduct.forOrganization(organizationId).isSatisfiedBy(product)) {
      throw new CannotUpdateProductError();
    }

    product.update(
      payload.name,
      payload.sku,
      payload.description,
      payload.unitId,
      payload.brandId,
      payload.categories,
    );

    await this.repository.save(product);
  }
}
