"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    number: "01",
    title: "Agri Vision",
    category: "AI / ML · IoT · Edge Computing",
    description:
      "An AI-powered soil monitoring and crop recommendation system connecting real-world sensor data with machine learning.",
    story:
      "The system combines soil classification, environmental sensing and machine learning to provide practical crop recommendations.",
    technologies: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Raspberry Pi",
      "OpenCV",
      "IoT",
    ],
    result: "First Prize · RNSIT Project Exhibition 2025",
    github: "https://github.com/ShishirS-11/MAJOR-PROJECT",
  },
  {
    number: "02",
    title: "Lyrical Link",
    category: "AI / ML · Computer Vision · API",
    description:
      "An emotion-based music recommendation system connecting facial emotion recognition with music recommendations.",
    story:
      "The project explores how computer vision and machine learning can be used to create a more personalized music experience.",
    technologies: [
      "Python",
      "OpenCV",
      "TensorFlow",
      "CNN",
      "Spotify API",
    ],
    result: "Emotion-based music recommendations",
    github: "#",
  },
  {
    number: "03",
    title: "Shoe Store Management System",
    category: "Software · Database · Web",
    description:
      "A database-backed application designed around the core operations of a shoe store.",
    story:
      "Built as a practical software project with a focus on products, inventory, orders and database-backed application logic.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "MySQL",
    ],
    result: "Database-backed application",
    github: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-emerald-400/10 px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            Selected work
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              Things I&apos;ve
              <br />
              <span className="text-white/25">
                actually built.
              </span>
            </h2>

            <p className="max-w-md text-base leading-7 text-white/40">
              A mix of AI, software, data and hardware projects —
              each built around a practical problem.
            </p>
          </div>
        </motion.div>

        <div className="space-y-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className="tech-card group overflow-hidden rounded-3xl transition duration-500 hover:bg-[#0b1511]"
            >
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="border-b border-emerald-400/10 p-7 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400/35">
                      {project.number}
                    </span>

                    <span className="text-right text-xs text-white/25">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-16 text-3xl font-medium tracking-tight md:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-5 text-base leading-7 text-white/40">
                    {project.description}
                  </p>

                  <div className="mt-8 inline-flex rounded-full border border-emerald-400/10 bg-emerald-400/[0.025] px-4 py-2 text-xs text-emerald-300/55">
                    {project.result}
                  </div>
                </div>

                <div className="p-7 lg:p-10">
                  <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                    The idea
                  </p>

                  <p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">
                    {project.story}
                  </p>

                  <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                      Built with
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-white/40"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-400/10 px-5 py-3 text-sm text-white/50 transition hover:border-emerald-400/30 hover:text-emerald-300"
                    >
                      <FaGithub size={16} />

                      GitHub

                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}