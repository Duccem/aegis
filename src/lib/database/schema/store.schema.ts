import { numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { organization } from "./organization.schema";
import { product } from "./product.schema";

export const store_status = pgEnum("store_status", ["active", "inactive", "closed"]);

export const store = pgTable("store", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  status: store_status("status").notNull().default("active"),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const stock = pgTable("stock", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  storeId: uuid("store_id")
    .notNull()
    .references(() => store.id, { onDelete: "cascade" }),
  quantity: numeric("quantity").default("0").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const stock_movement_type = pgEnum("stock_movement_type", [
  "addition",
  "removal",
  "transfer",
]);

export const stock_movement = pgTable("stock_movement", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  storeId: uuid("store_id")
    .notNull()
    .references(() => store.id, { onDelete: "cascade" }),
  type: stock_movement_type("type").notNull().default("addition"),
  quantity: numeric("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
