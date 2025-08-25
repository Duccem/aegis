import { Criteria } from "@/contexts/shared/domain/criteria";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { stock } from "@/contexts/shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { Stock, StockId } from "../domain/stock";
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

    const result = await database.select().from(stock).where(where).limit(1);

    if (result.length === 0) return null;

    return Stock.fromPrimitives(result[0]);
  }

  async search(criteria: Criteria): Promise<Stock[]> {
    const { where, orderBy, limit, offset } = this.converter.criteria(criteria);
    const results = await database
      .select()
      .from(stock)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return results.map((result) => Stock.fromPrimitives(result));
  }

  async delete(id: StockId): Promise<void> {
    await database.delete(stock).where(eq(stock.id, id.value));
  }
}
