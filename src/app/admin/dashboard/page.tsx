"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Wrench,
  Award,
  BriefcaseBusiness,
  Trophy,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const cards = [
  {
    title: "Projects",
    count: "03",
    description: "Portfolio projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    count: "30+",
    description: "Technologies & tools",
    href: "/admin/skills",
    icon: Wrench,
  },
  {
    title: "Certificates",
    count: "03",
    description: "Credentials",
    href: "/admin/certifications",
    icon: Award,
  },
  {
    title: "Experience",
    count: "01",
    description: "Professional experience",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Achievements",
    count: "01",
    description: "Awards & recognition",
    href: "/admin/achievements",
    icon: Trophy,
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs text-emerald-300/50">
            <Activity size={14} />
            System ready
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Portfolio
            <br />
            <span className="text-white/25">
              control center.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
            Manage everything displayed on your public portfolio
            from one place.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-5 py-3 text-sm text-emerald-300/70 transition hover:border-emerald-400/30 hover:text-emerald-300"
        >
          View live portfolio

          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
            >
              <Link
                href={card.href}
                className="group block rounded-2xl border border-emerald-400/10 bg-[#0a100d] p-6 transition hover:border-emerald-400/25 hover:bg-[#0c1511]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04]">
                    <Icon
                      size={19}
                      className="text-emerald-300/60"
                    />
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-white/15 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300/70"
                  />
                </div>

                <p className="mt-8 text-3xl font-semibold tracking-tight">
                  {card.count}
                </p>

                <h2 className="mt-2 text-sm font-medium text-white/70">
                  {card.title}
                </h2>

                <p className="mt-1 text-xs text-white/25">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.02] p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-400/40">
          Next stage
        </p>

        <h2 className="mt-3 text-xl font-medium">
          Connect this dashboard to Azure.
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/35">
          Once the UI is complete, we&apos;ll connect authentication,
          database storage and file uploads so changes here update the
          public portfolio automatically.
        </p>
      </div>
    </div>
  );
}