import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth" || path === "/"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // If the path is public and the user is authenticated, redirect to dashboard
  if (isPublicPath && token) {
    try {
      const payload = await verifyToken(token)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // If token verification fails, continue to the public path
    }
  }

  // If the path is not public and the user is not authenticated, redirect to auth
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  return NextResponse.next()
}

// Configure which paths Middleware will run on
export const config = {
  matcher: ["/", "/auth", "/dashboard/:path*"],
}

