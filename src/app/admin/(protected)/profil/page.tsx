import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateProfilePhoto } from "@/app/admin/actions";
import ImageUploader from "@/components/admin/ImageUploader";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-bold text-bordeaux-deep">Qui suis-je ?</h1>
      <p className="mb-6 text-sm text-ink/60">
        Le portrait affiché dans la section « Qui suis-je ? » de l&apos;accueil. Il est enregistré dès la fin de l&apos;envoi.
      </p>

      <section className="max-w-sm rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-soft">
        <h2 className="mb-3 font-semibold text-bordeaux-deep">Photo de portrait</h2>
        <ImageUploader folder="profile" defaultValue={profile?.photo} onChange={updateProfilePhoto} aspect="aspect-[5/6]" label="Portrait" />
        <p className="mt-3 text-xs text-ink/60">Format portrait conseillé, au moins 800 × 960 px.</p>
      </section>

      <Link href="/#qui-suis-je" target="_blank" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bordeaux hover:underline">
        Voir la section <ExternalLink className="size-4" />
      </Link>
    </div>
  );
}