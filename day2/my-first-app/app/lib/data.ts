import { cache } from 'react'
import { db, posts, eq } from '@/lib/db'
import { cacheTag } from 'next/cache'
 
export const getPost = cache(async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
  })
})

export function getItem(id: string) {
  'use cache'
  cacheTag(`item-${id}`)
  return db.query('SELECT * FROM items WHERE id = ?', [id]).then((rows) => rows[0])
}

export function checkIsAvailable() {
  'use cache'
  return db
    .query('SELECT COUNT(*) as count FROM items WHERE available = 1')
    .then((rows) => rows[0].count > 0)
}

export async function getProducts() {
  'use cache'
  cacheTag('products')
 
  const products = await db.query('SELECT * FROM products')
  return products
}