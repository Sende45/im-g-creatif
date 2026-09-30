import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { login } from "@/app/admin/actions";
import { isAdmin } from "@/lib/auth";

const field = "w-full rounded-lg border border-rose-soft px-4 py-3 outline-none focus:border-bordeaux";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-rose-pale px-4">
      <form action={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-rose-soft">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-bordeaux text-white">
            <LockKeyhole className="size-5" />
          </span>
          <div>
            <h1 className="font-serif text-2xl font-bold text-bordeaux-deep">Back-office</h1>
            <p className="text-sm text-ink/60">IM G Créatif</p>
          </div>
        </div>

        <label className="mb-2 block text-sm font-medium">Identifiant</label>
        <input name="user" required autoFocus autoComplete="username" className={field} />

        <label className="mb-2 mt-4 block text-sm font-medium">Mot de passe</label>
        <input name="password" type="password" required autoComplete="current-password" className={field} />

        {error && <p className="mt-3 text-sm text-red-600">Identifiant ou mot de passe incorrect.</p>}

        <button className="mt-6 w-full rounded-full bg-bordeaux py-3 font-semibold text-white hover:bg-bordeaux-dark">
          Se connecter
        </button>
      </form>
    </main>
  );
}
