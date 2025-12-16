// import { cache } from 'react'
// import { cacheTag } from 'next/cache'

// export const getPost = cache(async (id: string) => {
//   const post = await db.query.posts.findFirst({
//     where: eq(posts.id, parseInt(id)),
//   })
// })

// export function getItem(id: string) {
//   'use cache'
//   cacheTag(`item-${id}`)
//   return db.query('SELECT * FROM items WHERE id = ?', [id]).then((rows) => rows[0])
// }

// export function checkIsAvailable() {
//   'use cache'
//   return db
//     .query('SELECT COUNT(*) as count FROM items WHERE available = 1')
//     .then((rows) => rows[0].count > 0)
// }

// export async function getProducts() {
//   'use cache'
//   cacheTag('products')

//   const products = await db.query('SELECT * FROM products')
//   return products
// }

import { posts } from '@/app/lib/schema';

import { db, eq } from '@/app/lib/db'
import { cache } from 'react'

// gọi 2 lần, nhưng chỉ chạy 1
export const getPost = cache(async (slug: string) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  return res
})

// export async function getPost(id: string) {
//   await new Promise(resolve => setTimeout(resolve, 1000)) //delay vài giây :))
//   return posts.find(p => p.id === parseInt(id))
// }

export async function getProducts() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, name: 'Sản phẩm 1', price: 100 },
    { id: 2, name: 'Sản phẩm 2', price: 200 },
  ]
}

export async function checkIsAvailable() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return true
}

export async function getItem(id: string) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { id, name: `Item ${id}`, description: `diễn tả cho item ${id}` }
}
