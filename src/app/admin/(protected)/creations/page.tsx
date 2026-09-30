import Image from "next/image";
import { Plus, Star, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { addProject, deleteProject, toggleFeatured } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const field = "w-full rounded-lg border border-rose-soft px-3 py-2 text-sm outline-none focus:border-bordeaux";

export default async function CreationsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-bold text-bordeaux-deep">Créations</h1>

      <form action={addProject} className="mb-8 grid gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-soft sm:grid-cols-2">
        <input name="title" required placeholder="Titre (ex : Branding)" className={field} />
        <input name="category" required placeholder="Catégorie (ex : Identité visuelle)" className={field} />
        <input name="image" type="url" placeholder="Lien de l'image Cloudinary" className={`${field} sm:col-span-2`} />
        <label className="flex items-center gap-2 text-sm">
          <input name="featured" type="checkbox" defaultChecked className="accent-bordeaux" />
          Afficher sur la page d&apos;accueil
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-bordeaux px-5 py-2 text-sm font-semibold text-white hover:bg-bordeaux-dark">
          <Plus className="size-4" /> Ajouter la création
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-rose-soft">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-bordeaux to-bordeaux-deep">
              {p.image && <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover" />}
            </div>
            <div className="flex items-center justify-between gap-2 p-4">
              <div>
                <h2 className="font-semibold text-bordeaux-deep">{p.title}</h2>
                <p className="text-sm text-ink/60">{p.category}</p>
              </div>
              <div className="flex gap-1">
                <form action={toggleFeatured.bind(null, p.id, p.featured)}>
                  <button title="Afficher / masquer sur l'accueil" className="rounded-full p-2 hover:bg-rose-pale">
                    <Star className={`size-4 ${p.featured ? "fill-bordeaux text-bordeaux" : "text-ink/40"}`} />
                  </button>
                </form>
                <form action={deleteProject.bind(null, p.id)}>
                  <button title="Supprimer" className="rounded-full p-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
      {projects.length === 0 && <p className="text-ink/60">Aucune création pour le moment.</p>}
    </div>
  );
}
