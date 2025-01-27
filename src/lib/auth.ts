// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Google from "next-auth/providers/google";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      // console.log("Session Callback:", { session, user });
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      // If the URL contains an invite token, preserve it
      if (url.includes("inviteToken=")) {
        return url;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  events: {
    createUser: async ({}) => {
      // console.log("New user created:", user);
      // You can add additional logic here when a user is created
    },
    signIn: async ({}) => {
      // console.log("User signed in:", user);
      // You can add additional logic here when a user signs in
    },
  },
});
