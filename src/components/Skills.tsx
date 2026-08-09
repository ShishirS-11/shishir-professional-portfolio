"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
};

type Skill = {
  id: string;
  name: string;
  category_id: string;
  description: string | null;
  technologies: string[];
  proficiency: number | null;
  display_order: number;
};

export default function Skills() {
  const [categories, setCategories] =
    useState<Category[]>([]);
  const [skills, setSkills] =
    useState<Skill[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const [categoryResult, skillResult] =
        await Promise.all([
          supabase
            .from("skill_categories")
            .select("*")
            .eq("is_visible", true)
            .order("display_order"),

          supabase
            .from("skills")
            .select("*")
            .eq("is_published", true)
            .order("display_order"),
        ]);

      if (!categoryResult.error) {
        setCategories(
          (categoryResult.data as Category[]) ||
            []
        );
      }

      if (!skillResult.error) {
        setSkills(
          (skillResult.data as Skill[]) || []
        );
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <section
      id="skills"
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
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            Skills
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Tools I use to
            <br />
            <span className="text-white/25">
              turn ideas into systems.
            </span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-16 text-center text-sm text-white/30">
            Loading skills...
          </div>
        ) : (
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {categories.map(
              (category, categoryIndex) => {
                const categorySkills =
                  skills.filter(
                    (skill) =>
                      skill.category_id ===
                      category.id
                  );

                return (
                  <motion.article
                    key={category.id}
                    initial={{
                      opacity: 0,
                      y: 30,
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
                      duration: 0.6,
                      delay:
                        categoryIndex * 0.08,
                    }}
                    className="tech-card rounded-3xl p-7 md:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                        <Code2
                          size={20}
                          className="text-emerald-300/60"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-medium">
                          {category.name}
                        </h3>

                        {category.description && (
                          <p className="mt-1 text-sm text-white/30">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {categorySkills.map(
                        (skill) => (
                          <span
                            key={skill.id}
                            className="rounded-full border border-white/5 bg-white/[0.035] px-3 py-2 text-sm text-white/50"
                          >
                            {skill.name}
                          </span>
                        )
                      )}
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        )}
      </div>
    </section>
  );
}