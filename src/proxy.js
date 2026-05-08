import { NextResponse } from "next/server";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register"];

// The default redirect when unauthenticated
const LOGIN_PAGE = "/login";

// The default redirect when already authenticated (e.g. visiting /login again)
const DEFAULT_AUTHENTICATED_REDIRECT = "/stories";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Grab the token — adjust the cookie name to match what authService.js sets
  const token =
    request.cookies.get("token")?.value ||
    request.cookies.get("authToken")?.value ||
    request.cookies.get("accessToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // ─── NOT logged in ───────────────────────────────────────────────────────────
  if (!token) {
    // Already heading to a public page — let them through
    if (isPublicRoute) return NextResponse.next();

    // Block the route and send to login, preserving the intended destination
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ─── Logged in ───────────────────────────────────────────────────────────────
  // Prevent authenticated users from seeing login/register again
  if (isPublicRoute) {
    return NextResponse.redirect(
      new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url)
    );
  }

  // Everything else — allow
  return NextResponse.next();
}

export const config = {
  /*
   * Match all routes EXCEPT:
   *  - Next.js internals (_next/static, _next/image)
   *  - Public assets (favicon.ico, images, fonts, etc.)
   *  - API routes if you want them unprotected (remove /api if you want them guarded)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};