import { Primitives } from "@/lib/types/primitives";
import { ProductRepository } from "../domain/product.repository";
import { Unit } from "../domain/unit";

export class ListUnits {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<Primitives<Unit>[]> {
    const units = await this.repository.units();
    return units.map((unit) => unit.toPrimitives());
  }
}
