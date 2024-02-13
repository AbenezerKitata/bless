import { auth } from "./auth";
import { DEFAULT_LOGIN_REDIRECT, signIn } from "@/routes";

/**
 * Middleware function that handles authentication.
 *
 * @param req - The request object.
 * @returns A redirect response based on the authentication status and the requested URL.
 */
export default auth((req) => {
  // req.auth
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isSignInRoute = signIn === nextUrl.pathname;
  console.log(nextUrl.pathname);

  if (isLoggedIn && isSignInRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if (!isLoggedIn && !isSignInRoute) {
    return Response.redirect(new URL(signIn, nextUrl));
  }
});
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
