"use client";

import { MotionConfig } from "framer-motion";
import AboutIntro from "@/components/about/AboutIntro";
import Formations from "@/components/about/Formations";
import Skills from "@/components/about/Skills";
import { formations, skills } from "@/lib/content";

// Section « Qui suis-je ? » de l'accueil. MotionConfig coupe les animations
// si le visiteur a demandé moins de mouvement dans son système.
export default function About({ photo }: { photo: string | null }) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="qui-suis-je" className="scroll-mt-16 border-t border-rose-soft/70 bg-white/40">
        <AboutIntro photo={photo} />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-bordeaux/15">
          <div className="lg:pr-10">
            <Formations items={formations} />
          </div>
          <div className="lg:pl-10">
            <Skills items={skills} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}