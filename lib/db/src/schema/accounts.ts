import { pgTable, text, integer, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const accountsTable = pgTable("stratus_accounts", {
  id: text("id").primaryKey(),
  balanceCents: integer("balance_cents").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [check("stratus_balance_nonnegative", sql`${table.balanceCents} >= 0`)]);

export const insertAccountSchema = createInsertSchema(accountsTable).omit({ createdAt: true });
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Account = typeof accountsTable.$inferSelect;