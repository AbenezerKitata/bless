import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
// import Keycloak from "next-auth/providers/keycloak";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
    } & User;
  }

  interface User {
    foo: string;
  }
}

export default {
  debug: false,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Keycloak,
  ].filter(Boolean) as NextAuthConfig["providers"],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
      }
      return token;
    },
  },
  basePath: "/auth",
} satisfies NextAuthConfig;
