"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-rose-pale">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-bordeaux">
            CRÉATIVITÉ · DESIGN · COMMUNICATION
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-bordeaux-deep sm:text-5xl lg:text-6xl">
            Bienvenue dans mon univers <span className="text-bordeaux">créatif</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink/80">
            Je donne vie à vos idées à travers des créations uniques, alliant esthétique, stratégie et sens pour des
            projets qui font la différence.
          </p>
          <Link
            href="#services"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-bordeaux px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-bordeaux-dark"
          >
            Découvrir mes services
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute bottom-6 left-0 size-40 rounded-full bg-rose-soft" />
          <div className="absolute right-6 top-1/3 size-44 rounded-full bg-rose-soft/70" />
          <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-bordeaux to-bordeaux-deep" />
          <div className="absolute right-[28%] top-0 h-full w-2 bg-bordeaux" />
          <Leaf className="absolute right-[8%] top-[20%] size-24 text-bordeaux" strokeWidth={1.4} />
          <div className="absolute bottom-[22%] right-[18%] size-5 rounded-full bg-bordeaux" />
        </motion.div>
      </div>

      <p className="pointer-events-none absolute right-8 top-16 hidden -rotate-12 font-script text-4xl text-bordeaux xl:block">
        Des idées qui prennent vie
      </p>
    </section>
  );
}
