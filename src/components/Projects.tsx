"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CloudSun, FileText, LayoutDashboard } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  category: string | null;
  short_description: string | null;
  description: string | null;
  problem: string | null;
  solution: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  display_order: number;
};

function ProjectVisual({ index, title }: { index: number; title: string }) {
  if (index % 3 === 1) return <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#111a42] via-[#2d2b68] to-[#6950aa]"><div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-blue-400/20 blur-2xl" /><div className="absolute right-10 top-8 h-24 w-24 rounded-full bg-violet-300/20 blur-2xl" /><div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl float-soft"><div className="flex items-center justify-between text-white"><CloudSun size={38} strokeWidth={1.2} /><span className="text-4xl font-semibold">24°</span></div><p className="mt-4 text-xs text-white/60">Real-time weather insights</p><div className="mt-5 flex gap-2">{["MON","TUE","WED","THU","FRI"].map((d,i)=><span key={d} className="rounded-lg bg-white/10 px-2 py-1 text-[9px] text-white/65" style={{ opacity: .55 + i * .1 }}>{d}</span>)}</div></div><div className="absolute right-8 bottom-8 h-3 w-3 rounded-full bg-blue-300 ambient-orb" /></div>;
  if (index % 3 === 2) return <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#edf6ff] via-white to-[#f5eaff]"><div className="absolute right-[-10px] top-5 h-44 w-44 rounded-full bg-violet-300/30 blur-3xl" /><div className="absolute left-1/2 top-1/2 h-44 w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white bg-white/75 p-5 shadow-[0_20px_50px_rgba(80,80,150,.12)] float-soft"><div className="flex items-center gap-2 text-xs font-semibold text-[#303a58]"><FileText size={18} className="text-violet-500" /> {title}</div><div className="mt-5 space-y-3"><span className="block h-2 w-[85%] rounded-full bg-[#dfe7f7]" /><span className="block h-2 w-[65%] rounded-full bg-[#e9defd]" /><span className="block h-10 rounded-xl bg-gradient-to-r from-blue-100 to-violet-100" /></div></div><div className="absolute left-10 bottom-8 h-4 w-4 rounded-full bg-pink-300 ambient-orb-slow" /></div>;
  return <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#e7f7ff] via-[#eef4ff] to-[#e8fff6]"><div className="absolute left-[-20px] top-[-30px] h-48 w-48 rounded-full bg-cyan-300/25 blur-3xl" /><div className="absolute right-[-30px] bottom-[-40px] h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl" /><div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/90 bg-white/75 p-4 shadow-[0_20px_50px_rgba(40,100,140,.13)] float-soft"><div className="flex items-center gap-2"><LayoutDashboard size={17} className="text-blue-600" /><span className="text-xs font-semibold text-[#303a58]">{title}</span></div><div className="mt-4 grid grid-cols-[.65fr_1.35fr] gap-3"><div className="rounded-xl bg-[#edf2fb] p-3 space-y-2"><span className="block h-2 w-12 rounded bg-blue-200" /><span className="block h-2 w-16 rounded bg-slate-200" /><span className="block h-2 w-10 rounded bg-slate-200" /></div><div className="rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 p-3"><span className="block h-3 w-20 rounded bg-blue-200/70" /><span className="mt-3 block h-7 rounded-lg bg-white/90" /><span className="mt-2 block h-7 rounded-lg bg-white/80" /></div></div></div><div className="absolute right-[14%] top-[20%] h-3 w-3 rounded-full bg-blue-400 ambient-orb" /></div>;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from("projects").select("*").eq("is_published", true).order("display_order");
      if (!error) setProjects((data as Project[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-3 text-sm font-semibold uppercase tracking-[.2em] text-blue-600">Featured projects</p><h2 className="text-4xl font-semibold tracking-[-.045em] md:text-6xl">Some things I&apos;ve built.</h2></div>
          <p className="max-w-md text-base leading-7 text-[#687187]">A mix of AI, software, data and hardware projects — each built around a practical problem.</p>
        </motion.div>

        {loading ? <div className="py-10 text-center text-sm text-[#7b849a]">Loading projects...</div> : projects.length === 0 ? <div className="py-10 text-center text-sm text-[#7b849a]">No projects available.</div> : (
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article key={project.id} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65, delay: index * .08 }} className="tech-card group rounded-[28px]">
                <ProjectVisual index={index} title={project.title} />
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-600/80">{project.category || "Project"}</p><h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5ff] transition group-hover:bg-[#101426] group-hover:text-white"><ArrowUpRight size={17} /></span></div>
                  <p className="mt-4 text-sm leading-7 text-[#687187]">{project.short_description || project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{(project.technologies || []).slice(0, 5).map(technology => <span key={technology} className="rounded-full bg-[#eef3ff] px-3 py-1.5 text-xs font-medium text-[#52658e]">{technology}</span>)}</div>
                  {(project.problem || project.solution) && <div className="mt-5 rounded-2xl bg-[#f7f8fc] p-4"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8a93a7]">The idea</p><p className="mt-2 text-sm leading-6 text-[#59627a]">{project.problem || project.solution}</p></div>}
                  <div className="mt-6 flex gap-3">{project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/8 px-4 py-2.5 text-sm font-medium text-[#39435a] transition hover:bg-[#101426] hover:text-white"><FaGithub size={15} /> GitHub</a>}{project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#101426] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5">Live <ArrowUpRight size={15} /></a>}</div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
