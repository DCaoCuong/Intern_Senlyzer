import { db } from '@/app/lib/db'
import { eq } from 'drizzle-orm'
import { products } from '@/app/lib/schema'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = db.select().from(products).where(eq(products.id, parseInt(id)))
    return Response.json({ product })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const body = await request.json()
    const updatePriceProduct = db.update(products).set({ price: body.price }).where(eq(products.id, parseInt(id)))
    return Response.json({ updatePriceProduct })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const deleteProduct = db.delete(products).where(eq(products.id, parseInt(id)))
    return Response.json({ deleteProduct })
}