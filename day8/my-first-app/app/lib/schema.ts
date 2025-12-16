import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

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

export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    price: text('price').notNull(),
    category: text('category'),
});

export const preferences = sqliteTable('preferences', {
  id: integer('id').primaryKey(),
  userId: text('user_id').notNull(),          
  theme: text('theme').default('light'),      
  language: text('language').default('en'),   
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});