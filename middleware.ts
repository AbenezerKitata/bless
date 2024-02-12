import { auth } from "./auth";
import { DEFAULT_LOGIN_REDIRECT, publicRoute } from "@/routes";

export default auth((req) => {
  // req.auth
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoute === nextUrl.pathname;

  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(publicRoute, nextUrl));
  }
});
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
