"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import type { ProjectItem } from "@/lib/content";

export default function Portfolio({ projects }: { projects: ProjectItem[] }) {
  return (
    <section id="portfolio" className="py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2.4fr]">
        <Reveal>
          <SectionTitle
            eyebrow="MON PORTFOLIO"
            title="Mes dernières créations"
            subtitle="Découvrez quelques projets qui illustrent mon univers, ma créativité et mon engagement à donner vie à vos idées."
          />
          <Link
            href="#contact"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-bordeaux px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bordeaux-dark"
          >
            Voir tout le portfolio
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-bordeaux to-bordeaux-deep">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="grid h-full place-items-center font-serif text-2xl text-white/80 transition duration-500 group-hover:scale-110">
                    {project.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-bordeaux-deep/0 transition group-hover:bg-bordeaux-deep/20" />
              </div>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-bordeaux-deep">{project.title}</h3>
                  <p className="text-sm text-ink/70">{project.category}</p>
                </div>
                <ArrowRight className="size-4 text-bordeaux transition group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}



