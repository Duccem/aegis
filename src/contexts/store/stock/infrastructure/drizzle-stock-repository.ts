import { Criteria } from "@/contexts/shared/domain/criteria";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { item, stock, store } from "@/contexts/shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { Stock, StockId, StockItem, StockStore } from "../domain/stock";
import { StockRepository } from "../domain/stock-repository";

export class DrizzleStockRepository implements StockRepository {
  private converter = new DrizzleCriteriaConverter(stock);

  async save(data: Stock): Promise<void> {
    const primitives = data.toPrimitives();
    await database
      .insert(stock)
      .values(primitives)
      .onConflictDoUpdate({
        target: stock.id,
        set: {
          quantity: primitives.quantity,
          updatedAt: primitives.updatedAt,
        },
      });
  }

  async find(criteria: Criteria): Promise<Stock | null> {
    const { where } = this.converter.criteria(criteria);

    const result = await database
      .select()
      .from(stock)
      .leftJoin(store, eq(stock.storeId, store.id))
      .leftJoin(item, eq(stock.itemId, item.id))
      .where(where)
      .limit(1);

    if (result.length === 0) return null;

    return Stock.fromPrimitives({
      ...result[0].stock,
      store: result[0].store ? result[0].store : null,
      item: result[0].item ? result[0].item : null,
    });
  }

  async search(criteria: Criteria): Promise<Stock[]> {
    const { where, orderBy, limit, offset } = this.converter.criteria(criteria);
    const results = await database
      .select()
      .from(stock)
      .leftJoin(store, eq(stock.storeId, store.id))
      .leftJoin(item, eq(stock.itemId, item.id))
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return results.map((result) =>
      Stock.fromPrimitives({
        ...result.stock,
        store: result.store ? result.store : null,
        item: result.item ? result.item : null,
      }),
    );
  }

  async delete(id: StockId): Promise<void> {
    await database.delete(stock).where(eq(stock.id, id.value));
  }

  async items(organizationId: Uuid): Promise<StockItem[]> {
    const items = await database
      .select({
        id: item.id,
        name: item.name,
      })
      .from(item)
      .where(eq(item.organizationId, organizationId.value))
      .limit(50);
    return items.map((item) => StockItem.fromPrimitives(item));
  }

  async stores(organizationId: Uuid): Promise<StockStore[]> {
    const stores = await database
      .select({
        id: store.id,
        name: store.name,
      })
      .from(store)
      .where(eq(store.organizationId, organizationId.value))
      .limit(50);
    return stores.map((store) => StockStore.fromPrimitives(store));
  }
}
