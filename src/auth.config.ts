import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

import { CredentialsSchema } from "@/features/auth/schemas";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);
        
        if (!validatedFields.success) return null;
        
        const { email, password } = validatedFields.data;
        
        const query = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
        
        const user = query[0];
        
        if (!user || !user.password) return null;
        
        const passwordMatched = await bcrypt.compare(password, user.password);
        
        if (!passwordMatched) return null;
        
        return user;
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig