import { NextResponse, NextRequest } from "next/server";

import { getCurrentUser } from "./services/auth-service";

const AuthRoutes = ["/signin", "/signup", "/forgot-password"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  ADMIN: [/^\/admin/],
  VENDOR: [/^\/vendor/],
  CUSTOMER: [/^\/user/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname);

  const user = await getCurrentUser();

  console.log(user);

  if (!user) {
    console.log("1st");
    if (AuthRoutes.includes(pathname)) {
      console.log("2nd");

      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/signin?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/admin",
    "/admin/:page*",
    "/vendor",
    "/vendor/:page*",
    "/user",
    "/user/:page*",
  ],
};
