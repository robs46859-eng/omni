import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = new Set(["/login", "/api/auth/signin"]);

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/auth/") ||
    pathname === "/favicon.ico" ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$/.test(pathname)
  );
}

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdmin = token?.role === "ADMIN";

  // Redirect logged-in users away from public paths
  if (PUBLIC_PATHS.has(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/executive", req.url));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // Admin Route Protection (RBAC)
  const adminPaths = [
    "/dashboard/digital-it-girl",
    "/dashboard/niche-explorer",
    "/dashboard/global-intelligence",
    "/dashboard/autopitch",
    "/dashboard/workflows",
    "/dashboard/public-beta",
    "/dashboard/builder",
    "/dashboard/omniscale",
  ];

  const isInternalAdminPath = adminPaths.some((adminPath) => 
    pathname.startsWith(adminPath)
  );

  if (isInternalAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL("/executive", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};