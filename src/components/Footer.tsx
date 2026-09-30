import Link from "next/link";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import { navLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-rose-pale">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6">
        <Logo className="h-9 w-auto text-bordeaux" />
        <nav className="flex flex-wrap gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-bordeaux">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <SocialIcons variant="dark" />
          <span className="h-6 w-px bg-ink/30" />
          <span className="text-sm">IM G Créatif</span>
        </div>
      </div>
      <p className="border-t border-rose-soft py-4 text-center text-xs text-ink/60">
        © {new Date().getFullYear()} IM G Créatif. Tous droits réservés.
      </p>
    </footer>
  );
}
