import { Star, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteProject, toggleFeatured, updateProjectImage } from "@/app/admin/actions";
import ImageUploader from "@/components/admin/ImageUploader";
import NewProjectForm from "@/components/admin/NewProjectForm";

export const dynamic = "force-dynamic";

export default async function CreationsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-bold text-bordeaux-deep">Créations</h1>
      <p className="mb-6 text-sm text-ink/60">Les créations alimentent le portfolio de l&apos;accueil.</p>

      <NewProjectForm />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.id} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-rose-soft">
            <ImageUploader
              folder="projects"
              defaultValue={p.image}
              onChange={updateProjectImage.bind(null, p.id)}
              label={p.title}
            />
            <div className="flex items-center justify-between gap-2 px-1 pt-2">
              <div>
                <h2 className="font-semibold text-bordeaux-deep">{p.title}</h2>
                <p className="text-sm text-ink/60">{p.category}</p>
              </div>
              <div className="flex gap-1">
                <form action={toggleFeatured.bind(null, p.id, p.featured)}>
                  <button
                    title={p.featured ? "Masquer de l'accueil" : "Afficher sur l'accueil"}
                    aria-label={p.featured ? "Masquer de l'accueil" : "Afficher sur l'accueil"}
                    className="rounded-full p-2 hover:bg-rose-pale"
                  >
                    <Star className={`size-4 ${p.featured ? "fill-bordeaux text-bordeaux" : "text-ink/40"}`} />
                  </button>
                </form>
                <form action={deleteProject.bind(null, p.id)}>
                  <button title="Supprimer" aria-label="Supprimer la création" className="rounded-full p-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
      {projects.length === 0 && <p className="text-ink/60">Aucune création pour le moment. Ajoutez la première ci-dessus.</p>}
    </div>
  );
}