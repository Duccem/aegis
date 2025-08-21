import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Brand } from "../domain/brand";
import { BrandRepository } from "../domain/brand-repository";

export class ListBrands {
  constructor(private readonly repository: BrandRepository) {}

  async execute(organizationId: string): Promise<Primitives<Brand>[]> {
    const criteria = this.buildCriteria(organizationId).paginate(100, 0);
    const brands = await this.repository.search(criteria);
    return brands.map((brand) => brand.toPrimitives());
  }

  buildCriteria(organizationId: string): Criteria {
    const filters = [
      {
        field: "organizationId",
        value: organizationId,
        operator: Operator.EQUAL,
      },
    ];

    return Criteria.withFilters(filters);
  }
}
