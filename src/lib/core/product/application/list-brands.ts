import { Primitives } from "@/lib/types/primitives";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Brand } from "../domain/brand";
import { ProductRepository } from "../domain/product.repository";

export class ListBrands {
  constructor(private readonly repository: ProductRepository) {}

  async execute(organizationId: string): Promise<Primitives<Brand>[]> {
    const brands = await this.repository.brands(Uuid.fromString(organizationId));
    return brands.map((brand) => brand.toPrimitives());
  }
}
