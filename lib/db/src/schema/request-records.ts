import { pgTable, text, uuid, timestamp, integer, index, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { accountsTable } from "./accounts";
import { apiKeysTable } from "./api-keys";

export const requestRecordsTable = pgTable("stratus_request_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: text("account_id").notNull().references(() => accountsTable.id),
  keyId: uuid("key_id").references(() => apiKeysTable.id),
  keyName: text("key_name").notNull(),
  model: text("model").notNull(),
  transport: text("transport").notNull(),
  status: text("status").notNull(),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  chargedCents: integer("charged_cents").notNull().default(0),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("stratus_requests_account_created_idx").on(table.accountId, table.createdAt),
  check("stratus_requests_amounts_nonnegative", sql`${table.inputTokens} >= 0 AND ${table.outputTokens} >= 0 AND ${table.chargedCents} >= 0`),
]);

export const insertRequestRecordSchema = createInsertSchema(requestRecordsTable).omit({ id: true, createdAt: true });
export type InsertRequestRecord = z.infer<typeof insertRequestRecordSchema>;
export type RequestRecord = typeof requestRecordsTable.$inferSelect;