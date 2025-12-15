export async function GET(request: Request) {
    const headers = Object.fromEntries(request.headers.entries())
    return Response.json({ headers })
}
