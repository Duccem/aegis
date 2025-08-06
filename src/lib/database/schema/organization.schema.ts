import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user.schema";

export const organization = pgTable("organization", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  metadata: text("metadata"),
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

