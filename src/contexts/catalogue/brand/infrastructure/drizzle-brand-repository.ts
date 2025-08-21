import { Criteria } from "@/contexts/shared/domain/criteria";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { brand } from "@/contexts/shared/infrastructure/database/schema";
import { count, eq } from "drizzle-orm";
import { Brand } from "../domain/brand";
import { BrandRepository } from "../domain/brand-repository";

export class DrizzleBrandRepository implements BrandRepository {
  private converter = new DrizzleCriteriaConverter(brand);
  async save(data: Brand): Promise<void> {
    const primitive = data.toPrimitives();

    await database.insert(brand).values(primitive).onConflictDoUpdate({
      target: brand.id,
      set: primitive,
    });
  }

  async find(criteria: Criteria): Promise<Brand | null> {
    const { where } = this.converter.criteria(criteria);

    const result = await database.select().from(brand).where(where).limit(1);

    if (result.length === 0) return null;

    return Brand.fromPrimitives(result[0]);
  }

  async search(criteria: Criteria): Promise<Brand[]> {
    const { where, orderBy, limit, offset } = this.converter.criteria(criteria);

    const results = await database
      .select()
      .from(brand)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return results.map((result) => Brand.fromPrimitives(result));
  }

  async delete(id: string): Promise<void> {
    await database.delete(brand).where(eq(brand.id, id));
  }

  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);

    const result = await database
      .select({ count: count(brand.id) })
      .from(brand)
      .where(where);

    return result[0]?.count ?? 0;
  }
}
