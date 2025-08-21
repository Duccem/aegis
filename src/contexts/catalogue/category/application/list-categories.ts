import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Category } from "../domain/category";
import { CategoryRepository } from "../domain/category-repository";

export class ListCategories {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(organizationId: string): Promise<Primitives<Category>[]> {
    const criteria = this.buildCriteria(organizationId).paginate(100, 0);

    const categories = await this.repository.search(criteria);

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
