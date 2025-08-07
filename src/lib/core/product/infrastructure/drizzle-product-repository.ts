import { database } from "@/lib/database";
import { DrizzleCriteriaConverter } from "@/lib/database/converter";
import { product, product_category } from "@/lib/database/schema/product.schema";
import { Criteria } from "@/lib/types/criteria";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { count, eq } from "drizzle-orm";
import { Product } from "../domain/product";
import { ProductRepository } from "../domain/product.repository";

export class DrizzleProductRepository implements ProductRepository {
  private converter = new DrizzleCriteriaConverter(product);
  async save(data: Product): Promise<void> {
    const { unit, brand, categories, ...productData } = data.toPrimitives();
    await database.insert(product).values({
      ...productData,
      unitId: unit?.id ?? "",
      brandId: brand?.id ?? "",
    });
    await database
      .insert(product_category)
      .values(
        categories.map((category) => ({
          productId: productData.id,
          categoryId: category.id,
        }))
      )
      .onConflictDoNothing();
  }
  async find(criteria: Criteria): Promise<Product | null> {
    const { where } = this.converter.criteria(criteria);
    const result = await database.query.product.findFirst({
      where,
      with: {
        unit: true,
        brand: true,
        productCategories: {
          with: {
            category: true,
          },
        },
      },
    });
    if (!result) return null;
    const { unit, brand, productCategories } = result;
    return Product.fromPrimitives({
      ...result,
      unit: unit!,
      brand: brand!,
      categories: productCategories.map((pc) => ({
        id: pc.category.id,
        name: pc.category.name,
        createdAt: pc.category.createdAt,
        updatedAt: pc.category.updatedAt,
      })),
    });
  }
  async search(criteria: Criteria): Promise<Product[]> {
    const { where, limit, offset, orderBy } = this.converter.criteria(criteria);
    const result = await database.query.product.findMany({
      where,
      offset,
      limit,
      orderBy,
      with: {
        unit: true,
        brand: true,
        productCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    return result.map((result) => {
      const { unit, brand, productCategories } = result;
      return Product.fromPrimitives({
        ...result,
        unit: unit!,
        brand: brand!,
        categories: productCategories.map((pc) => ({
          id: pc.category.id,
          name: pc.category.name,
          createdAt: pc.category.createdAt,
          updatedAt: pc.category.updatedAt,
        })),
      });
    });
  }
  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);
    const result = await database
      .select({ count: count(product.id) })
      .from(product)
      .where(where);
    return result[0].count;
  }
  async delete(productId: Uuid): Promise<void> {
    await database.delete(product).where(eq(product.id, productId.value));
  }
}
