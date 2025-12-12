import { cacheLife } from 'next/cache'
import { db } from '@/app/lib/db'
import { products } from '@/app/lib/schema'

export async function GET() {
    const products = await db.query.products.findMany()
    return Response.json({ products })
}

// async function getAllProducts() {
//     'use-cache'
//     cacheLife('hours')

//     return await db.query.products.getAllProducts()
// }   

export async function POST(request: Request) {
    const body = await request.json()
    const insertProduct = await db.insert(products).values(body)
    return Response.json({ insertProduct })
}