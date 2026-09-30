import Link from "next/link";
import { Mail, Save, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteMessage, updateMessage } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const statuses = [
  { value: "nouveau", label: "Nouveau", color: "bg-bordeaux text-white" },
  { value: "en_cours", label: "En cours", color: "bg-amber-100 text-amber-800" },
  { value: "traite", label: "Traité", color: "bg-green-100 text-green-800" },
];

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const filter = status || undefined;
  const messages = await prisma.contactMessage.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-4 font-serif text-3xl font-bold text-bordeaux-deep">Demandes de contact</h1>

      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <Link href="/admin/messages" className={`rounded-full px-4 py-1.5 ${!filter ? "bg-bordeaux-deep text-white" : "bg-white"}`}>
          Toutes
        </Link>
        {statuses.map((s) => (
          <Link key={s.value} href={`/admin/messages?status=${s.value}`} className={`rounded-full px-4 py-1.5 ${filter === s.value ? "bg-bordeaux-deep text-white" : "bg-white"}`}>
            {s.label}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {messages.map((m) => {
          const current = statuses.find((s) => s.value === m.status) ?? statuses[0];
          return (
            <article key={m.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-soft">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-bordeaux-deep">{m.name}</h2>
                  <p className="text-sm text-ink/60">
                    {m.email} · {m.createdAt.toLocaleString("fr-FR")}
                    {m.pack && ` · ${m.pack}`}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${current.color}`}>{current.label}</span>
              </div>

              <p className="mb-4 whitespace-pre-line text-sm">{m.message}</p>

              <form action={updateMessage.bind(null, m.id)} className="flex flex-wrap items-center gap-2">
                <select name="status" defaultValue={m.status} className="rounded-lg border border-rose-soft px-3 py-2 text-sm">
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <input name="note" defaultValue={m.note ?? ""} placeholder="Note interne" className="min-w-48 flex-1 rounded-lg border border-rose-soft px-3 py-2 text-sm" />
                <button className="inline-flex items-center gap-1 rounded-full bg-bordeaux px-4 py-2 text-sm text-white hover:bg-bordeaux-dark">
                  <Save className="size-4" /> Enregistrer
                </button>
                <Link href={`mailto:${m.email}?subject=Votre demande - IM G Créatif`} className="inline-flex items-center gap-1 rounded-full border border-bordeaux px-4 py-2 text-sm text-bordeaux">
                  <Mail className="size-4" /> Répondre
                </Link>
              </form>
              <form action={deleteMessage.bind(null, m.id)} className="mt-2">
                <button className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline">
                  <Trash2 className="size-3" /> Supprimer
                </button>
              </form>
            </article>
          );
        })}
        {messages.length === 0 && <p className="text-ink/60">Aucune demande.</p>}
      </div>
    </div>
  );
}
