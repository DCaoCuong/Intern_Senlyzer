import { NextResponse, NextRequest } from 'next/server'

// export const config = {
//     matcher: ['/home/:path*', '/dashboard/:path*'],
//     locale: false,
//     has: [
//         { type: 'header', key: 'Authorization', value: 'Bearer Token' },
//         { type: 'query', key: 'userId', value: '123' },
//     ],
//     missing: [{ type: 'cookie', key: 'session', value: 'active' }],
// }

// export const config = {
//     matcher: [
//         {
//             source: '/api/:path*',
//             locale: false,
//             has: [
//                 { type: 'header', key: 'Authorization', value: 'Bearer Token' },
//                 { type: 'query', key: 'userId', value: '123' },
//             ],
//             missing: [{ type: 'cookie', key: 'session', value: 'active' }],
//         },
//     ],
// }

// export const config = {
//   matcher: [
//     // Exclude API routes, static files, image optimizations, and .png files
//     '/((?!api|_next/static|_next/image|.*\\.png$).*)',
//   ],
// }

// Rewrite /old-blog/* thành /blog/*
// export function proxy(request: NextRequest) {
//     if (request.nextUrl.pathname.startsWith('/old-blog')) {
//         const url = request.nextUrl.clone()
//         url.pathname = url.pathname.replace('/old-blog', '/blog')
//         return NextResponse.rewrite(url)
//     }
// }

// Redirect /old-blog/* thành /blog/*
// export function proxy(request: NextRequest) {
//     if (request.nextUrl.pathname.startsWith('/old-blog')) {
//         return NextResponse.redirect(new URL('/blog', request.url))
//     }

//     // Redirect với điều kiện (ví dụ: geo-location)
//     const country = request.geo?.country || 'US'
//     if (country === 'VN' && !request.nextUrl.pathname.startsWith('/vn')) {
//         return NextResponse.redirect(new URL('/vn' + request.nextUrl.pathname, request.url))
//     }
// }

//Custom headers
// export function proxy(request: NextRequest) {
//     const response = NextResponse.next()

//     // Thêm custom header
//     response.headers.set('x-custom-header', 'abc-value')

//     // Thêm security headers
//     response.headers.set('X-Frame-Options', 'DENY')
//     response.headers.set('X-Content-Type-Options', 'nosniff')

//     return response
// }

//Authentication
// Kiểm tra Token
// export function proxy(request: NextRequest) {
//     // Lấy token từ cookies hoặc headers
//     const token = request.cookies.get('auth-token')?.value
//     // hoặc
//     // const token = request.headers.get('authorization')?.replace('Bearer ', '')

//     // Kiểm tra xem có token không
//     if (!token) {
//         // Redirect đến login nếu không có token
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//     // Validate token (ở đây chỉ là ví dụ đơn giản)
//     if (!isValidToken(token)) {
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//     // Token hợp lệ, cho phép tiếp tục
//     return NextResponse.next()
// }

// function isValidToken(token: string): boolean {
//     // Logic validate token (có thể verify JWT, check database, etc.)
//     return token.length > 0
// }

// // Chỉ áp dụng cho protected routes
// export const config = {
//     matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
// }

//Kiem tra Role-based access
// export function proxy(request: NextRequest) {
//     const token = request.cookies.get('auth-role')?.value

//     if (!token) {
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//     const userRole = getUserRoleFromToken(token)

//     if (userRole !== 'admin') {
//         return NextResponse.redirect(new URL('/unauthorized', request.url))
//     }
// }

// function getUserRoleFromToken(token: string): string {
//     // Logic validate token (có thể verify JWT, check database, etc.)
//     return 'user'
// }


//Rate limiting basic
// const rateLimit = new Map<string, { count: number, resetTime: number }>()

// export function proxy(request: NextRequest) {
//     const ip = request.ip || 'unknow'
//     const now = Date.now()
//     const limit = 10
//     const window = 60000

//     const userLimit = rateLimit.get(ip)

//     if (!userLimit || now > userLimit.resetTime) {
//         // reset bộ đếm
//         rateLimit.set(ip, { count: 1, resetTime: now + window })
//     } else if (userLimit.count >= limit) {
//         // Vượt quá giới hạn
//         return new NextResponse('Too Many Requests', { status: 429 })
//     } else {
//         // Tăng counter
//         userLimit.count++
//     }

//     return NextResponse.next()
// }

//Practice 
//1. Log console each request and Apply to all routes
// export function proxy(request: NextRequest) {
//     console.log(`${request.method} ${request.url}`)

//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/:path*'],
// }

//2. URL rewriting
// const rewriteRules = [
//     {
//         sourcePrefix: '/old-blog/',
//         destinationPrefix: '/blog/',
//         matcher: '/old-blog/:path*',
//     },
//     {
//         sourcePrefix: '/items/',
//         destinationPrefix: '/products/',
//         matcher: '/items/:path*',
//     },
// ]

// export function proxy(request: NextRequest) {
//     for (const rule of rewriteRules) {
//         if (request.nextUrl.pathname.startsWith(rule.sourcePrefix)) {
//             const newPathname = request.nextUrl.pathname.replace(rule.sourcePrefix, rule.destinationPrefix)
//             const newUrl = new URL(newPathname, request.url)
//             newUrl.search = request.nextUrl.search
//             return NextResponse.rewrite(newUrl)
//         }
//     }
//     return NextResponse.next()
// }

// export const config = {
//     matcher: rewriteRules.map(rule => rule.matcher),
// }

//3. Conditional Redirects
// export function proxy(request: NextRequest) {
//     if (request.nextUrl.pathname.startsWith('/premium')) {
//         const isPremium = request.cookies.get('isPremium')?.value;

//         if (!isPremium || isPremium === 'false') {
//             return NextResponse.redirect(new URL('/upgrade', request.url));
//         }
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: '/premium/:path*',
// };

//4. Authentication với Token
// export function proxy(request: NextRequest) {
//     const token = request.cookies.get('auth-token')?.value

//     if (!token) {
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/dashboard/:path*', '/profile/:path*'],
// }

//5. Custom Headers
export function proxy(request: NextRequest) {
    const response = NextResponse.next()

    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'no-referrer')

    // Custom headers
    response.headers.set('X-App-Version', '1.0.0')
    response.headers.set('X-Request-Time', new Date().toISOString())

    return response
}

// Apply to all routes :)))
export const config = {
    matcher: '/:path*',
}
