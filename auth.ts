import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/db";
import { ZodEnum } from "zod";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    role?: ZodEnum<["USER", "ADMIN", "SUPERADMIN"]>;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async signIn(message) {
      console.log("Sign In", message);
    },
    async signOut(message) {
      console.log("Sign Out", message);
    },
    async createUser(message) {
      console.log("Create User", message);
    },
    async updateUser(message) {
      console.log("Update User", message);
    },
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
    async session(message) {
      console.log("Session", message);
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    async authorized({ request, auth }) {
      if (!auth?.user) {
        console.log("not authorized!");
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      console.log("Session Token", token);

      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT Token", token);
      if (user) token.role = user.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // Set the maximum age of the session to 30 days (in seconds)
    updateAge: 24 * 60 * 60, // Update the session age every 24 hours (in seconds)
    // generateSessionToken: () => {
    //   // Custom function to generate session tokens
    //   // Implement your own logic here
    //   return "your-session-token";
    // },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          role: profile.role ?? "USER",
          image: profile.picture,
          name: profile.name,
          email: profile.email,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // EmailProvider({
    //   id: "email",
    //   name: "email",
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),

    // Resend({
    //   apiKey: process.env.EMAIL_SERVER_PASSWORD,
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: parseInt(process.env.EMAIL_SERVER_PORT!),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
} satisfies NextAuthConfig);
