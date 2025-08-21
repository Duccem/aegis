import { Criteria, Operator } from "@/lib/types/criteria";
import { Primitives } from "@/lib/types/primitives";
import { Brand } from "../domain/brand";
import { ProductRepository } from "../domain/product.repository";

export class ListBrands {
  constructor(private readonly repository: ProductRepository) {}

  async execute(organizationId: string): Promise<Primitives<Brand>[]> {
    const criteria = this.buildCriteria(organizationId).paginate(100, 0);
    const brands = await this.repository.brands(criteria);
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
