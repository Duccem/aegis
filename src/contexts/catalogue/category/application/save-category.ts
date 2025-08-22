import { Category } from "../domain/category";
import { CategoryRepository } from "../domain/category-repository";

export class SaveCategory {
  constructor(private repository: CategoryRepository) {}

  async execute(name: string, organizationId: string): Promise<void> {
    const category = Category.create(name, organizationId);
    await this.repository.save(category);
  }
}
