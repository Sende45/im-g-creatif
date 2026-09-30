"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkCredentials, createSession, destroySession, requireAdmin } from "@/lib/auth";


// ---------- Connexion ----------
export async function login(formData: FormData) {
  const user = String(formData.get("user") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!(await checkCredentials(user, password))) redirect("/admin/login?error=1");
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ---------- Créations ----------
export async function addProject(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  if (!title || !category) return;

  await prisma.project.create({
    data: { title, category, image: image || null, featured: formData.get("featured") === "on" },
  });
  revalidatePath("/");
  revalidatePath("/admin/creations");
}

export async function toggleFeatured(id: number, featured: boolean) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { featured: !featured } });
  revalidatePath("/");
  revalidatePath("/admin/creations");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/creations");
}

// ---------- Demandes de contact ----------
export async function updateMessage(id: number, formData: FormData) {
  await requireAdmin();
  const status = String(formData.get("status") ?? "nouveau");
  const note = String(formData.get("note") ?? "").trim();
  await prisma.contactMessage.update({ where: { id }, data: { status, note: note || null } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}



