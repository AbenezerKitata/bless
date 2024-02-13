import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { ZodEnum } from "zod";
import Google from "next-auth/providers/google";
import Email, { NodemailerConfig } from "next-auth/providers/nodemailer";
import { sendVerificationRequest } from "@/emails/sendVerificationRequest";

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
    async signIn() {
      // console.log("Sign In", message);
    },
    async signOut() {
      // console.log("Sign Out", message);
    },
    async createUser(message) {
      console.log("Create User", message);
    },
    async updateUser() {
      // console.log("Update User", message);
    },
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
    async session() {
      // console.log("Session", message);
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    async authorized({ auth }) {
      if (!auth?.user) {
        console.log("not authorized!");
        return false;
      }

      return true;
    },
    async session({ session }) {
      // console.log("Session Token", token);

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      // console.log("JWT Token", token);
      if (user) token.role = user.role;

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },

    async signIn({ account }) {
      // Allow OAuth without email verification
      if (account?.provider === "google") return true;
      return false;
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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }) as NodemailerConfig & { options: Record<string, unknown> },

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
