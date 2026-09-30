"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = { icon: LucideIcon; title: string };

// Titre de bloc : la pastille tourne en entrant et le filet se trace de gauche à droite.
export default function AboutHeading({ icon: Icon, title }: Props) {
  return (
    <motion.div
      className="mb-6 flex items-center gap-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span
        className="grid size-10 shrink-0 place-items-center rounded-full bg-bordeaux-dark text-white"
        variants={{ hidden: { scale: 0, rotate: -90 }, show: { scale: 1, rotate: 0 } }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        whileHover={{ rotate: 12, scale: 1.08 }}
      >
        <Icon className="size-5" />
      </motion.span>
      <motion.h3
        className="font-serif text-2xl font-bold text-bordeaux-dark sm:text-[1.75rem]"
        variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h3>
      <motion.span
        className="h-px flex-1 origin-left bg-bordeaux/30"
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
      />
    </motion.div>
  );
}