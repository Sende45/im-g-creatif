"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { addProject } from "@/app/admin/actions";
import ImageUploader from "@/components/admin/ImageUploader";

const field = "w-full rounded-lg border border-rose-soft px-3 py-2 text-sm outline-none focus:border-bordeaux";

export default function NewProjectForm() {
  // Changer la clé remet le formulaire (et l'image) à zéro après l'ajout.
  const [formKey, setFormKey] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function submit(formData: FormData) {
    await addProject(formData);
    setFormKey((k) => k + 1);
  }

  return (
    <form
      key={formKey}
      action={submit}
      className="mb-8 grid gap-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-soft md:grid-cols-[16rem_1fr]"
    >
      <ImageUploader folder="projects" name="image" label="Image de la création" onBusyChange={setUploading} />

      <div className="grid content-start gap-3">
        <h2 className="font-serif text-lg font-semibold text-bordeaux-deep">Nouvelle création</h2>
        <input name="title" required placeholder="Titre (ex : Branding)" className={field} />
        <input name="category" required placeholder="Catégorie (ex : Identité visuelle)" className={field} />
        <label className="flex items-center gap-2 text-sm">
          <input name="featured" type="checkbox" defaultChecked className="accent-bordeaux" />
          Afficher sur la page d&apos;accueil
        </label>
        <button
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 justify-self-start rounded-full bg-bordeaux px-5 py-2 text-sm font-semibold text-white hover:bg-bordeaux-dark disabled:cursor-wait disabled:opacity-60"
        >
          <Plus className="size-4" /> {uploading ? "Envoi de l'image…" : "Ajouter la création"}
        </button>
      </div>
    </form>
  );
}