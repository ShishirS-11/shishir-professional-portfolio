"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-emerald-400/10 px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            Experience
          </p>

          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Where I&apos;ve been
            <br />
            <span className="text-white/25">
              building and learning.
            </span>
          </h2>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="tech-card mt-16 rounded-3xl p-7 md:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="flex items-center gap-2 text-sm text-emerald-300/50">
                <CalendarDays size={15} />
                <span>15-week internship</span>
              </div>

              <h3 className="mt-6 text-2xl font-medium">
                Artificial Intelligence &amp; Generative AI
              </h3>

              <p className="mt-2 text-white/40">
                Internship experience
              </p>
            </div>

            <div>
              <p className="text-lg leading-8 text-white/60">
                Practical work across machine learning, deep learning,
                NLP, model evaluation and generative AI workflows.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Machine Learning",
                  "Deep Learning",
                  "CNN & RNN",
                  "NLP",
                  "Model Evaluation",
                  "Generative AI",
                  "Prompt Engineering",
                  "Responsible AI",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.02] px-4 py-3 text-sm text-white/40"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm text-emerald-300/65 transition hover:text-emerald-300"
              >
                Let&apos;s connect

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}