"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkCredentials, createSession, destroySession, requireAdmin } from "@/lib/auth";
import {
  deleteCloudinaryImage,
  isCloudinaryUrl,
  signUpload,
  type UploadFolder,
  type UploadSignature,
} from "@/lib/cloudinary";

function revalidateSite() {
  revalidatePath("/");
}

// ---------- Images (Cloudinary) ----------
// Signe un upload : le navigateur envoie ensuite le fichier directement à Cloudinary.
export async function getUploadSignature(folder: UploadFolder): Promise<UploadSignature> {
  await requireAdmin();
  return signUpload(folder);
}

// ---------- Profil « Qui suis-je ? » ----------
export async function updateProfilePhoto(url: string | null) {
  await requireAdmin();
  const photo = url && isCloudinaryUrl(url) ? url : null;
  const previous = await prisma.profile.findUnique({ where: { id: 1 } });

  await prisma.profile.upsert({ where: { id: 1 }, update: { photo }, create: { id: 1, photo } });
  if (previous?.photo && previous.photo !== photo) await deleteCloudinaryImage(previous.photo);

  revalidateSite();
  revalidatePath("/admin/profil");
}

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
    data: {
      title,
      category,
      image: image && isCloudinaryUrl(image) ? image : null,
      featured: formData.get("featured") === "on",
    },
  });
  revalidateSite();
  revalidatePath("/admin/creations");
}

export async function updateProjectImage(id: number, url: string | null) {
  await requireAdmin();
  const image = url && isCloudinaryUrl(url) ? url : null;
  const previous = await prisma.project.findUnique({ where: { id } });
  if (!previous) return;

  await prisma.project.update({ where: { id }, data: { image } });
  if (previous.image && previous.image !== image) await deleteCloudinaryImage(previous.image);

  revalidateSite();
  revalidatePath("/admin/creations");
}

export async function toggleFeatured(id: number, featured: boolean) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { featured: !featured } });
  revalidateSite();
  revalidatePath("/admin/creations");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  const project = await prisma.project.delete({ where: { id } });
  await deleteCloudinaryImage(project.image);
  revalidateSite();
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