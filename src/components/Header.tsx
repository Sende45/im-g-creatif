"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, UserRound, X } from "lucide-react";
import { navLinks } from "@/lib/content";

const LOGO_URL = "https://res.cloudinary.com/lacnn0m0/image/upload/v1790446527/logo_TNT.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#accueil");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? "bg-rose-pale/90 shadow-sm backdrop-blur" : "bg-rose-pale"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="#accueil" aria-label="Accueil">
          <Image src={LOGO_URL} alt="Logo IM G Créatif" width={120} height={48} priority className="h-11 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm transition ${active === link.href ? "font-semibold text-bordeaux" : "text-ink hover:text-bordeaux"}`}
            >
              {link.label}
              {active === link.href && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 h-0.5 rounded bg-bordeaux" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="#contact" aria-label="Me contacter" className="grid size-9 place-items-center rounded-full bg-bordeaux-deep text-white">
            <UserRound className="size-5" />
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="grid size-9 place-items-center rounded-full text-bordeaux md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-rose-soft md:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-sm text-ink hover:bg-rose-soft/40">
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}



