"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";

const certifications = [
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    credential: "AZ-900",
  },
  {
    title: "Microsoft Azure Data Fundamentals",
    issuer: "Microsoft",
    credential: "DP-900",
  },
  {
    title: "Vertex AI / Prompt Design",
    issuer: "Google",
    credential: "Course / Training",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
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
            Certifications
          </p>

          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Proof that I&apos;m
            <br />
            <span className="text-white/25">
              always learning.
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certificate, index) => (
            <motion.article
              key={certificate.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="tech-card rounded-3xl p-7 transition hover:bg-[#0c1511]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                  <Award
                    size={19}
                    className="text-emerald-300/60"
                  />
                </div>

                <ShieldCheck
                  size={18}
                  className="text-emerald-400/35"
                />
              </div>

              <h3 className="mt-8 text-xl font-medium">
                {certificate.title}
              </h3>

              <p className="mt-2 text-sm text-white/40">
                {certificate.issuer}
              </p>

              <div className="mt-6">
                <span className="rounded-full bg-emerald-400/[0.05] px-3 py-1.5 text-xs text-emerald-300/50">
                  {certificate.credential}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}