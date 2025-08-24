import { Criteria } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { store } from "@/contexts/shared/infrastructure/database/schema";
import { count, eq } from "drizzle-orm";
import { Store, StoreId } from "../domain/store";
import { StoreRepository } from "../domain/store-repository";

export class DrizzleStoreRepository implements StoreRepository {
  private converter = new DrizzleCriteriaConverter(store);

  async save(data: Store): Promise<void> {
    const primitives = data.toPrimitives();
    await database
      .insert(store)
      .values(primitives)
      .onConflictDoUpdate({
        target: store.id,
        set: {
          name: primitives.name,
          address: primitives.address,
          status: primitives.status,
        },
      });
  }

  async find(criteria: Criteria): Promise<Store | null> {
    const { where } = this.converter.criteria(criteria);

    const result = await database.select().from(store).where(where).limit(1);

    if (result.length === 0) return null;

    const data = result[0] as unknown as Primitives<Store>;

    return Store.fromPrimitives(data);
  }

  async search(criteria: Criteria): Promise<Store[]> {
    const { where, orderBy, limit, offset } = this.converter.criteria(criteria);

    const results = await database
      .select()
      .from(store)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return results.map((result) => {
      const data = result as unknown as Primitives<Store>;
      return Store.fromPrimitives(data);
    });
  }

  async delete(id: StoreId): Promise<void> {
    await database.delete(store).where(eq(store.id, id.value));
  }

  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);

    const result = await database
      .select({ count: count(store.id) })
      .from(store)
      .where(where)
      .limit(1);

    return Number(result[0]?.count ?? 0);
  }
}
