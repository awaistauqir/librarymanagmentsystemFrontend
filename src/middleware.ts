import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";
import {
  ROLES,
  isAdminPage,
  isLibrarianPage,
  isUserPage,
} from "./lib/role-page";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequest) {
    const session = await getToken({ req });
    const requestedPage = req.nextUrl.pathname;

    // Exculde pages that don't require authentication
    if (session) {
      if (
        requestedPage.includes("login") ||
        requestedPage.startsWith("/forgotPassword") ||
        requestedPage.includes("/auth")
      ) {
        return NextResponse.redirect(req.nextUrl.origin);
      }
      const userRoles = (session as unknown as Session)?.user?.roles.map(
        (role) => role.name
      );
      if (
        requestedPage === "/assets" &&
        (userRoles.includes(ROLES.LIBRARION) || userRoles.includes(ROLES.USER))
      )
        return;

      // Common pages for all roles
      if (requestedPage === "/" || requestedPage === "/changePassword") return;
      // User Pages
      if (!userRoles.includes(ROLES.USER)) {
        if (isUserPage(requestedPage)) {
          return NextResponse.redirect(req.nextUrl.origin + "/denied");
        }
      }
      // Librarian Pages
      else if (!userRoles.includes(ROLES.LIBRARION)) {
        if (isLibrarianPage(requestedPage)) {
          return NextResponse.redirect(req.nextUrl.origin + "/denied");
        }
      }
      // Admin Pages
      else if (!userRoles.includes(ROLES.ADMIN))
        if (isAdminPage(requestedPage)) {
          return NextResponse.redirect(req.nextUrl.origin + "/denied");
        }
    }
    // Account verfication pages that don't require authentication
    if (!session) {
      if (requestedPage.includes("verifyAccount")) return;
      return NextResponse.redirect("/login");
    }
  },
  {
    pages: {
      signIn: "/login",
      // signOut: "/login",
      error: "/500",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
