import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });

  // Allow access to auth pages and NextAuth API routes without authentication
  if (
    req.nextUrl.pathname.startsWith("/auth") ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Redirect to auth page if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
