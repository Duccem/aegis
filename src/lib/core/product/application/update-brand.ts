import { Criteria, Operator } from "@/lib/types/criteria";
import { BrandNotFoundError, CannotUpdateBrandError } from "../domain/errors";
import { ProductRepository } from "../domain/product.repository";

export type UpdateBrandError = BrandNotFoundError | CannotUpdateBrandError;

export class UpdateBrand {
  constructor(private repository: ProductRepository) {}

  async execute(id: string, name: string, organizationId: string): Promise<void> {
    const criteria = this.buildCriteria(id);
    const brand = await this.repository.brand(criteria);
    if (!brand) {
      throw new BrandNotFoundError(id);
    }
    if (brand.organizationId.value !== organizationId) {
      throw new CannotUpdateBrandError();
    }

    brand.updateName(name);

    await this.repository.saveBrand(brand);
  }

  buildCriteria(brandId: string) {
    const filters = [
      {
        field: "id",
        value: brandId,
        operator: Operator.EQUAL,
      },
    ];

    return Criteria.withFilters(filters);
  }
}
