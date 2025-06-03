import { getSessionCookie } from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server"


export default function middleware(req: NextRequest) {
  const { nextUrl } = req
  const sessionCookie = getSessionCookie(req)
  const res = NextResponse.next()
  const isLoggedIn = !!sessionCookie
  const pathname = nextUrl.pathname
  if (pathname.startsWith('/auth') && isLoggedIn) {
    return NextResponse.redirect(new URL('/profile', req.url))
  } else if (!pathname.startsWith('/auth') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
