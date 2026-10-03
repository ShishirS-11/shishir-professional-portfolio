"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Trophy,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdminGuard from "@/components/admin/AdminGuard";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Certificates", href: "/admin/certifications", icon: Award },
  { name: "Experience", href: "/admin/experience", icon: BriefcaseBusiness },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
  { name: "Profile", href: "/admin/profile", icon: UserRound },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <AdminGuard>
      <div className="admin-experience min-h-screen text-[#101426]">
        <div className="pointer-events-none fixed inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_50%_-10%,rgba(73,132,255,0.18),transparent_55%)]" />

        <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
          <nav className="tech-card relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-4">
            <Link href="/admin/dashboard" className="group flex items-center gap-2 text-base font-semibold tracking-tight sm:text-lg">
              <span className="h-2 w-2 rounded-full bg-[#147efb] shadow-[0_0_12px_rgba(20,126,251,0.45)]" />
              SHISHIR SHETTY<span className="text-[#147efb]">.</span>
              <span className="ml-1 hidden border-l border-slate-200 pl-3 text-xs font-normal text-slate-400 sm:inline">Admin</span>
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${isActive ? "bg-[#147efb]/10 text-[#147efb]" : "text-slate-500 hover:bg-slate-900/[0.04] hover:text-slate-900"}`}>
                    <Icon size={15} strokeWidth={1.8} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-1 xl:flex">
              <Link href="/" target="_blank" className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-900/[0.04] hover:text-[#147efb]" aria-label="View portfolio" title="View portfolio">
                <ExternalLink size={17} />
              </Link>
              <button type="button" onClick={handleLogout} className="rounded-full p-2.5 text-slate-500 transition hover:bg-red-500/[0.07] hover:text-red-500" aria-label="Sign out" title="Sign out">
                <LogOut size={17} />
              </button>
            </div>

            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 text-slate-600 transition hover:text-[#147efb] xl:hidden" aria-label="Toggle admin navigation">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {menuOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl xl:hidden">
                <div className="grid gap-1 sm:grid-cols-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                      <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive ? "bg-[#147efb]/10 text-[#147efb]" : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-950"}`}>
                        <Icon size={17} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 flex gap-2 border-t border-slate-200 pt-3">
                  <Link href="/" target="_blank" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 transition hover:border-[#147efb]/30 hover:text-[#147efb]">
                    <ExternalLink size={16} />
                    View portfolio
                  </Link>
                  <button type="button" onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm text-red-500 transition hover:bg-red-500/[0.06]">
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </nav>
        </header>

        <main className="admin-content relative mx-auto w-full max-w-7xl px-5 pb-12 pt-32 sm:px-8 lg:pt-36">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
