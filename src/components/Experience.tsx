"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  employment_type: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  responsibilities: string[];
  technologies: string[];
};

function formatDate(value: string | null) {
  if (!value) return "";

  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );
}

export default function Experience() {
  const [items, setItems] =
    useState<ExperienceItem[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data, error } =
        await supabase
          .from("experience")
          .select("*")
          .eq("is_published", true)
          .order("display_order");

      if (!error) {
        setItems(
          (data as ExperienceItem[]) || []
        );
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <section
      id="experience"
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
            Experience
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Where I&apos;ve
            <br />
            <span className="text-white/25">
              applied what I know.
            </span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-16 text-center text-sm text-white/30">
            Loading experience...
          </div>
        ) : (
          <div className="mt-16 space-y-4">
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="tech-card rounded-3xl p-7 md:p-8"
              >
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">

                  <div className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                      <BriefcaseBusiness
                        size={20}
                        className="text-emerald-300/55"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-medium">
                        {item.role}
                      </h3>

                      <p className="mt-2 text-sm text-emerald-300/60">
                        {item.company}
                      </p>

                      {item.location && (
                        <p className="mt-1 text-sm text-white/25">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p className="text-sm text-white/35">
                      {formatDate(
                        item.start_date
                      )}{" "}
                      —{" "}
                      {item.is_current
                        ? "Present"
                        : formatDate(
                            item.end_date
                          )}
                    </p>

                    {item.employment_type && (
                      <p className="mt-2 text-sm text-white/25">
                        {item.employment_type}
                      </p>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/40">
                    {item.description}
                  </p>
                )}

                {item.responsibilities?.length >
                  0 && (
                  <ul className="mt-6 space-y-2">
                    {item.responsibilities.map(
                      (responsibility) => (
                        <li
                          key={responsibility}
                          className="text-sm leading-7 text-white/35"
                        >
                          <span className="mr-2 text-emerald-400">
                            /
                          </span>
                          {responsibility}
                        </li>
                      )
                    )}
                  </ul>
                )}

                {item.technologies?.length >
                  0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-white/40"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}