import { Category } from "../domain/category";
import { ProductRepository } from "../domain/product.repository";

export class SaveCategory {
  constructor(private repository: ProductRepository) {}

  async execute(name: string, organizationId: string): Promise<void> {
    const category = Category.create(name, organizationId);
    await this.repository.saveCategory(category);
  }
}
