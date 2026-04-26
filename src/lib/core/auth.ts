import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash, timingSafeEqual } from "node:crypto";
import { prisma } from "./db";

const bootstrapEmail = process.env.OMNI_BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase() || "";
const bootstrapPassword = process.env.OMNI_BOOTSTRAP_ADMIN_PASSWORD || "";
const bootstrapPasswordSha256 = process.env.OMNI_BOOTSTRAP_ADMIN_PASSWORD_SHA256?.trim().toLowerCase() || "";
const bootstrapName = process.env.OMNI_BOOTSTRAP_ADMIN_NAME || "OmniScale Admin";
const bootstrapRole = process.env.OMNI_BOOTSTRAP_ADMIN_ROLE === "VIEWER" ? "VIEWER" : process.env.OMNI_BOOTSTRAP_ADMIN_ROLE === "ANALYST" ? "ANALYST" : "ADMIN";

function sha256(value: string) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function isBootstrapCredentialMatch(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!bootstrapEmail || normalizedEmail !== bootstrapEmail) return false;

  if (bootstrapPasswordSha256) {
    return safeEqual(sha256(password), bootstrapPasswordSha256);
  }

  if (bootstrapPassword) {
    return safeEqual(password, bootstrapPassword);
  }

  return false;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (!isBootstrapCredentialMatch(credentials.email, credentials.password)) {
          return null;
        }

        const user = await prisma.user.upsert({
          where: { email: credentials.email.trim().toLowerCase() },
          update: {
            name: bootstrapName,
            role: bootstrapRole,
          },
          create: {
            email: credentials.email.trim().toLowerCase(),
            name: bootstrapName,
            role: bootstrapRole,
          },
        });

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },
};
