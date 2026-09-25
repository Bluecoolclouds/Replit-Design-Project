import { pgTable, text, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const modelPricesTable = pgTable("stratus_model_prices", {
  id: text("id").primaryKey(),
  provider: text("provider").notNull(),
  model: text("model").notNull(),
  inputUsdPerMillion: numeric("input_usd_per_million", { precision: 12, scale: 6 }).notNull(),
  outputUsdPerMillion: numeric("output_usd_per_million", { precision: 12, scale: 6 }).notNull(),
  published: boolean("published").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertModelPriceSchema = createInsertSchema(modelPricesTable).omit({ updatedAt: true });
export type InsertModelPrice = z.infer<typeof insertModelPriceSchema>;
export type ModelPrice = typeof modelPricesTable.$inferSelect;