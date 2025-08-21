import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { BrandNotFoundError } from "../domain/brand-not-found";
import { BrandRepository } from "../domain/brand-repository";
import { CannotUpdateBrandError } from "../domain/cannot-update-brand";

export type UpdateBrandError = BrandNotFoundError | CannotUpdateBrandError;

export class UpdateBrand {
  constructor(private repository: BrandRepository) {}

  async execute(id: string, name: string, organizationId: string): Promise<void> {
    const criteria = this.buildCriteria(id);
    const brand = await this.repository.find(criteria);
    if (!brand) {
      throw new BrandNotFoundError(id);
    }
    if (brand.organizationId.value !== organizationId) {
      throw new CannotUpdateBrandError();
    }

    brand.updateName(name);

    await this.repository.save(brand);
  }

  buildCriteria(brandId: string): Criteria {
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
