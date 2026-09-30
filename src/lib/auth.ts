import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

const COOKIE = "admin_session";

function token() {
  const secret = process.env.ADMIN_SECRET ?? "";
  return createHmac("sha256", secret).update("admin").digest("hex");
}

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

// Vérifie l'identifiant et le mot de passe dans la base de données
export async function checkCredentials(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return false;
  return verifyPassword(password, admin.passwordHash);
}

export async function createSession() {
  const store = await cookies();
  store.set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin() {
  const store = await cookies();
  const value = store.get(COOKIE)?.value;
  return !!value && !!process.env.ADMIN_SECRET && same(value, token());
}

// À appeler en haut de chaque page et action du back-office
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}