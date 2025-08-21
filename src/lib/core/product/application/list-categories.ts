import { Criteria, Operator } from "@/lib/types/criteria";
import { Primitives } from "@/lib/types/primitives";
import { Category } from "../domain/category";
import { ProductRepository } from "../domain/product.repository";

export class ListCategories {
  constructor(private readonly repository: ProductRepository) {}

  async execute(organizationId: string): Promise<Primitives<Category>[]> {
    const criteria = this.buildCriteria(organizationId).paginate(100, 0);
    const categories = await this.repository.categories(criteria);
    return categories.map((category) => category.toPrimitives());
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
