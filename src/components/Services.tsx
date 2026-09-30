"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/components/icons";
import type { ServiceItem } from "@/lib/content";

export default function Services({ services }: { services: ServiceItem[] }) {
  return (
    <section id="services" className="bg-white/50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-4">
          <span className="hidden h-0.5 w-14 bg-bordeaux sm:block" />
          <div>
            <h2 className="font-serif text-3xl font-bold text-bordeaux-deep">
              Mes <span className="text-bordeaux">services</span>
            </h2>
            <p className="text-sm text-ink/70">Des solutions créatives pour donner vie à vos projets.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.a
                href="#contact"
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-soft/60 transition hover:shadow-xl hover:shadow-bordeaux/10"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-rose-soft/50 text-bordeaux transition group-hover:bg-bordeaux group-hover:text-white">
                  <Icon className="size-7" />
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-lg font-semibold text-bordeaux-deep">
                    {service.title}
                  </span>
                  <span className="block text-sm text-ink/70">{service.description}</span>
                </span>
                <ArrowRight className="size-4 text-bordeaux transition group-hover:translate-x-1" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}