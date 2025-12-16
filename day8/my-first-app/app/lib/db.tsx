import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
export { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    author TEXT,
    image TEXT,
    category TEXT
  )
`);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    category TEXT
  )
`);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    theme TEXT DEFAULT 'light',
    language TEXT DEFAULT 'en',
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  )
`);

const countPost = sqlite.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
if (countPost.count === 0) {
  sqlite.exec(`
    INSERT INTO posts (title, content, slug, description, author, image, category) VALUES
    ('Bài viết đầu', 'Nội dung bài viết đầu tiên về Next.js', 'bai-viet-1', 'Học Next.js cơ bản', 'Senlyzer', '/blog-nextjs.jpg', 'Next.js'),
    ('Bài viết thứ hai', 'Nội dung bài viết thứ hai về React', 'bai-viet-2', 'Tìm hiểu về React hooks', 'Senlyzer', '/blog-react.jpg', 'React')
  `);
}

const countProduct = sqlite.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (countProduct.count === 0) {
  sqlite.exec(`
    INSERT INTO products (name, price) VALUES
    ('Sản phẩm 1', '100'),
    ('Sản phẩm 2', '200')
  `);
}

export const getAllPosts = () => {
  const posts = sqlite.prepare('SELECT * FROM posts').all();
  return posts;
}

export const getPostBySlug = (slug: string) => {
  const post = sqlite.prepare('SELECT * FROM posts WHERE slug = ?').get(slug);
  return post;
}

export const getAllProducts = () => {
  const products = sqlite.prepare('SELECT * FROM products').all();
  return products;
}

export const getProductByCategory = (category: string) => {
  const products = sqlite.prepare('SELECT * FROM products WHERE category = ?').all(category);
  return products;
}

export const insertProduct = (name: string, price: string, category: string) => {
  const product = sqlite.prepare('INSERT INTO products (name, price, category) VALUES (?, ?, ?)').run(name, price, category);
  return product;
}

export const updateProduct = (id: number, name: string, price: string, category: string) => {
  const product = sqlite.prepare('UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?').run(name, price, category, id);
  return product;
}

export const deleteProduct = (id: number) => {
  const product = sqlite.prepare('DELETE FROM products WHERE id = ?').run(id);
  return product;
}

export const db = drizzle(sqlite, { schema });