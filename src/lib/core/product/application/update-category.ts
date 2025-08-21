import { Criteria, Operator } from "@/lib/types/criteria";
import { CannotUpdateCategoryError, CategoryNotFoundError } from "../domain/errors";
import { ProductRepository } from "../domain/product.repository";

export type UpdateCategoryError = CategoryNotFoundError | CannotUpdateCategoryError;

export class UpdateCategory {
  constructor(private repository: ProductRepository) {}

  async execute(id: string, name: string, organizationId: string): Promise<void> {
    const criteria = this.buildCriteria(id);
    const category = await this.repository.category(criteria);
    if (!category) {
      throw new CategoryNotFoundError(id);
    }
    if (category.organizationId.value !== organizationId) {
      throw new CannotUpdateCategoryError();
    }

    category.updateName(name);

    await this.repository.saveCategory(category);
  }

  buildCriteria(categoryId: string) {
    const filters = [
      {
        field: "id",
        value: categoryId,
        operator: Operator.EQUAL,
      },
    ];

    return Criteria.withFilters(filters);
  }
}
