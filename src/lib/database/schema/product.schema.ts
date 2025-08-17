import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { organization } from "./organization.schema";

export const productStatus = pgEnum("product_status", ["active", "inactive", "archived"]);

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description").notNull(),
  cost: real("cost").notNull(),
  price: real("price").notNull(),
  status: productStatus("status").notNull().default("active"),
  images: text("image")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  unitId: uuid("unit_id")
    .notNull()
    .references(() => unit.id, { onDelete: "restrict" }),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brand.id, { onDelete: "restrict" }),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const unit = pgTable("unit", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  abbreviation: text("abbreviation").notNull(),
  divisible: boolean("divisible").notNull().default(false),
});

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const brand = pgTable("brand", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const product_category = pgTable(
  "product_category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "restrict" }),
  },
  (table) => [uniqueIndex("product_category_unique").on(table.productId, table.categoryId)],
);

export const product_relations = relations(product, ({ many, one }) => ({
  productCategories: many(product_category),
  unit: one(unit, {
    fields: [product.unitId],
    references: [unit.id],
  }),
  brand: one(brand, {
    fields: [product.brandId],
    references: [brand.id],
  }),
}));

export const category_relations = relations(category, ({ many }) => ({
  productCategories: many(product_category),
}));

export const product_category_relations = relations(product_category, ({ one }) => ({
  product: one(product, {
    fields: [product_category.productId],
    references: [product.id],
  }),
  category: one(category, {
    fields: [product_category.categoryId],
    references: [category.id],
  }),
}));

export const brand_relations = relations(brand, ({ many }) => ({
  products: many(product),
}));
export const unit_relations = relations(unit, ({ many }) => ({
  products: many(product),
}));
