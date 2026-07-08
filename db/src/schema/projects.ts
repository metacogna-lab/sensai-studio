import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  type: varchar("type", { length: 50 }).notNull(),
  owner: varchar("owner", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  allowedPaths: text("allowed_paths").array(),
  loaderFile: varchar("loader_file", { length: 512 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
