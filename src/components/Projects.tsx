"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

function AgriVisionVisual() {
  return (
    <div className="project-visual project-visual-agri">
      <div className="agri-sun" />
      <div className="agri-scan" />
      <div className="agri-cloud agri-cloud-one" />
      <div className="agri-cloud agri-cloud-two" />
      <div className="agri-field">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="agri-row" style={{ left: `${8 + i * 13}%`, animationDelay: `${i * .18}s` }} />
        ))}
      </div>
      <div className="agri-drone">
        <span className="drone-arm" /><span className="drone-body" /><span className="drone-light" />
      </div>
      <div className="agri-data-chip">AI CROP SCAN <b>98%</b></div>
    </div>
  );
}

function LyricalLinkVisual() {
  return (
    <div className="project-visual project-visual-lyrics">
      <div className="lyrics-glow" />
      <div className="lyrics-disc"><span>♪</span></div>
      <div className="lyrics-wave">
        {Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * .07}s`, height: `${18 + ((i * 17) % 54)}%` }} />)}
      </div>
      <div className="lyrics-card">
        <span className="lyrics-label">NOW PLAYING</span>
        <strong>Words become music</strong>
        <small>Synced lyrics • Connected moments</small>
      </div>
      <div className="lyrics-note note-one">♪</div><div className="lyrics-note note-two">♫</div>
    </div>
  );
}

function BudgetWiseVisual() {
  return (
    <div className="project-visual project-visual-budget">
      <div className="budget-orb" />
      <div className="budget-phone">
        <div className="budget-top"><span>Budget Wise</span><b>₹24,850</b></div>
        <div className="budget-chart"><div className="budget-ring"><span>72%</span></div><div className="budget-bars"><i /><i /><i /><i /></div></div>
        <div className="budget-lines"><span /><span /><span /></div>
      </div>
      <div className="budget-float budget-save">+ ₹4,200 saved</div>
      <div className="budget-float budget-food">Food <b>₹3,240</b></div>
      <div className="budget-coin coin-one">₹</div><div className="budget-coin coin-two">₹</div>
    </div>
  );
}

function ShoeStoreVisual() {
  return (
    <div className="project-visual project-visual-shoes">
      <div className="shoe-glow" />
      <div className="shoe-platform" />
      <div className="sneaker">
        <span className="shoe-upper" /><span className="shoe-lace lace-one" /><span className="shoe-lace lace-two" /><span className="shoe-sole" /><span className="shoe-mark">S</span>
      </div>
      <div className="shoe-stock"><span>IN STOCK</span><b>128 pairs</b></div>
      <div className="shoe-price">₹4,999</div>
      <div className="shoe-dot dot-one" /><div className="shoe-dot dot-two" />
    </div>
  );
}

function GenericProjectVisual({ title }: { title: string }) {
  return (
    <div className="project-visual project-visual-generic">
      <div className="generic-orb" />
      <div className="generic-window"><span /><span /><span /><div className="generic-lines"><i /><i /><i /><i /></div></div>
      <p>{title}</p>
    </div>
  );
}

function ProjectVisual({ title }: { title: string }) {
  const normalized = title.toLowerCase();
  if (normalized.includes("agri") || normalized.includes("agriculture")) return <AgriVisionVisual />;
  if (normalized.includes("lyrical") || normalized.includes("lyric")) return <LyricalLinkVisual />;
  if (normalized.includes("budget") || normalized.includes("finance") || normalized.includes("expense")) return <BudgetWiseVisual />;
  if (normalized.includes("shoe") || normalized.includes("footwear")) return <ShoeStoreVisual />;
  return <GenericProjectVisual title={title} />;
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
                <ProjectVisual title={project.title} />
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
