"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.E. Artificial Intelligence & Data Science",
    institution: "RNS Institute of Technology",
    period: "2022 — 2026",
    location: "Bengaluru",
    result: "CGPA: 7.77 / 10",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Data Structures & Algorithms",
      "DBMS",
      "Computer Vision",
      "Cloud Computing",
      "OOP",
    ],
  },
  {
    degree: "Pre-University · PCMC",
    institution: "Sri Venkatramana PU College",
    period: "2022",
    location: "Kundapura",
    result: "PCMC",
    coursework: [],
  },
];

export default function Education() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            Education
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Where I&apos;ve
            <br />
            <span className="text-white/25">
              learned the fundamentals.
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 space-y-4">
          {education.map((item, index) => (
            <motion.article
              key={item.institution}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="tech-card rounded-3xl p-7 md:p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                    <GraduationCap
                      size={20}
                      className="text-emerald-300/55"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-medium">
                      {item.degree}
                    </h3>

                    <p className="mt-2 text-sm text-white/40">
                      {item.institution}
                    </p>

                    <p className="mt-1 text-sm text-white/25">
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="md:text-right">
                  <p className="text-sm text-white/35">
                    {item.period}
                  </p>

                  <p className="mt-2 text-sm text-emerald-300/60">
                    {item.result}
                  </p>
                </div>
              </div>

              {item.coursework.length > 0 && (
                <div className="mt-7 border-t border-emerald-400/10 pt-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.15em] text-emerald-400/35">
                    Relevant coursework
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-white/40"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}