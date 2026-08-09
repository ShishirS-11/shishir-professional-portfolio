"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Award,
  BriefcaseBusiness,
  Trophy,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: Wrench,
  },
  {
    label: "Certificates",
    href: "/admin/certifications",
    icon: Award,
  },
  {
    label: "Experience",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "Achievements",
    href: "/admin/achievements",
    icon: Trophy,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050807] text-white">
      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-emerald-400/10 bg-[#070b09]/95 px-5 backdrop-blur-xl lg:hidden">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          ADMIN
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-white/60"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-40 w-64 border-r border-emerald-400/10 bg-[#070b09] transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">
          <Link
            href="/admin/dashboard"
            className="hidden items-center gap-2 px-3 py-4 lg:flex"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

            <div>
              <p className="text-sm font-semibold">
                SHISHIR
                <span className="text-emerald-400">.</span>
              </p>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/25">
                Admin panel
              </p>
            </div>
          </Link>

          <div className="mt-8">
            <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-emerald-400/35">
              Manage
            </p>

            <nav className="mt-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-emerald-400/[0.05] hover:text-emerald-300"
                  >
                    <Icon size={17} strokeWidth={1.7} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-white/35 transition hover:bg-white/[0.03] hover:text-white"
            >
              View portfolio
              <ArrowUpRight size={15} />
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/30 transition hover:bg-red-400/[0.05] hover:text-red-300">
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="min-h-screen lg:pl-64">
        <div className="px-5 pb-16 pt-24 md:px-10 lg:px-12 lg:pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}