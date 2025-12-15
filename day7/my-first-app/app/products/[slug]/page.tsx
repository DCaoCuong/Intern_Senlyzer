'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductPage() {
    const params = useParams<{ slug: string }>()
    const [product, setProduct] = useState(null)

    const productIdentifier = params.slug

    useEffect(() => {
        fetch(`/api/products/${productIdentifier}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error('Error fetching product:', err))
    }, [productIdentifier])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product: {productIdentifier}</h1>
            <p className="text-gray-600">This is the product page for {productIdentifier}</p>

            {product && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <pre>{JSON.stringify(product, null, 2)}</pre>
                </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded text-sm">
                <strong>Debug Info:</strong>
                <ul>
                    <li>params.slug: {params.slug}</li>
                    <li>Product Identifier: {productIdentifier}</li>
                </ul>
            </div>
        </div>
    )
}
