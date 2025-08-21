import { user } from "@/contexts/auth/user/infrastructure/drizzle-user-schema";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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

export const teamMember = pgTable("team_member", {
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
