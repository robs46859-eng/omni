import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role === "ADMIN";
}

export async function ensureAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error("Unauthorized: Admin role required for this action.");
  }
  return true;
}