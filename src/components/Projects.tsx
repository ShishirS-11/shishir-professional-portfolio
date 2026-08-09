"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  category: string | null;
  short_description: string | null;
  description: string | null;
  problem: string | null;
  solution: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  display_order: number;
};

export default function Projects() {
  const [projects, setProjects] =
    useState<Project[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("display_order");

      if (!error) {
        setProjects(
          (data as Project[]) || []
        );
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-emerald-400/10 px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
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
              A mix of AI, software, data and hardware
              projects — each built around a practical
              problem.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="py-10 text-center text-sm text-white/30">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-10 text-center text-sm text-white/30">
            No projects available.
          </div>
        ) : (
          <div className="space-y-5">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
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
                        {(index + 1)
                          .toString()
                          .padStart(2, "0")}
                      </span>

                      <span className="text-right text-xs text-white/25">
                        {project.category ||
                          "Project"}
                      </span>
                    </div>

                    <h3 className="mt-16 text-3xl font-medium tracking-tight md:text-4xl">
                      {project.title}
                    </h3>

                    <p className="mt-5 text-base leading-7 text-white/40">
                      {project.short_description ||
                        project.description}
                    </p>
                  </div>

                  <div className="p-7 lg:p-10">
                    <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                      The idea
                    </p>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">
                      {project.description}
                    </p>

                    {project.problem && (
                      <div className="mt-8">
                        <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                          Problem
                        </p>

                        <p className="mt-3 text-sm leading-7 text-white/45">
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {project.solution && (
                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                          Solution
                        </p>

                        <p className="mt-3 text-sm leading-7 text-white/45">
                          {project.solution}
                        </p>
                      </div>
                    )}

                    <div className="mt-10">
                      <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                        Built with
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(project.technologies ||
                          []).map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-white/40"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      {project.github_url && (
                        <a
                          href={
                            project.github_url
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 px-5 py-3 text-sm text-white/50 transition hover:border-emerald-400/30 hover:text-emerald-300"
                        >
                          <FaGithub size={16} />
                          GitHub
                          <ArrowUpRight
                            size={15}
                          />
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/50 transition hover:border-emerald-400/30 hover:text-emerald-300"
                        >
                          Live
                          <ArrowUpRight
                            size={15}
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}