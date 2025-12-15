export async function GET() {
    return Response.json({
        randomNum: Math.random()
    })
}