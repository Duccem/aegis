import { Primitives } from "@/lib/types/primitives";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Category } from "../domain/category";
import { ProductRepository } from "../domain/product.repository";

export class ListCategories {
  constructor(private readonly repository: ProductRepository) {}

  async execute(organizationId: string): Promise<Primitives<Category>[]> {
    const categories = await this.repository.categories(Uuid.fromString(organizationId));
    return categories.map((category) => category.toPrimitives());
  }
}
