import { db } from '@/app/lib/db'
import { eq } from 'drizzle-orm'
import { products } from '@/app/lib/schema'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await db.select().from(products).where(eq(products.id, parseInt(id)))

    // Return the first result or null if not found
    return Response.json({ product: product[0] || null })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const body = await request.json()
    const updatePriceProduct = await db.update(products).set({ price: body.price }).where(eq(products.id, parseInt(id)))
    return Response.json({ updatePriceProduct })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const deleteProduct = await db.delete(products).where(eq(products.id, parseInt(id)))
    return Response.json({ deleteProduct })
}