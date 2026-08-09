"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  Database,
  BrainCircuit,
  BarChart3,
  Wrench,
} from "lucide-react";

const skillGroups = [
  {
    title: "Software Development",
    icon: Code2,
    description:
      "Building applications, APIs and practical software.",
    skills: [
      "Python",
      "C",
      "JavaScript",
      "HTML",
      "CSS",
      "REST APIs",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    description:
      "Understanding how applications run beyond localhost.",
    skills: [
      "Microsoft Azure",
      "AWS",
      "Linux",
      "Git",
      "GitHub",
      "Vertex AI",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    description:
      "Working with application data and database systems.",
    skills: [
      "SQL",
      "MySQL",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Data",
    icon: BarChart3,
    description:
      "Turning raw data into useful information.",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Data Analysis",
      "Jupyter",
    ],
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    description:
      "Building intelligent systems and ML-driven applications.",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "OpenCV",
      "NLP",
    ],
  },
  {
    title: "Tools & GenAI",
    icon: Wrench,
    description:
      "Tools I use to experiment, build and automate.",
    skills: [
      "Prompt Engineering",
      "LLMs",
      "ChatGPT",
      "Git",
      "Linux",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
            The toolkit
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
              The stuff I
              <br />
              <span className="text-white/25">
                work with.
              </span>
            </h2>

            <p className="max-w-md text-base leading-7 text-white/40">
              A growing toolkit across software, cloud, databases,
              data, machine learning and generative AI.
            </p>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                }}
                className="tech-card rounded-3xl p-7 transition duration-500 hover:bg-[#0c1511]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                    <Icon
                      size={19}
                      strokeWidth={1.5}
                      className="text-emerald-300/60"
                    />
                  </div>

                  <span className="text-xs text-emerald-400/25">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-medium">
                  {group.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/35">
                  {group.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-white/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="tech-card mt-8 rounded-3xl p-6 md:p-8"
        >
          <p className="text-sm text-emerald-400/45">
            Currently leveling up
          </p>

          <p className="mt-3 text-lg text-white/60">
            Cloud architecture · Backend development · Databases ·
            Data engineering
          </p>
        </motion.div>
      </div>
    </section>
  );
}