"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  grade: string | null;
  description: string | null;
};

function formatYear(value: string | null) {
  if (!value) return "";

  return new Date(value).getFullYear();
}

export default function Education() {
  const [items, setItems] =
    useState<EducationItem[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data, error } =
        await supabase
          .from("education")
          .select("*")
          .eq("is_published", true)
          .order("display_order");

      if (!error) {
        setItems(
          (data as EducationItem[]) || []
        );
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <section
      id="education"
      className="px-6 py-28 md:px-10 md:py-36"
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

        {loading ? (
          <div className="mt-16 text-center text-sm text-white/30">
            Loading education...
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

                      {item.field_of_study && (
                        <p className="mt-1 text-sm text-white/25">
                          {item.field_of_study}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p className="text-sm text-white/35">
                      {formatYear(
                        item.start_date
                      )}{" "}
                      —{" "}
                      {formatYear(
                        item.end_date
                      )}
                    </p>

                    {item.grade && (
                      <p className="mt-2 text-sm text-emerald-300/60">
                        {item.grade}
                      </p>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="mt-7 max-w-3xl text-sm leading-7 text-white/35">
                    {item.description}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}