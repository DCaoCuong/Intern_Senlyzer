import { headers } from 'next/headers'
import { cookies } from 'next/headers'

export async function GET() {
    const headersList = await headers()
    const cookieStore = await cookies()
    const userAgent = headersList.get('user-agent')
    const cookieValue = cookieStore.get('myCookie')?.value

    return Response.json({ userAgent, cookieValue })
} 
