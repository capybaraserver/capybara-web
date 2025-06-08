import { getSessionCookie } from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest) {
  const { nextUrl } = req
  const sessionCookie = getSessionCookie(req)
  const res = NextResponse.next()
  const isLoggedIn = !!sessionCookie
  const pathname = nextUrl.pathname                                 
  if (!isLoggedIn) {
    if (pathname.startsWith('/auth')) {
      return res
    }
  } else {
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/profile', req.url))                                                
    }
    return res
  }
  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
