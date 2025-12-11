import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    author: text('author'),
    image: text('image'),
    category: text('category'),
});
