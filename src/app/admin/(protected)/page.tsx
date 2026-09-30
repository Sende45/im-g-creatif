import Link from "next/link";
import { Images, Inbox, Loader, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [projects, nouveau, enCours, traite] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count({ where: { status: "nouveau" } }),
    prisma.contactMessage.count({ where: { status: "en_cours" } }),
    prisma.contactMessage.count({ where: { status: "traite" } }),
  ]);

  const cards = [
    { label: "Nouvelles demandes", value: nouveau, icon: Inbox, href: "/admin/messages?status=nouveau" },
    { label: "En cours", value: enCours, icon: Loader, href: "/admin/messages?status=en_cours" },
    { label: "Traitées", value: traite, icon: CheckCircle2, href: "/admin/messages?status=traite" },
    { label: "Créations", value: projects, icon: Images, href: "/admin/creations" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-bold text-bordeaux-deep">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-soft hover:shadow-md">
            <Icon className="mb-3 size-6 text-bordeaux" />
            <p className="font-serif text-3xl font-bold text-bordeaux-deep">{value}</p>
            <p className="text-sm text-ink/60">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
