"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Cloud,
  CloudSun,
  Cpu,
  Database,
  FileText,
  Headphones,
  Leaf,
  LineChart,
  Music2,
  Package,
  ScanLine,
  ShoppingBag,
  Smartphone,
  Sparkles,
  WalletCards,
  Waves,
} from "lucide-react";
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
  image_url: string | null;
  featured: boolean;
  display_order: number;
};

function getVisualSet(project: Project, index: number) {
  const text = `${project.title} ${project.category || ""} ${project.short_description || ""}`.toLowerCase();

  if (/agri|agriculture|farm|crop|plant|soil|irrigation|leaf|harvest|precision/.test(text)) return "agri";
  if (/lyric|music|song|audio|spotify|sound|podcast|voice|waveform|playlist|tune/.test(text)) return "music";
  if (/budget|finance|expense|money|finance|bank|wallet|payment|billing|expense|income|saving/.test(text)) return "finance";
  if (/shoe|store|shop|ecommerce|e-commerce|retail|inventory|product|sales|order|stock/.test(text)) return "commerce";
  if (/ai|ml|machine learning|artificial intelligence|neural|vision|model|chatbot|prediction|deep learning/.test(text)) return "ai";
  if (/cloud|database|api|server|backend|devops|data|analytics|dashboard|system|software|web|app/.test(text)) return "data";

  return ["agri", "music", "finance", "commerce", "ai", "data"][index % 6];
}

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const set = getVisualSet(project, index);

  if (project.image_url) {
    return (
      <div className="relative h-56 overflow-hidden bg-[#eef3ff]">
        <img src={project.image_url} alt={`${project.title} project`} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
        <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#303a58] backdrop-blur-md">
          Project preview
        </div>
      </div>
    );
  }

  if (set === "agri") {
    return (
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#e8f8e9] via-[#eefbf5] to-[#eaf3ff]">
        <div className="absolute -left-12 -top-14 h-44 w-44 rounded-full bg-emerald-300/30 blur-3xl ambient-orb" />
        <div className="absolute -right-12 bottom-[-40px] h-52 w-52 rounded-full bg-blue-300/25 blur-3xl ambient-orb-slow" />
        <div className="absolute inset-x-8 bottom-[-20px] h-36 rotate-[-5deg] rounded-[40%] bg-gradient-to-br from-emerald-200 to-green-100 opacity-80" />
        <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/80 bg-white/72 p-5 shadow-[0_20px_50px_rgba(35,110,75,.12)] backdrop-blur-xl float-soft">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-semibold text-[#304f3d]"><Leaf size={18} className="text-emerald-600" /> Crop health scan</div><ScanLine size={18} className="text-blue-500 pulse-soft" /></div>
          <div className="mt-5 grid grid-cols-5 gap-1.5">{Array.from({ length: 20 }).map((_, i) => <span key={i} className={`h-5 rounded-sm ${i % 5 === 0 || i % 7 === 0 ? "bg-emerald-300" : i % 3 === 0 ? "bg-green-200" : "bg-lime-100"}`} />)}</div>
          <div className="mt-4 flex items-center justify-between text-[10px] text-[#62766a]"><span>Vegetation index</span><strong className="text-emerald-700">92% healthy</strong></div>
        </div>
        <div className="absolute right-[13%] top-[17%] h-3 w-3 rounded-full bg-blue-400 ambient-orb" />
      </div>
    );
  }

  if (set === "music") {
    return (
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#eef0ff] via-[#f7edff] to-[#e8f5ff]">
        <div className="absolute left-[-20px] top-[-25px] h-48 w-48 rounded-full bg-violet-300/25 blur-3xl ambient-orb" />
        <div className="absolute right-[-10px] bottom-[-30px] h-48 w-48 rounded-full bg-pink-300/20 blur-3xl ambient-orb-slow" />
        <div className="absolute left-[13%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#ef72b8] shadow-[0_18px_40px_rgba(124,92,255,.2)] spin-slow"><div className="absolute inset-7 rounded-full bg-white/90"><div className="absolute inset-[10px] rounded-full bg-[#dfe4ff]" /></div></div>
        <div className="absolute right-[9%] top-1/2 w-[58%] -translate-y-1/2 rounded-3xl border border-white/80 bg-white/76 p-4 shadow-[0_20px_50px_rgba(80,60,150,.12)] backdrop-blur-xl float-soft-delay">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#403d63]"><Headphones size={17} className="text-violet-600" /> Lyrical flow</div>
          <div className="mt-4 flex h-8 items-center gap-1">{Array.from({ length: 22 }).map((_, i) => <span key={i} className="w-1 rounded-full bg-gradient-to-t from-violet-300 to-pink-300" style={{ height: `${10 + ((i * 17) % 22)}px` }} />)}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ece8fa]"><span className="block h-full w-[62%] rounded-full bg-gradient-to-r from-violet-500 to-pink-400 shimmer" /></div>
        </div>
      </div>
    );
  }

  if (set === "finance") {
    return (
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#eef8ff] via-white to-[#eefcf5]">
        <div className="absolute right-[-30px] top-[-30px] h-48 w-48 rounded-full bg-blue-300/25 blur-3xl ambient-orb" />
        <div className="absolute left-[-30px] bottom-[-30px] h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl ambient-orb-slow" />
        <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white bg-white/80 p-4 shadow-[0_20px_55px_rgba(40,100,150,.12)] backdrop-blur-xl float-soft">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-semibold text-[#34405d]"><WalletCards size={17} className="text-blue-600" /> Monthly budget</div><span className="text-xs font-bold text-emerald-600">₹ 42.8K</span></div>
          <div className="mt-4 flex h-20 items-end gap-2">{[35,52,42,68,58,76,62,86,70,92,78,88].map((h, i) => <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-200 to-emerald-300" style={{ height: `${h}%` }} />)}</div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-[#778198]"><span>Spending</span><span className="font-semibold text-[#4b5872]">On track</span></div>
        </div>
      </div>
    );
  }

  if (set === "commerce") {
    return (
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#f6f7fa] via-white to-[#edf2ff]">
        <div className="absolute right-[-20px] top-[-35px] h-48 w-48 rounded-full bg-blue-300/18 blur-3xl ambient-orb" />
        <div className="absolute left-[9%] top-1/2 -translate-y-1/2 rotate-[-8deg] rounded-[28px] bg-gradient-to-br from-white to-[#dfe5f1] p-5 shadow-[0_25px_45px_rgba(25,35,60,.18)] float-soft-delay">
          <div className="relative h-20 w-32"><div className="absolute left-2 top-5 h-10 w-28 -rotate-[8deg] rounded-[45%_45%_35%_35%] bg-gradient-to-br from-[#222938] via-[#69758a] to-white" /><div className="absolute left-0 top-1 h-7 w-10 rotate-[-12deg] rounded-full border-4 border-[#30394b] bg-white" /><div className="absolute right-1 top-7 h-3 w-16 rotate-[-8deg] rounded-full bg-white/80" /></div>
        </div>
        <div className="absolute right-[8%] top-1/2 w-[52%] -translate-y-1/2 rounded-3xl border border-black/5 bg-white/85 p-4 shadow-[0_20px_50px_rgba(30,40,70,.10)] backdrop-blur-xl float-soft-delay-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#343c50]"><ShoppingBag size={17} className="text-blue-600" /> Store inventory</div>
          <div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-xl bg-[#f3f5f9] p-3"><Package size={15} className="text-slate-500" /><strong className="mt-2 block text-sm text-[#293248]">128</strong><span className="text-[9px] text-[#81899a]">in stock</span></div><div className="rounded-xl bg-[#edf4ff] p-3"><BarChart3 size={15} className="text-blue-500" /><strong className="mt-2 block text-sm text-[#293248]">+18%</strong><span className="text-[9px] text-[#81899a]">sales</span></div></div>
        </div>
      </div>
    );
  }

  if (set === "ai") {
    return (
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#edf4ff] via-white to-[#f2ebff]">
        <div className="absolute inset-0 opacity-50 tech-grid" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/80 bg-white/75 shadow-[0_20px_55px_rgba(55,100,200,.13)] backdrop-blur-xl pulse-soft" />
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-[0_20px_45px_rgba(75,90,220,.25)]"><Sparkles size={30} /></div>
        {[0,1,2,3,4,5].map(i => <span key={i} className="absolute h-2.5 w-2.5 rounded-full bg-blue-400 ambient-orb" style={{ left: `${18 + ((i * 17) % 64)}%`, top: `${20 + ((i * 23) % 58)}%`, animationDelay: `${i * .35}s` }} />)}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-[10px] font-semibold text-[#44506b] shadow-[0_12px_30px_rgba(50,70,130,.10)] backdrop-blur-xl"><Cpu size={14} className="text-violet-500" /> Intelligent system</div>
      </div>
    );
  }

  return (
    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#eef5ff] via-white to-[#edf9f5]">
      <div className="absolute inset-0 opacity-50 background-grid" />
      <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white bg-white/80 p-4 shadow-[0_20px_55px_rgba(40,80,140,.12)] backdrop-blur-xl float-soft">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-semibold text-[#34405d]"><Database size={17} className="text-blue-600" /> System overview</div><Cloud size={17} className="text-emerald-500 pulse-soft" /></div>
        <div className="mt-4 grid grid-cols-3 gap-2"><div className="h-12 rounded-xl bg-[#eef3fb]" /><div className="h-12 rounded-xl bg-[#eaf7f2]" /><div className="h-12 rounded-xl bg-[#f2ecff]" /></div>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-[#778198]"><LineChart size={13} /> Data flowing · services healthy</div>
      </div>
      <Waves size={34} className="absolute bottom-7 right-8 text-blue-300 ambient-orb" />
    </div>
  );
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
                <ProjectVisual project={project} index={index} />
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
