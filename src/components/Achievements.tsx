"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  ArrowUpRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Achievement = {
  id: string;
  title: string;
  organization: string;
  achievement_date: string | null;
  description: string | null;
  proof_url: string | null;
  image_url: string | null;
  display_order: number;
};

function formatDate(value: string | null) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Achievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data, error: fetchError } = await supabase
        .from("achievements")
        .select("*")
        .eq("is_published", true)
        .order("display_order", {
          ascending: true,
        });

      if (fetchError) {
        console.error(
          "PUBLIC ACHIEVEMENTS ERROR:",
          fetchError
        );

        setError(fetchError.message || "Unable to load achievements.");
        setLoading(false);
        return;
      }

      setItems((data as Achievement[]) || []);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <section
      id="achievements"
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
          className="mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            Achievements
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Things I&apos;m
            <br />
            <span className="text-white/25">
              proud of.
            </span>
          </h2>
        </motion.div>

        {loading && (
          <div className="text-center text-sm text-white/30">
            Loading achievements...
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-sm text-red-300/70">
            Unable to load achievements.
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center text-sm text-white/30">
            No achievements available.
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="space-y-5">
            {items.map((item, index) => (
              <motion.article
                key={item.id}
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
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="tech-card rounded-[2rem] p-8 md:p-12"
              >
                <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                      <Trophy
                        size={25}
                        className="text-emerald-300/65"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/45">
                      Achievement
                    </p>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                      {item.organization && (
                        <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.025] px-4 py-2 text-xs text-emerald-300/50">
                          {item.organization}
                        </span>
                      )}

                      {item.achievement_date && (
                        <span className="rounded-full border border-emerald-400/10 px-4 py-2 text-xs text-white/35">
                          {formatDate(
                            item.achievement_date
                          )}
                        </span>
                      )}
                    </div>

                    {item.proof_url && (
                      <a
                        href={item.proof_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-8 inline-flex items-center gap-2 text-sm text-emerald-300/65 transition hover:text-emerald-300"
                      >
                        View proof

                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
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