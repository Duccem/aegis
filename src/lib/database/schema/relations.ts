import { relations } from "drizzle-orm";
import {
  invitation,
  member,
  organization,
  organization_metrics,
  team,
} from "./organization.schema";
import { brand, category, product, product_category, unit } from "./product.schema";
import { stock, stock_movement, store } from "./store.schema";

export const organization_relations = relations(organization, ({ one, many }) => ({
  metrics: one(organization_metrics, {
    fields: [organization.id],
    references: [organization_metrics.organizationId],
  }),
  members: many(member),
  invitations: many(invitation),
  teams: many(team),
}));

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
  stocks: many(stock),
  stockMovements: many(stock_movement),
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

export const store_relations = relations(store, ({ many }) => ({
  stocks: many(stock),
  stockMovements: many(stock_movement),
}));

export const stock_relations = relations(stock, ({ one }) => ({
  product: one(product, {
    fields: [stock.productId],
    references: [product.id],
  }),
  store: one(store, {
    fields: [stock.storeId],
    references: [store.id],
  }),
}));
