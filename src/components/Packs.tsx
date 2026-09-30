"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import { getIcon } from "@/components/icons";
import type { PackItem } from "@/lib/content";

export default function Packs({ packs }: { packs: PackItem[] }) {
  // Pré-sélectionne le pack dans le formulaire de contact
  const choose = (name: string) => {
    window.dispatchEvent(new CustomEvent("choose-pack", { detail: name }));
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pack" className="relative overflow-hidden bg-bordeaux-deep py-16 text-white">
      <div className="absolute -left-24 top-10 size-72 rounded-full bg-bordeaux/40" />
      <div className="absolute -right-20 bottom-0 size-64 rounded-full bg-bordeaux/30" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2.4fr]">
        <Reveal>
          <SectionTitle
            light
            eyebrow="MON PACK"
            title="Pack réalisation"
            subtitle="Une offre complète pour concrétiser vos projets de communication."
          />
          <Link
            href="#contact"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white px-5 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-bordeaux-deep"
          >
            Découvrir le pack
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-5 pt-4 sm:grid-cols-3">
          {packs.map((pack, i) => {
            const Icon = getIcon(pack.icon);
            const popular = pack.popular;
            return (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-xl p-5 shadow-xl ${
                  popular ? "bg-bordeaux text-white ring-2 ring-rose-soft sm:-translate-y-3" : "bg-white text-ink"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-soft px-3 py-1 text-[10px] font-bold text-bordeaux-deep">
                    LE PLUS POPULAIRE
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-11 place-items-center rounded-full ${
                      popular ? "bg-white text-bordeaux" : "bg-rose-soft/60 text-bordeaux"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{pack.name}</h3>
                    <p className={`text-xs ${popular ? "text-white/80" : "text-ink/60"}`}>{pack.tagline}</p>
                  </div>
                </div>
                <p className={`mt-4 font-serif text-3xl font-bold ${popular ? "text-white" : "text-bordeaux"}`}>
                  {pack.price} €
                </p>
                <button
                  onClick={() => choose(pack.name)}
                  className={`mt-4 w-full rounded-full py-2 text-sm font-semibold transition ${
                    popular
                      ? "bg-white text-bordeaux hover:bg-rose-soft"
                      : "bg-bordeaux text-white hover:bg-bordeaux-dark"
                  }`}
                >
                  Choisir
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-6 right-6 hidden -rotate-12 font-script text-3xl text-white/90 xl:block">
        Des idées aujourd&apos;hui,
        <br />
        de grandes choses demain
      </p>
    </section>
  );
}



