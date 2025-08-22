import { Primitives } from "@/contexts/shared/domain/primitives";
import { ItemRepository } from "../domain/item-repository";
import { Unit } from "../domain/unit";

export class ListUnits {
  constructor(private readonly repository: ItemRepository) {}

  async execute(): Promise<Primitives<Unit>[]> {
    const units = await this.repository.units();
    return units.map((unit) => unit.toPrimitives());
  }
}
