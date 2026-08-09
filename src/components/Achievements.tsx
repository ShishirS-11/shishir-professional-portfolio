"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowUpRight } from "lucide-react";

export default function Achievements() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="tech-card rounded-[2rem] p-8 md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                <Trophy
                  size={25}
                  className="text-emerald-300/65"
                />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/45">
                Achievement
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                First Prize.
                <br />

                <span className="text-white/25">
                  Built, presented, recognized.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Agri Vision won First Prize at the RNSIT
                Intra-Department Project Exhibition 2025.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.025] px-4 py-2 text-xs text-emerald-300/50">
                  RNS Institute of Technology
                </span>

                <span className="rounded-full border border-emerald-400/10 px-4 py-2 text-xs text-white/35">
                  2025
                </span>
              </div>

              <a
                href="#projects"
                className="group mt-8 inline-flex items-center gap-2 text-sm text-emerald-300/65 transition hover:text-emerald-300"
              >
                See the project

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}