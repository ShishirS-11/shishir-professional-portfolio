"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  ArrowUpRight,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Trophy,
  Wrench,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Stats = {
  projects: number;
  skills: number;
  certifications: number;
  experience: number;
  education: number;
  achievements: number;
};

const emptyStats: Stats = {
  projects: 0,
  skills: 0,
  certifications: 0,
  experience: 0,
  education: 0,
  achievements: 0,
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient();

      try {
        const results = await Promise.all([
          supabase.from("projects").select("id"),
          supabase.from("skills").select("id"),
          supabase.from("certifications").select("id"),
          supabase.from("experience").select("id"),
          supabase.from("education").select("id"),
          supabase.from("achievements").select("id"),
        ]);

        const names = [
          "projects",
          "skills",
          "certifications",
          "experience",
          "education",
          "achievements",
        ];

        const failed = results.find((result) => result.error);

        if (failed) {
          const index = results.indexOf(failed);

          console.error("Dashboard database error:", {
            table: names[index],
            error: failed.error,
          });

          setError(
            `Unable to read ${names[index]} from Supabase.`
          );

          return;
        }

        setStats({
          projects: results[0].data?.length ?? 0,
          skills: results[1].data?.length ?? 0,
          certifications: results[2].data?.length ?? 0,
          experience: results[3].data?.length ?? 0,
          education: results[4].data?.length ?? 0,
          achievements: results[5].data?.length ?? 0,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Skills",
      value: stats.skills,
      href: "/admin/skills",
      icon: Wrench,
    },
    {
      label: "Certificates",
      value: stats.certifications,
      href: "/admin/certifications",
      icon: Award,
    },
    {
      label: "Experience",
      value: stats.experience,
      href: "/admin/experience",
      icon: BriefcaseBusiness,
    },
    {
      label: "Education",
      value: stats.education,
      href: "/admin/education",
      icon: GraduationCap,
    },
    {
      label: "Achievements",
      value: stats.achievements,
      href: "/admin/achievements",
      icon: Trophy,
    },
  ];

  return (
    <main className="min-h-screen bg-[#050807] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
            <Sparkles size={16} />
            Portfolio Control Center
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-semibold">
                Welcome back, Shishir Shetty.
              </h1>

              <p className="mt-3 max-w-2xl text-zinc-500">
                Manage your portfolio content from one place.
              </p>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-400 transition hover:border-emerald-400/30 hover:text-emerald-300"
            >
              View Portfolio
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={card.href}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-emerald-400/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <Icon size={20} />
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-zinc-700 transition group-hover:text-emerald-400"
                    />
                  </div>

                  <p className="mt-6 text-sm text-zinc-500">
                    {card.label}
                  </p>

                  <p className="mt-1 text-4xl font-semibold">
                    {loading ? "..." : card.value}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}