"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

// Lien de navigation : sur l'accueil, un lien "/#section" défile directement
// jusqu'à la section, sans recharger la page depuis le serveur.
export default function NavLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (pathname !== "/" || !href.startsWith("/#") || e.metaKey || e.ctrlKey) return;

    const target = document.getElementById(href.slice(2));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}