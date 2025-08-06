import { sql } from "drizzle-orm";
import { boolean, pgEnum, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const conceptTypeEnum = pgEnum("concept_type", ["product", "service"]);
export const conceptStatusEnum = pgEnum("concept_status", ["draft", "active", "archived"]);

export const concept = pgTable("concept", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description").notNull(),
  type: conceptTypeEnum("type").notNull().default("product"),
  status: conceptStatusEnum("status").notNull().default("draft"),
  internal: boolean("internal").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  conceptId: uuid("concept_id")
    .notNull()
    .unique()
    .references(() => concept.id, { onDelete: "cascade" }),
  cost: real("cost").notNull(),
  price: real("price").notNull(),
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const service = pgTable("service", {
  id: uuid("id").primaryKey().defaultRandom(),
  conceptId: uuid("concept_id")
    .notNull()
    .unique()
    .references(() => concept.id, { onDelete: "cascade" }),
  price: real("price").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const unit = pgTable("unit", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const cargory = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const brand = pgTable("brand", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const conceptCategory = pgTable("concept_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  conceptId: uuid("concept_id")
    .notNull()
    .references(() => concept.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => cargory.id, { onDelete: "restrict" }),
});
