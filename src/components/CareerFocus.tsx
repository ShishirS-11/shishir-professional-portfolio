"use client";

import { motion } from "framer-motion";
import { Code2, Cloud, Database, BrainCircuit, BarChart3, ArrowUpRight } from "lucide-react";

const areas = [
  { number: "01", title: "Software", description: "Building applications, APIs and practical software that solve real problems.", icon: Code2, tags: ["Python", "JavaScript", "REST APIs", "Web"], visual: "code" },
  { number: "02", title: "Cloud", description: "Understanding how applications move from localhost to reliable cloud infrastructure.", icon: Cloud, tags: ["Azure", "AWS", "Linux", "Deployment"], visual: "cloud" },
  { number: "03", title: "Databases", description: "Working with structured and unstructured data and the systems behind applications.", icon: Database, tags: ["SQL", "MySQL", "MongoDB", "Firebase"], visual: "database" },
  { number: "04", title: "Data", description: "Turning raw data into useful information through analysis, processing and visualization.", icon: BarChart3, tags: ["Pandas", "NumPy", "Analytics", "Visualization"], visual: "data" },
  { number: "05", title: "AI / ML", description: "Building intelligent systems using machine learning, deep learning and computer vision.", icon: BrainCircuit, tags: ["Scikit-learn", "TensorFlow", "Keras", "OpenCV"], visual: "ai" },
];

function Visual({ type }: { type: string }) {
  if (type === "cloud") return <div className="skill-visual"><div className="absolute left-1/2 top-[55%] h-20 w-36 -translate-x-1/2 -translate-y-1/2 rounded-[45%] bg-gradient-to-br from-blue-200 via-white to-violet-200 shadow-[0_20px_45px_rgba(75,130,220,.2)] float-soft" /><div className="absolute left-[31%] top-[34%] h-20 w-20 rounded-full bg-white/85 shadow-lg float-soft-delay" /><div className="absolute left-[48%] top-[27%] h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-white shadow-lg float-soft-delay-2" /><div className="absolute left-[67%] top-[39%] h-16 w-16 rounded-full bg-white/85 shadow-lg float-soft" /><div className="absolute left-1/2 top-[50%] h-2 w-44 -translate-x-1/2 rounded-full bg-blue-300/20" /></div>;
  if (type === "database") return <div className="skill-visual"><div className="absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2"><div className="absolute inset-x-0 top-0 h-8 rounded-[50%] bg-gradient-to-r from-blue-400 to-violet-400 shadow-lg" /><div className="absolute inset-x-0 top-4 h-16 rounded-b-[50%] bg-gradient-to-br from-blue-300 to-violet-300 shadow-xl" /><div className="absolute inset-x-0 top-9 h-7 rounded-[50%] border-2 border-white/50 bg-blue-400/25" /></div><div className="absolute right-[20%] top-[22%] h-3 w-3 rounded-full bg-blue-400 ambient-orb" /><div className="absolute left-[20%] bottom-[22%] h-4 w-4 rounded-full bg-violet-400 ambient-orb-slow" /></div>;
  if (type === "data") return <div className="skill-visual"><div className="absolute bottom-10 left-1/2 flex h-28 -translate-x-1/2 items-end gap-3"><span className="w-7 rounded-t-xl bg-gradient-to-t from-blue-500 to-blue-200 float-soft-delay" style={{ height: "48%" }} /><span className="w-7 rounded-t-xl bg-gradient-to-t from-violet-500 to-violet-200 float-soft" style={{ height: "78%" }} /><span className="w-7 rounded-t-xl bg-gradient-to-t from-pink-500 to-pink-200 float-soft-delay-2" style={{ height: "60%" }} /><span className="w-7 rounded-t-xl bg-gradient-to-t from-emerald-500 to-emerald-200 float-soft-delay" style={{ height: "92%" }} /></div><svg className="absolute left-[22%] top-[22%] h-24 w-56 overflow-visible" viewBox="0 0 220 80"><path d="M0 62 C35 48, 55 55, 80 34 S125 50, 145 25 S185 25, 220 8" fill="none" stroke="rgba(20,126,251,.55)" strokeWidth="4" strokeLinecap="round" /></svg></div>;
  if (type === "ai") return <div className="skill-visual"><div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[30%] bg-gradient-to-br from-violet-500 via-blue-500 to-pink-400 shadow-[0_22px_55px_rgba(100,90,230,.28)] pulse-soft"><BrainCircuit className="absolute inset-0 m-auto text-white" size={58} strokeWidth={1.2} /></div>{[0,1,2,3,4,5].map((i)=><span key={i} className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-blue-400 shadow-lg" style={{ transform: `rotate(${i * 60}deg) translateY(-105px)` }} />)}</div>;
  return <div className="skill-visual"><div className="absolute left-1/2 top-1/2 h-28 w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-gradient-to-br from-[#17203a] to-[#3b4d87] shadow-[0_24px_55px_rgba(40,60,120,.2)] float-soft"><Code2 className="absolute inset-0 m-auto text-blue-200" size={55} strokeWidth={1.3} /></div><div className="absolute left-[17%] top-[23%] rounded-xl bg-white/75 px-3 py-2 text-xs font-semibold text-blue-600 shadow-lg float-soft-delay">&lt;/&gt;</div><div className="absolute right-[16%] bottom-[22%] rounded-xl bg-white/75 px-3 py-2 text-xs font-semibold text-violet-600 shadow-lg float-soft-delay-2">API</div></div>;
}

export default function CareerFocus() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-3 text-sm font-semibold uppercase tracking-[.2em] text-blue-600">What I&apos;m into</p><h2 className="text-4xl font-semibold leading-tight tracking-[-.045em] md:text-6xl">Five areas.<br /><span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">One direction.</span></h2></div>
          <p className="max-w-md text-base leading-7 text-[#687187]">I&apos;m interested in the complete journey — writing the code, working with the data, deploying the application and making the system useful.</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => { const Icon = area.icon; return (
            <motion.article key={area.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: index * .07 }} className="tech-card rounded-[28px] p-7">
              <Visual type={area.visual} />
              <div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#9aa2b4]">{area.number}</span><Icon size={20} className="text-blue-600/70" /></div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{area.title}</h3>
              <p className="mt-3 min-h-[76px] text-sm leading-7 text-[#687187]">{area.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{area.tags.map(tag => <span key={tag} className="rounded-full bg-[#eef3ff] px-3 py-1.5 text-xs font-medium text-[#52658e]">{tag}</span>)}</div>
              <div className="mt-5 flex justify-end"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgba(30,50,100,.1)]"><ArrowUpRight size={16} className="text-[#26334f]" /></span></div>
            </motion.article>
          ); })}
        </div>
      </div>
    </section>
  );
}
