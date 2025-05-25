import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').primaryKey().notNull().unique(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
