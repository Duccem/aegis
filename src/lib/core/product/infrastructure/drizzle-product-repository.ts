import { database } from "@/lib/database";
import { DrizzleCriteriaConverter } from "@/lib/database/converter";
import {
  brand,
  category,
  product,
  product_category,
  unit,
} from "@/lib/database/schema/product.schema";
import { Criteria } from "@/lib/types/criteria";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { subMonths } from "date-fns";
import { and, count, eq, gte } from "drizzle-orm";
import { Brand } from "../domain/brand";
import { Category } from "../domain/category";
import { ItemTypeEnum } from "../domain/item-type";
import { Product } from "../domain/product";
import { ProductStatusEnum } from "../domain/product-status";
import { ProductRepository } from "../domain/product.repository";
import { Unit } from "../domain/unit";

export class DrizzleProductRepository implements ProductRepository {
  private converter = new DrizzleCriteriaConverter(product);
  async save(data: Product): Promise<void> {
    const { unit, brand, categories, ...productData } = data.toPrimitives();
    await database
      .insert(product)
      .values({
        ...productData,
        unitId: unit?.id ?? "",
        brandId: brand?.id ?? "",
      })
      .onConflictDoUpdate({
        target: product.id,
        set: {
          ...productData,
          unitId: unit?.id ?? "",
          brandId: brand?.id ?? "",
        },
      });
    await database.delete(product_category).where(eq(product_category.productId, productData.id));
    await database.insert(product_category).values(
      categories.map((category) => ({
        productId: productData.id,
        categoryId: category.id,
      })),
    );
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
      status: result.status as ProductStatusEnum,
      type: result.type as ItemTypeEnum,
      categories: productCategories.map((pc) => ({
        id: pc.category.id,
        name: pc.category.name,
        organizationId: pc.category.organizationId,
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
        status: result.status as ProductStatusEnum,
        type: result.type as ItemTypeEnum,
        categories: productCategories.map((pc) => ({
          id: pc.category.id,
          name: pc.category.name,
          organizationId: pc.category.organizationId,
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

  async units(): Promise<Unit[]> {
    const result = await database.select().from(unit);
    return result.map((row) => Unit.fromPrimitives(row));
  }

  async metrics(organizationId: Uuid) {
    const totalProducts = await database
      .select({ count: count(product.id) })
      .from(product)
      .where(eq(product.organizationId, organizationId.value));
    const totalProductsThisMonth = await database
      .select({ count: count(product.id) })
      .from(product)
      .where(
        and(
          eq(product.organizationId, organizationId.value),
          gte(product.createdAt, subMonths(new Date(), 1)),
        ),
      );
    const totalActiveProducts = await database
      .select({ count: count(product.id) })
      .from(product)
      .where(and(eq(product.organizationId, organizationId.value), eq(product.status, "active")));
    return {
      totalProducts: totalProducts[0].count,
      totalProductsThisMonth: totalProductsThisMonth[0].count,
      totalActiveProducts: totalActiveProducts[0].count,
    };
  }

  async saveCategory(data: Category): Promise<void> {
    const categoryData = data.toPrimitives();
    await database.insert(category).values(categoryData).onConflictDoUpdate({
      target: category.id,
      set: categoryData,
    });
  }

  async categories(criteria: Criteria): Promise<Category[]> {
    const converter = new DrizzleCriteriaConverter(category);
    const { where, limit, offset, orderBy } = converter.criteria(criteria);
    const result = await database
      .select()
      .from(category)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);
    return result.map((row) => Category.fromPrimitives(row));
  }

  async category(criteria: Criteria): Promise<Category | null> {
    const converter = new DrizzleCriteriaConverter(category);
    const { where } = converter.criteria(criteria);
    const result = await database.select().from(category).where(where).limit(1);
    if (result.length === 0) return null;
    return Category.fromPrimitives(result[0]);
  }

  async saveBrand(data: Brand): Promise<void> {
    const brandData = data.toPrimitives();
    await database.insert(brand).values(brandData).onConflictDoUpdate({
      target: brand.id,
      set: brandData,
    });
  }

  async brands(criteria: Criteria): Promise<Brand[]> {
    const converter = new DrizzleCriteriaConverter(brand);
    const { where, limit, offset, orderBy } = converter.criteria(criteria);
    const result = await database
      .select()
      .from(brand)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);
    return result.map((row) => Brand.fromPrimitives(row));
  }

  async brand(criteria: Criteria): Promise<Brand | null> {
    const converter = new DrizzleCriteriaConverter(brand);
    const { where } = converter.criteria(criteria);
    const result = await database.select().from(brand).where(where).limit(1);
    if (result.length === 0) return null;
    return Brand.fromPrimitives(result[0]);
  }
}
