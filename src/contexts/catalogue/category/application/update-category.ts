import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { CannotUpdateCategoryError } from "../domain/cannot-update-category";
import { CategoryRepository } from "../domain/category-repository";
import { CategoryNotFoundError } from "../domain/not-found-category";

export type UpdateCategoryError = CategoryNotFoundError | CannotUpdateCategoryError;

export class UpdateCategory {
  constructor(private repository: CategoryRepository) {}

  async execute(id: string, name: string, organizationId: string): Promise<void> {
    const criteria = this.buildCriteria(id);
    const category = await this.repository.find(criteria);
    if (!category) {
      throw new CategoryNotFoundError(id);
    }
    if (category.organizationId.value !== organizationId) {
      throw new CannotUpdateCategoryError();
    }

    category.updateName(name);

    await this.repository.save(category);
  }

  buildCriteria(categoryId: string): Criteria {
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
