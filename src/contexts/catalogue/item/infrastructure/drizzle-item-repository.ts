import { Criteria } from "@/contexts/shared/domain/criteria";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { item, item_category, unit } from "@/contexts/shared/infrastructure/database/schema";
import { subMonths } from "date-fns";
import { and, count, eq, gte } from "drizzle-orm";
import { Item } from "../domain/item";
import { ItemRepository } from "../domain/item-repository";
import { ItemStatusEnum } from "../domain/item-status";
import { ItemTypeEnum } from "../domain/item-type";
import { Unit } from "../domain/unit";

export class DrizzleItemRepository implements ItemRepository {
  private converter = new DrizzleCriteriaConverter(item);

  async save(data: Item): Promise<void> {
    const { categoriesIds, ...primitives } = data.toPrimitives();
    await database.insert(item).values(primitives).onConflictDoUpdate({
      target: item.id,
      set: primitives,
    });
    await database.delete(item_category).where(eq(item_category.itemId, primitives.id));
    await database.insert(item_category).values(
      categoriesIds.map((category) => ({
        itemId: primitives.id,
        categoryId: category,
      })),
    );
  }

  async find(criteria: Criteria): Promise<Item | null> {
    const { where } = this.converter.criteria(criteria);

    const result = await database.query.item.findFirst({
      where,
      with: {
        itemCategories: {
          columns: {
            categoryId: true,
          },
        },
      },
    });

    if (!result) return null;

    return Item.fromPrimitives({
      ...result,
      status: result.status as ItemStatusEnum,
      type: result.type as ItemTypeEnum,
      categoriesIds: result.itemCategories.map((category) => category.categoryId),
    });
  }

  async search(criteria: Criteria): Promise<Item[]> {
    const { where, limit, offset, orderBy } = this.converter.criteria(criteria);

    const result = await database.query.item.findMany({
      where,
      limit,
      offset,
      orderBy,
      with: {
        itemCategories: {
          columns: {
            categoryId: true,
          },
        },
      },
    });

    return result.map((item) =>
      Item.fromPrimitives({
        ...item,
        status: item.status as ItemStatusEnum,
        type: item.type as ItemTypeEnum,
        categoriesIds: item.itemCategories.map((category) => category.categoryId),
      }),
    );
  }

  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);

    const result = await database
      .select({ count: count(item.id) })
      .from(item)
      .where(where);

    return result[0]?.count ?? 0;
  }

  async delete(productId: Uuid): Promise<void> {
    await database.delete(item).where(eq(item.id, productId.value));
  }
  async metrics(organizationId: Uuid): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }> {
    const totalProducts = await database
      .select({ count: count(item.id) })
      .from(item)
      .where(eq(item.organizationId, organizationId.value));
    const totalProductsThisMonth = await database
      .select({ count: count(item.id) })
      .from(item)
      .where(
        and(
          eq(item.organizationId, organizationId.value),
          gte(item.createdAt, subMonths(new Date(), 1)),
        ),
      );
    const totalActiveProducts = await database
      .select({ count: count(item.id) })
      .from(item)
      .where(and(eq(item.organizationId, organizationId.value), eq(item.status, "active")));
    return {
      totalProducts: totalProducts[0].count,
      totalProductsThisMonth: totalProductsThisMonth[0].count,
      totalActiveProducts: totalActiveProducts[0].count,
    };
  }
  async units(): Promise<Unit[]> {
    const result = await database.select().from(unit);
    return result.map((row) => Unit.fromPrimitives(row));
  }
}
