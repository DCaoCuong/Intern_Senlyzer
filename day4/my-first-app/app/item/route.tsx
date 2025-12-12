export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const res = await fetch('https://data.mongodb-api.com/abc', {
        headers: {
            'Content-Type': 'application/json',
            'API-key': process.env.API_KEY!,
        },
    })
    const data = await res.json()

    return Response.json({ data })
}

