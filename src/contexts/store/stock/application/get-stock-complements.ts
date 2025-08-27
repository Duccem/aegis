import { Primitives } from "@/contexts/shared/domain/primitives";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { StockItem, StockStore } from "../domain/stock";
import { StockRepository } from "../domain/stock-repository";

export class GetStockComplements {
  constructor(private repository: StockRepository) {}

  async run(organizationId: string): Promise<{
    items: Primitives<StockItem>[];
    stores: Primitives<StockStore>[];
  }> {
    const [items, stores] = await Promise.all([
      this.repository.items(Uuid.fromString(organizationId)),
      this.repository.stores(Uuid.fromString(organizationId)),
    ]);
    return {
      items: items.map((item) => item.toPrimitives()),
      stores: stores.map((store) => store.toPrimitives()),
    };
  }
}
