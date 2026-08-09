"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Certification = {
  id: string;
  name: string;
  issuer: string;
  credential_id: string | null;
  credential_url: string | null;
  issue_date: string | null;
  description: string | null;
};

export default function Certifications() {
  const [items, setItems] =
    useState<Certification[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data, error } =
        await supabase
          .from("certifications")
          .select("*")
          .eq("is_published", true)
          .order("display_order");

      if (!error) {
        setItems(
          (data as Certification[]) || []
        );
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <section
      id="certifications"
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
            Certifications
          </p>

          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Proof that I&apos;m
            <br />
            <span className="text-white/25">
              always learning.
            </span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-16 text-center text-sm text-white/30">
            Loading certifications...
          </div>
        ) : (
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((certificate, index) => (
              <motion.article
                key={certificate.id}
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
                  delay: index * 0.08,
                }}
                className="tech-card rounded-3xl p-7 transition hover:bg-[#0c1511]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                    <Award
                      size={19}
                      className="text-emerald-300/60"
                    />
                  </div>

                  <ShieldCheck
                    size={18}
                    className="text-emerald-400/35"
                  />
                </div>

                <h3 className="mt-8 text-xl font-medium">
                  {certificate.name}
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  {certificate.issuer}
                </p>

                {certificate.credential_id && (
                  <div className="mt-6">
                    <span className="rounded-full bg-emerald-400/[0.05] px-3 py-1.5 text-xs text-emerald-300/50">
                      {certificate.credential_id}
                    </span>
                  </div>
                )}

                {certificate.credential_url && (
                  <a
                    href={
                      certificate.credential_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-300/60 hover:text-emerald-300"
                  >
                    View credential
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}