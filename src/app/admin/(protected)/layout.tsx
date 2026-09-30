import Link from "next/link";
import { ExternalLink, Images, LayoutDashboard, LogOut, Mail } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

const menu = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/creations", label: "Créations", icon: Images },
  { href: "/admin/messages", label: "Demandes", icon: Mail },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-rose-pale md:flex">
      <aside className="bg-bordeaux-deep text-white md:min-h-screen md:w-60">
        <p className="px-6 py-5 font-serif text-xl font-bold">IM G Créatif</p>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col">
          {menu.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
              <Icon className="size-4" /> {label}
            </Link>
          ))}
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            <ExternalLink className="size-4" /> Voir le site
          </Link>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
              <LogOut className="size-4" /> Déconnexion
            </button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-8">{children}</main>
    </div>
  );
}



