"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { aboutProfile as p } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const textItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// Trait manuscrit qui se dessine.
function Stroke({ d, className, delay = 0 }: { d: string; className: string; delay?: number }) {
  return (
    <svg viewBox="0 0 160 20" className={className} aria-hidden>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}

// La photo se gère depuis l'admin : /admin/profil
export default function AboutIntro({ photo }: { photo: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  // Parallaxe légère des formes décoratives pendant le défilement.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const circleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const barY = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  const initials = p.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Note manuscrite gauche (très grand écran) */}
      <motion.div
        className="pointer-events-none absolute left-10 top-16 hidden w-44 font-script text-3xl leading-tight text-bordeaux 2xl:block"
        initial={{ opacity: 0, rotate: -24, y: 20 }}
        whileInView={{ opacity: 1, rotate: -12, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6, ease }}
      >
        {p.noteLeft}
        <Stroke d="M2 16C50 6 110 4 158 8" className="mt-1 w-40" delay={1.2} />
      </motion.div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,20rem)_1fr_auto] lg:gap-12 lg:py-20">
        {/* Portrait */}
        <div className="relative mx-auto aspect-[5/6] w-64 sm:w-72 lg:w-full">
          <motion.div style={{ y: circleY }} className="absolute -left-12 top-[8%]" aria-hidden>
            <motion.div
              className="size-48 rounded-full bg-bordeaux"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 90, damping: 14 }}
            />
          </motion.div>
          <motion.div
            className="absolute -left-4 bottom-[10%] h-[45%] w-16 rounded-b-3xl bg-rose-soft"
            aria-hidden
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div style={{ y: barY }} className="absolute -left-2 bottom-[4%] h-[42%] w-2" aria-hidden>
            <motion.div
              className="h-full w-full origin-bottom bg-bordeaux"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            />
          </motion.div>

          {/* Un rideau bordeaux se retire et la photo se resserre */}
          <motion.div
            className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-bordeaux to-bordeaux-deep shadow-xl"
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.15, ease }}
            >
              {photo ? (
                <Image src={photo} alt={`Portrait de ${p.name}`} fill sizes="(min-width: 1024px) 20rem, 18rem" className="object-cover" />
              ) : (
                <div className="grid h-full place-items-center font-serif text-6xl text-white/80" aria-hidden>
                  {initials}
                </div>
              )}
            </motion.div>
            <motion.div
              className="absolute inset-0 origin-top bg-bordeaux-deep"
              aria-hidden
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            />
          </motion.div>
        </div>

        {/* Présentation */}
        <motion.div variants={textGroup} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.p variants={textItem} className="mb-2 text-xs font-semibold tracking-[0.3em] text-bordeaux">
            À PROPOS DE MOI
          </motion.p>
          <motion.h2 variants={textItem} className="font-serif text-4xl font-bold text-bordeaux-deep sm:text-5xl">
            Qui suis-je{" "}
            <motion.span
              className="inline-block text-bordeaux"
              animate={{ rotate: [0, 14, -8, 0] }}
              transition={{ duration: 1.2, delay: 1.4, repeat: Infinity, repeatDelay: 4 }}
            >
              ?
            </motion.span>
          </motion.h2>
          <motion.p variants={textItem} className="mt-4 max-w-[34rem] text-ink/80">
            {p.bio}
          </motion.p>

          <motion.ul variants={textItem} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/80">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-bordeaux" />
              {p.location}
            </li>
            <li>
              <a href={`mailto:${p.email}`} className="group flex items-center gap-2 hover:text-bordeaux">
                <Mail className="size-4 text-bordeaux transition group-hover:-translate-y-0.5" />
                {p.email}
              </a>
            </li>
            <li>
              <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="group flex items-center gap-2 hover:text-bordeaux">
                <Phone className="size-4 text-bordeaux transition group-hover:rotate-12" />
                {p.phone}
              </a>
            </li>
          </motion.ul>

          <motion.div variants={textItem} className="mt-6 inline-block -rotate-3 font-script text-4xl text-bordeaux">
            {p.name}
            <Stroke d="M2 10C40 2 100 2 158 6" className="-mt-1 w-40" delay={1.1} />
          </motion.div>
        </motion.div>

        {/* Citation manuscrite */}
        <div className="hidden items-center gap-8 lg:flex">
          <motion.span
            className="h-40 w-px origin-top bg-ink/20"
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p
            className="w-44 font-script text-3xl leading-tight text-bordeaux"
            initial={{ opacity: 0, rotate: -24, x: 20 }}
            whileInView={{ opacity: 1, rotate: -12, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
          >
            {p.noteRight}{" "}
            <motion.span
              className="inline-block"
              aria-hidden
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
            >
              ♡
            </motion.span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}