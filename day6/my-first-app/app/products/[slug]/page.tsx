export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    return {
        title: slug,
    }
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    return (
        <div>
            <h1>Product: {slug}</h1>
            <p>This is the product page for {slug}</p>
        </div>
    )
}