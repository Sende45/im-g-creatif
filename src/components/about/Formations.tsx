"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import AboutHeading from "@/components/about/AboutHeading";
import type { FormationItem } from "@/lib/content";

export default function Formations({ items }: { items: FormationItem[] }) {
  return (
    <div>
      <AboutHeading icon={GraduationCap} title="Formations" />
      <ol className="space-y-4">
        {items.map((f, i) => (
          <motion.li
            key={f.degree}
            className="flex gap-4 rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-transparent transition-shadow hover:shadow-md hover:ring-rose-soft sm:gap-6 sm:p-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="flex shrink-0 items-center border-r border-bordeaux/15 pr-4 sm:pr-6">
              <motion.p
                className="grid w-16 place-items-center rounded-lg bg-bordeaux-dark py-3 text-center text-sm font-semibold leading-tight text-white"
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.25 + i * 0.15 }}
              >
                <span>{f.start}</span>
                <span aria-hidden>–</span>
                <span className="sr-only">à</span>
                <span>{f.end}</span>
              </motion.p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-bordeaux-deep">{f.degree}</h4>
              <p className="text-sm font-medium text-ink/90">{f.school}</p>
              <p className="text-sm text-ink/70">Spécialité : {f.specialty}</p>
              <p className="mt-2 text-sm text-ink/70">{f.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}