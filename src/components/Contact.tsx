"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact({ packs }: { packs: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [pack, setPack] = useState("");

  useEffect(() => {
    const onChoose = (e: Event) => setPack((e as CustomEvent<string>).detail);
    window.addEventListener("choose-pack", onChoose);
    return () => window.removeEventListener("choose-pack", onChoose);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Une erreur est survenue.");
      setStatus("success");
      form.reset();
      setPack("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  const field =
    "w-full rounded-lg border border-rose-soft bg-white px-4 py-3 text-sm outline-none transition focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/20";

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionTitle
            eyebrow="CONTACT"
            title="Parlons de votre projet"
            subtitle="Une idée, un besoin, une question ? Écrivez-moi, je vous réponds rapidement."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-rose-soft/60 sm:grid-cols-2">
            <input name="name" required placeholder="Votre nom" className={field} />
            <input name="email" type="email" required placeholder="Votre e-mail" className={field} />
            <select
              name="pack"
              value={pack}
              onChange={(e) => setPack(e.target.value)}
              className={`${field} sm:col-span-2`}
            >
              <option value="">Pack souhaité (facultatif)</option>
              {packs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Décrivez votre projet…"
              className={`${field} sm:col-span-2`}
            />

            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-full bg-bordeaux px-6 py-3 text-sm font-semibold text-white transition hover:bg-bordeaux-dark disabled:opacity-60"
              >
                {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Envoyer
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-700"
                  >
                    <CheckCircle2 className="size-4" /> Merci, votre message a bien été envoyé !
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}