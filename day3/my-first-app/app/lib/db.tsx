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
const count = sqlite.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
if (count.count === 0) {
    sqlite.exec(`
    INSERT INTO posts (title, content, slug, description, author, image, category) VALUES
    ('Bài viết đầu', 'Nội dung bài viết đầu tiên về Next.js', 'bai-viet-1', 'Học Next.js cơ bản', 'Senlyzer', '/blog-nextjs.jpg', 'Next.js'),
    ('Bài viết thứ hai', 'Nội dung bài viết thứ hai về React', 'bai-viet-2', 'Tìm hiểu về React hooks', 'Senlyzer', '/blog-react.jpg', 'React')
  `);
}

export const getAllProducts = () => {
    const post = sqlite.prepare('SELECT * FROM posts').all();
    return post;
}

export const getProductByCategory = (category: string) => {
    const post = sqlite.prepare('SELECT * FROM posts WHERE category = ?').all(category);
    return post;
}

export const db = drizzle(sqlite, { schema });
