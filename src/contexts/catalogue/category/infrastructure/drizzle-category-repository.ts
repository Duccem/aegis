import { Criteria } from "@/contexts/shared/domain/criteria";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { category } from "@/contexts/shared/infrastructure/database/schema";
import { count, eq } from "drizzle-orm";
import { Category } from "../domain/category";
import { CategoryRepository } from "../domain/category-repository";

export class DrizzleCategoryRepository implements CategoryRepository {
  private converter = new DrizzleCriteriaConverter(category);

  async save(data: Category): Promise<void> {
    const primitive = data.toPrimitives();

    await database.insert(category).values(primitive).onConflictDoUpdate({
      target: category.id,
      set: primitive,
    });
  }

  async find(criteria: Criteria): Promise<Category | null> {
    const { where } = this.converter.criteria(criteria);

    const result = await database.select().from(category).where(where).limit(1);

    if (result.length === 0) return null;

    return Category.fromPrimitives(result[0]);
  }

  async search(criteria: Criteria): Promise<Category[]> {
    const { where, orderBy, limit, offset } = this.converter.criteria(criteria);

    const results = await database
      .select()
      .from(category)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return results.map((result) => Category.fromPrimitives(result));
  }

  async delete(id: Uuid): Promise<void> {
    await database.delete(category).where(eq(category.id, id.value));
  }

  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);

    const result = await database
      .select({ count: count(category.id) })
      .from(category)
      .where(where);

    return result[0]?.count ?? 0;
  }
}
