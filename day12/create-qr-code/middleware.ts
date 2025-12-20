export { auth as middleware } from "./auth"

export const config = {
    matcher: ["/checkout/:path*", "/dashboard/:path*", "/api/sepay-webhook", "/"],
}
