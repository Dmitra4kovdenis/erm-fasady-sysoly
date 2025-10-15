import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

console.log("middleware", process.env.DATABASE_URL);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  if (
    url.startsWith("/_next") ||
    url.startsWith("/api") ||
    url.startsWith("/auth/")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));

  try {
    await jose.jwtVerify(token, secret);
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!login|_next|api).*)"] };
