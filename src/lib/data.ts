import { prisma } from "@/lib/prisma";
import {
  defaultPacks,
  defaultProjects,
  defaultServices,
  type PackItem,
  type ProjectItem,
  type ServiceItem,
} from "@/lib/content";

// Lit la base ; si elle est vide ou injoignable, le site affiche le contenu par défaut.
export async function getHomeData(): Promise<{
  services: ServiceItem[];
  projects: ProjectItem[];
  packs: PackItem[];
}> {
  try {
    const [services, projects, packs] = await Promise.all([
      prisma.service.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.pack.findMany({ orderBy: { order: "asc" } }),
    ]);
    return {
      services: services.length ? services : defaultServices,
      projects: projects.length ? projects : defaultProjects,
      packs: packs.length ? packs : defaultPacks,
    };
  } catch (error) {
    console.warn("Base de données indisponible, contenu par défaut utilisé.", error);
    return { services: defaultServices, projects: defaultProjects, packs: defaultPacks };
  }
}

// Portrait de la section « Qui suis-je ? » (null tant qu'aucune photo n'a été envoyée).
export async function getProfilePhoto(): Promise<string | null> {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } });
    return profile?.photo ?? null;
  } catch {
    return null;
  }
}