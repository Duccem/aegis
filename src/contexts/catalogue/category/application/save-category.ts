import { BrandRepository } from "../../brand/domain/brand-repository";
import { Category } from "../domain/category";

export class SaveCategory {
  constructor(private repository: BrandRepository) {}

  async execute(name: string, organizationId: string): Promise<void> {
    const category = Category.create(name, organizationId);
    await this.repository.save(category);
  }
}
