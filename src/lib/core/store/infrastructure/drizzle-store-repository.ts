import { database } from "@/lib/database";
import { DrizzleCriteriaConverter } from "@/lib/database/converter";
import { store } from "@/lib/database/schema/store.schema";
import { Criteria } from "@/lib/types/criteria";
import { Primitives } from "@/lib/types/primitives";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { count, eq } from "drizzle-orm";
import { Store } from "../domain/store";
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
    if (result.length === 0) {
      return null;
    }
    return Store.fromPrimitives(result[0] as Primitives<Store>);
  }
  async search(criteria: Criteria): Promise<Store[]> {
    const { where, orderBy, limit } = this.converter.criteria(criteria);
    const result = await database.select().from(store).where(where).orderBy(orderBy).limit(limit);
    return result.map((item) => Store.fromPrimitives(item as Primitives<Store>));
  }
  async delete(id: Uuid): Promise<void> {
    await database.delete(store).where(eq(store.id, id.value));
  }

  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);
    const result = await database
      .select({ count: count(store.id) })
      .from(store)
      .where(where);
    return result[0].count;
  }
}
