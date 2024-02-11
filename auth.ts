import NextAuth from "next-auth";
import authConfig from "auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/db";
import EmailProvider from "next-auth/providers/nodemailer";

authConfig.providers.push(
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  })
);
export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth(
  (request) => {
    if (request?.nextUrl.searchParams.get("test")) {
      return {
        adapter: PrismaAdapter(prisma),
        session: { strategy: "jwt" },
        ...authConfig,
        providers: [],
      };
    }
    return {
      adapter: PrismaAdapter(prisma),
      session: { strategy: "jwt" },
      ...authConfig,
    };
  }
);
