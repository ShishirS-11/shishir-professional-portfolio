"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Trophy,
  UserRound,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdminGuard from "@/components/admin/AdminGuard";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    name: "Skills",
    href: "/admin/skills",
    icon: Wrench,
  },
  {
    name: "Certificates",
    href: "/admin/certifications",
    icon: Award,
  },
  {
    name: "Experience",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    name: "Education",
    href: "/admin/education",
    icon: GraduationCap,
  },
  {
    name: "Achievements",
    href: "/admin/achievements",
    icon: Trophy,
  },
  {
    name: "Profile",
    href: "/admin/profile",
    icon: UserRound,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#030504] text-white">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-white/[0.07] bg-[#050706] lg:flex lg:flex-col">
          {/* Logo */}
          <div className="flex h-24 items-center border-b border-white/[0.07] px-8">
            <Link
              href="/admin/dashboard"
              className="text-xl font-semibold tracking-[-0.04em]"
            >
              SHISHIR<span className="text-emerald-400">.</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-4 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
              Control Center
            </p>

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                      isActive
                        ? "bg-emerald-400/[0.10] text-white"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={
                        isActive
                          ? "text-emerald-400"
                          : "text-white/40 group-hover:text-white/70"
                      }
                    />

                    <span>{item.name}</span>

                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/[0.07] p-4">
            <Link
              href="/"
              target="_blank"
              className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/45 transition hover:bg-white/[0.04] hover:text-white"
            >
              <ExternalLink size={18} />

              <span>View Portfolio</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400/70 transition hover:bg-red-400/[0.06] hover:text-red-400"
            >
              <LogOut size={18} />

              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile top navigation */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/[0.07] bg-[#050706]/95 px-5 backdrop-blur lg:hidden">
          <Link
            href="/admin/dashboard"
            className="text-lg font-semibold tracking-[-0.04em]"
          >
            SHISHIR<span className="text-emerald-400">.</span>
          </Link>

          <Link
            href="/admin/dashboard"
            className="rounded-lg p-2 text-white/50 hover:bg-white/[0.05] hover:text-white"
          >
            <LayoutDashboard size={20} />
          </Link>
        </div>

        {/* Main content */}
        <main className="min-h-screen lg:ml-72">
          <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}