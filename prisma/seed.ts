import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { defaultPacks, defaultProjects, defaultServices } from "../src/lib/content";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // Contenu du site
  await prisma.service.deleteMany();
  await prisma.pack.deleteMany();
  await prisma.service.createMany({ data: defaultServices.map((s, i) => ({ ...s, order: i })) });
  await prisma.pack.createMany({ data: defaultPacks.map((p, i) => ({ ...p, order: i })) });

  // Créations d'exemple : seulement si aucune n'existe (pour ne pas effacer les vôtres)
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({ data: defaultProjects.map((p, i) => ({ ...p, order: i })) });
  }

  // Compte administrateur (identifiant et mot de passe lus dans le fichier .env)
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.warn("⚠ ADMIN_USER ou ADMIN_PASSWORD manquant dans .env : compte admin non créé.");
  } else {
    const passwordHash = hashPassword(password);
    await prisma.admin.upsert({
      where: { username },
      update: { passwordHash },
      create: { username, passwordHash },
    });
    console.log(`Compte admin « ${username} » prêt ✔`);
  }

  console.log("Base initialisée ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());