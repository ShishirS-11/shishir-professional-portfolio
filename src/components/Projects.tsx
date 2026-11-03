"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, TouchEvent } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  BarChart3,
  Cloud,
  Cpu,
  Database,
  Headphones,
  Leaf,
  LineChart,
  Package,
  ScanLine,
  ShoppingBag,
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
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from("projects").select("*").eq("is_published", true).order("display_order");
      if (mounted && !error) setProjects((data as Project[]) || []);
      if (mounted) setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(
    () => ["ALL", ...Array.from(new Set(projects.map((p) => p.category?.trim()).filter((v): v is string => Boolean(v))))],
    [projects]
  );
  const visibleProjects = useMemo(
    () => activeCategory === "ALL" ? projects : projects.filter((p) => p.category?.trim() === activeCategory),
    [projects, activeCategory]
  );
  const activeProject = visibleProjects[activeIndex] ?? null;

  useEffect(() => { setActiveIndex(0); }, [activeCategory]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setDetailOpen(false); return; }
      if (detailOpen || !visibleProjects.length) return;
      const section = document.getElementById("projects");
      if (!section?.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + visibleProjects.length) % visibleProjects.length);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % visibleProjects.length);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailOpen, visibleProjects.length]);

  function move(direction: number) {
    if (!visibleProjects.length) return;
    setActiveIndex((current) => (current + direction + visibleProjects.length) % visibleProjects.length);
  }

  function trackCursor(event: PointerEvent<HTMLElement>) {
    if (!cursorRef.current || event.pointerType !== "mouse") return;
    cursorRef.current.style.setProperty("--cursor-x", String(event.clientX) + "px");
    cursorRef.current.style.setProperty("--cursor-y", String(event.clientY) + "px");
    const target = event.target as HTMLElement;
    cursorRef.current.dataset.mode = target.closest("[data-cursor='open']") ? "open" : target.closest("[data-cursor='spine']") ? "spine" : "default";
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <section id="projects" tabIndex={0} aria-label="Project filmography shelf"
      className="vhs-projects relative overflow-hidden px-5 pb-24 pt-24 outline-none md:px-10 md:pb-32 md:pt-32"
      onPointerMove={trackCursor}
      onPointerLeave={() => { if (cursorRef.current) cursorRef.current.dataset.mode = "default"; }}
      onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
      onTouchEnd={handleTouchEnd}>
      <div className="vhs-grain" aria-hidden="true" />
      <div ref={cursorRef} className="vhs-cursor" aria-hidden="true"><span>OPEN</span><span>開く</span></div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <header className="vhs-topbar">
          <a href="#top" className="vhs-label vhs-back">BACK / 戻る</a>
          <div className="vhs-brand" aria-label="Shishir Shetty portfolio"><span className="vhs-brand-mark">SS</span><span>SHISHIR SHETTY</span></div>
          <p className="vhs-label vhs-career">SELECTED WORKS · 2024—2026</p>
        </header>

        <div className="vhs-heading">
          <p className="vhs-eyebrow">A PERSONAL ARCHIVE OF BUILT THINGS</p>
          <h2>Projects, <em>on record.</em></h2>
          <p>Browse the work. Pull a tape from the shelf to see what went into it.</p>
        </div>

        <nav className="vhs-tabs" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button key={category} type="button"
              className={"vhs-tab " + (activeCategory === category ? "is-active" : "")}
              onClick={() => setActiveCategory(category)}>
              {category === "ALL" ? "ALL PROJECTS" : category}
            </button>
          ))}
        </nav>

        {loading ? <div className="vhs-empty">Loading the archive…</div> :
          visibleProjects.length === 0 ? <div className="vhs-empty">No published projects in this collection yet.</div> : (
          <>
            <div className="vhs-stage-wrap">
              <div className="vhs-stage" aria-label="Interactive project shelf">
                <div className="vhs-shelf-shadow" />
                {visibleProjects.map((project, index) => {
                  const relative = index - activeIndex;
                  if (Math.abs(relative) > 5) return null;
                  const offset = relative === 0 ? 0 : Math.sign(relative) * (154 + (Math.abs(relative) - 1) * 76);
                  const style = {
                    "--offset-x": String(offset) + "px",
                    "--tape-hue": String((index * 43 + 205) % 360),
                    zIndex: 40 - Math.abs(relative),
                  } as CSSProperties;
                  const selected = index === activeIndex;
                  return (
                    <button key={project.id} type="button"
                      className={"vhs-tape " + (selected ? "is-active" : "is-spine")}
                      style={style}
                      onClick={() => selected ? setDetailOpen(true) : setActiveIndex(index)}
                      aria-label={(selected ? "Open " : "Select ") + project.title}
                      aria-pressed={selected}
                      data-cursor={selected ? "open" : "spine"}>
                      {selected ? (
                        <span className="vhs-cover">
                          <span className="vhs-cover-art"><ProjectVisual project={project} index={index} /></span>
                          <span className="vhs-cover-copy">
                            <span className="vhs-cover-kicker">A SHISHIR SHETTY PROJECT</span>
                            <strong>{project.title}</strong>
                            <span className="vhs-cover-category">{project.category || "PROJECT"} · OPEN TO VIEW</span>
                          </span>
                          <span className="vhs-cover-stamp">SS<br />VHS</span>
                        </span>
                      ) : (
                        <span className="vhs-spine-face">
                          <span className="vhs-spine-index">{String(index + 1).padStart(2, "0")}</span>
                          <span className="vhs-spine-title">{project.title}</span>
                          <span className="vhs-spine-brand">SHISHIR · PROJECT ARCHIVE</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="vhs-shelf-edge"><span /></div>
              <div className="vhs-shelf-caption">THE PROJECT SHELF <span>— SELECT A SPINE TO BROWSE</span></div>
            </div>

            {activeProject && (
              <div className="vhs-caption" aria-live="polite">
                <div className="vhs-caption-main">
                  <p className="vhs-label">{activeProject.category || "SELECTED PROJECT"} · {String(activeIndex + 1).padStart(2, "0")} / {String(visibleProjects.length).padStart(2, "0")}</p>
                  <h3>{activeProject.title}</h3>
                  <p className="vhs-caption-description">{activeProject.short_description || activeProject.description || "A project built around a practical problem."}</p>
                  <div className="vhs-tech-row">{(activeProject.technologies || []).slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div>
                </div>
                <div className="vhs-caption-actions">
                  <button type="button" className="vhs-round-arrow" onClick={() => move(-1)} aria-label="Previous project"><ChevronLeft size={20} /></button>
                  <button type="button" className="vhs-open-button" onClick={() => setDetailOpen(true)}>OPEN PROJECT <ArrowUpRight size={15} /></button>
                  <button type="button" className="vhs-round-arrow" onClick={() => move(1)} aria-label="Next project"><ChevronRight size={20} /></button>
                </div>
              </div>
            )}
          </>
        )}

        <footer className="vhs-footer"><span>© SHISHIR SHETTY · SELECTED WORKS</span><span>BUILT WITH CURIOSITY & CODE</span></footer>
      </div>

      {detailOpen && activeProject && (
        <div className="vhs-detail-backdrop" role="presentation" onClick={() => setDetailOpen(false)}>
          <article className="vhs-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="vhs-detail-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="vhs-detail-close" onClick={() => setDetailOpen(false)} aria-label="Close project details"><X size={19} /> CLOSE</button>
            <div className="vhs-detail-topline"><span>SHISHIR SHETTY · PROJECT ARCHIVE</span><span>{activeProject.category || "PROJECT"}</span></div>
            <div className="vhs-detail-grid">
              <div className="vhs-detail-poster">
                <ProjectVisual project={activeProject} index={activeIndex} />
                <span className="vhs-poster-caption">PROJECT NO. {String(activeIndex + 1).padStart(2, "0")}</span>
              </div>
              <div className="vhs-detail-content">
                <p className="vhs-eyebrow">THE WORK / {activeProject.category || "PROJECT"}</p>
                <h2 id="vhs-detail-title">{activeProject.title}</h2>
                <p className="vhs-detail-description">{activeProject.description || activeProject.short_description}</p>
                {activeProject.problem && <section><h3>THE PROBLEM</h3><p>{activeProject.problem}</p></section>}
                {activeProject.solution && <section><h3>THE APPROACH</h3><p>{activeProject.solution}</p></section>}
                <section><h3>BUILT WITH</h3><div className="vhs-detail-tech">{(activeProject.technologies || []).map((technology) => <span key={technology}>{technology}</span>)}</div></section>
                <div className="vhs-detail-links">
                  {activeProject.github_url && <a href={activeProject.github_url} target="_blank" rel="noreferrer"><FaGithub size={16} /> SOURCE CODE <ArrowUpRight size={14} /></a>}
                  {activeProject.live_url && <a href={activeProject.live_url} target="_blank" rel="noreferrer">VIEW LIVE <ArrowUpRight size={14} /></a>}
                </div>
              </div>
            </div>
            <div className="vhs-detail-bottom"><span>END OF PROJECT RECORD</span><button type="button" onClick={() => { setDetailOpen(false); move(1); }}>NEXT PROJECT <ArrowUpRight size={14} /></button></div>
          </article>
        </div>
      )}
    </section>
  );
}
