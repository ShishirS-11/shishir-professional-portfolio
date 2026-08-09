"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  Database,
  BrainCircuit,
  BarChart3,
} from "lucide-react";

const areas = [
  {
    number: "01",
    title: "Software",
    description:
      "Building applications, APIs and practical software that solve real problems.",
    icon: Code2,
    tags: ["Python", "JavaScript", "REST APIs", "Web"],
  },
  {
    number: "02",
    title: "Cloud",
    description:
      "Understanding how applications move from localhost to reliable cloud infrastructure.",
    icon: Cloud,
    tags: ["Azure", "AWS", "Linux", "Deployment"],
  },
  {
    number: "03",
    title: "Databases",
    description:
      "Working with structured and unstructured data and the systems behind applications.",
    icon: Database,
    tags: ["SQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    number: "04",
    title: "Data",
    description:
      "Turning raw data into useful information through analysis, processing and visualization.",
    icon: BarChart3,
    tags: ["Pandas", "NumPy", "Analytics", "Visualization"],
  },
  {
    number: "05",
    title: "AI / ML",
    description:
      "Building intelligent systems using machine learning, deep learning and computer vision.",
    icon: BrainCircuit,
    tags: ["Scikit-learn", "TensorFlow", "Keras", "OpenCV"],
  },
];

export default function CareerFocus() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            What I&apos;m into
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              Five areas.
              <br />
              <span className="text-white/25">
                One direction.
              </span>
            </h2>

            <p className="max-w-md text-base leading-7 text-white/40">
              I&apos;m interested in the complete journey — writing
              the code, working with the data, deploying the
              application and making the system useful.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => {
            const Icon = area.icon;

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="tech-card group relative overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1 hover:bg-[#0c1511]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400/35">
                    {area.number}
                  </span>

                  <Icon
                    size={21}
                    strokeWidth={1.5}
                    className="text-emerald-400/45 transition group-hover:text-emerald-300"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-2xl font-medium tracking-tight">
                    {area.title}
                  </h3>

                  <p className="mt-4 min-h-[84px] text-sm leading-7 text-white/35">
                    {area.description}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-400/[0.04] px-3 py-1.5 text-xs text-emerald-300/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}