import { NextResponse } from "next/server";
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];

const OPEN_ROUTES = ["/", "/_next", "/favicon.ico", "/api/auth"];


export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    const isOpenRoute = OPEN_ROUTES.some((route) => pathname.startsWith(route));
    if (isOpenRoute) return NextResponse.next();

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

    
    if (!token) {
        
        if (!isPublicRoute) {
            const loginUrl = new URL("/login", request.url);
           
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    if (token) {
        
        if (isPublicRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};