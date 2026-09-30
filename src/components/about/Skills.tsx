"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Clapperboard,
  Globe,
  Languages,
  ListChecks,
  Megaphone,
  PenTool,
  Share2,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";
import AboutHeading from "@/components/about/AboutHeading";
import SocialIcons from "@/components/SocialIcons";
import type { SkillItem } from "@/lib/content";

const skillIcons: Record<string, LucideIcon | "Ps"> = {
  adobe: "Ps",
  wordpress: Globe,
  pen: PenTool,
  video: Clapperboard,
  megaphone: Megaphone,
  checklist: ListChecks,
  target: Target,
  languages: Languages,
};

function SkillIcon({ name }: { name: string }) {
  const Icon = skillIcons[name] ?? Star;
  return (
    <motion.span
      className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-soft/70 text-bordeaux-dark"
      whileHover={{ scale: 1.15, rotate: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
    >
      {Icon === "Ps" ? (
        <span className="grid size-6 place-items-center rounded-[5px] bg-bordeaux-dark text-[10px] font-bold text-white">Ps</span>
      ) : (
        <Icon className="size-5" />
      )}
    </motion.span>
  );
}

function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? skill.level : 0);
  const delay = index * 0.08;

  // Le pourcentage compte jusqu'à sa valeur en même temps que la barre se remplit.
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, skill.level, {
      duration: 1.1,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, skill.level, delay]);

  return (
    <motion.li
      ref={ref}
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay }}
    >
      <SkillIcon name={skill.icon} />
      <div className="flex-1">
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-ink/90">{skill.label}</span>
          <span className="text-xs tabular-nums text-ink/60">{count}%</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-rose-soft/60"
          role="progressbar"
          aria-label={skill.label}
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="relative h-full overflow-hidden rounded-full bg-bordeaux"
            initial={{ width: reduce ? `${skill.level}%` : "0%" }}
            animate={inView ? { width: `${skill.level}%` } : undefined}
            transition={{ duration: 1.1, delay, ease: "easeOut" }}
          >
            {/* Reflet qui balaie la barre */}
            <motion.span
              className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ left: "-2rem" }}
              animate={inView ? { left: "100%" } : undefined}
              transition={{ duration: 1.4, delay: delay + 1.1, repeat: Infinity, repeatDelay: 5 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.li>
  );
}

export default function Skills({ items }: { items: SkillItem[] }) {
  return (
    <div>
      <AboutHeading icon={Star} title="Compétences" />
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {items.map((s, i) => (
          <SkillRow key={s.label} skill={s} index={i} />
        ))}
      </ul>

      <motion.div
        className="mt-8 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="grid size-10 place-items-center rounded-full bg-bordeaux-dark text-white">
          <Share2 className="size-5" />
        </span>
        <h4 className="font-serif text-lg font-semibold text-bordeaux-dark">Réseaux sociaux</h4>
        <SocialIcons variant="dark" networks={["linkedin", "instagram", "facebook", "behance", "mail"]} />
      </motion.div>
    </div>
  );
}