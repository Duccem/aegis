import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  activeOrganizationId: uuid("active_organization_id"),
  activeTeamId: uuid("active_team_id"),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const organization = pgTable("organization", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  metadata: text("metadata"),
  plan: text("plan").notNull().default("free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const member = pgTable("member", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invitation = pgTable("invitation", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  inviterId: uuid("inviter_id")
    .notNull()
    .references(() => user.id),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id),
  role: text("role").notNull(),
  status: text("status").notNull(),
  teamId: uuid("team_id"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const team = pgTable("team", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const team_member = pgTable("team_member", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  teamId: uuid("team_id")
    .notNull()
    .references(() => team.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const organization_metrics = pgTable("organization_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id),
  organizationMembers: integer("organization_members").notNull().default(0),
  aiCompletions: integer("ai_completions").notNull().default(0),
  productsCreated: integer("products_created").notNull().default(0),
  invoiceSent: integer("invoice_sent").notNull().default(0),
});

export const item_status = pgEnum("item_status", ["active", "inactive", "archived"]);
export const item_types = pgEnum("item_types", ["product", "service"]);

export const item = pgTable("item", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description").notNull(),
  status: item_status("status").notNull().default("active"),
  type: item_types("type").notNull().default("product"),
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

export const item_category = pgTable(
  "item_category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    itemId: uuid("item_id")
      .notNull()
      .references(() => item.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "restrict" }),
  },
  (table) => [uniqueIndex("item_category_unique").on(table.itemId, table.categoryId)],
);

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
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id, { onDelete: "cascade" }),
  storeId: uuid("store_id")
    .notNull()
    .references(() => store.id, { onDelete: "cascade" }),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  quantity: real("quantity").default(0.0).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const stock_movement_type = pgEnum("stock_movement_type", [
  "addition",
  "removal",
  "transfer",
]);

export const stock_movement = pgTable("stock_movement", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id, { onDelete: "cascade" }),
  storeId: uuid("store_id")
    .notNull()
    .references(() => store.id, { onDelete: "cascade" }),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  type: stock_movement_type("type").notNull().default("addition"),
  quantity: numeric("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// RELATIONS

export const organization_relations = relations(organization, ({ one, many }) => ({
  metrics: one(organization_metrics, {
    fields: [organization.id],
    references: [organization_metrics.organizationId],
  }),
  members: many(member),
  invitations: many(invitation),
  teams: many(team),
}));

export const item_relations = relations(item, ({ many, one }) => ({
  itemCategories: many(item_category),
  unit: one(unit, {
    fields: [item.unitId],
    references: [unit.id],
  }),
  brand: one(brand, {
    fields: [item.brandId],
    references: [brand.id],
  }),
  stocks: many(stock),
  stockMovements: many(stock_movement),
}));

export const category_relations = relations(category, ({ many }) => ({
  itemCategories: many(item_category),
}));

export const product_category_relations = relations(item_category, ({ one }) => ({
  product: one(item, {
    fields: [item_category.itemId],
    references: [item.id],
  }),
  category: one(category, {
    fields: [item_category.categoryId],
    references: [category.id],
  }),
}));

export const brand_relations = relations(brand, ({ many }) => ({
  items: many(item),
}));
export const unit_relations = relations(unit, ({ many }) => ({
  items: many(item),
}));

export const store_relations = relations(store, ({ many }) => ({
  stocks: many(stock),
  stockMovements: many(stock_movement),
}));

export const stock_relations = relations(stock, ({ one }) => ({
  item: one(item, {
    fields: [stock.itemId],
    references: [item.id],
  }),
  store: one(store, {
    fields: [stock.storeId],
    references: [store.id],
  }),
}));
