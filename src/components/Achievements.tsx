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
  organization: string | null;
  achievement_date: string | null;
  description: string | null;
  proof_url: string | null;
};

export default function Achievements() {
  const [items, setItems] =
    useState<Achievement[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data, error } =
        await supabase
          .from("achievements")
          .select("*")
          .eq("is_published", true)
          .order("display_order");

      if (!error) {
        setItems(
          (data as Achievement[]) || []
        );
      }

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

        {loading ? (
          <div className="text-center text-sm text-white/30">
            Loading achievements...
          </div>
        ) : (
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
                viewport={{ once: true }}
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
                          {new Date(
                            item.achievement_date
                          ).getFullYear()}
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