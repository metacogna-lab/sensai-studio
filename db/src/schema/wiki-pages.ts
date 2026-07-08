import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const wikiPages = pgTable("wiki_pages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("draft"),
  tags: text("tags").array(),
  sourcePath: varchar("source_path", { length: 1024 }),
  checksum: varchar("checksum", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
