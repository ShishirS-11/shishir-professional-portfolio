"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Database, Lightbulb, Rocket } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pt-36">
      <div className="hero-aurora left-[-16rem] top-[-10rem]" />
      <div className="hero-aurora right-[-17rem] top-[6rem] opacity-30" />
      <div className="pointer-events-none absolute left-[-7rem] top-[18rem] h-64 w-64 rounded-full bg-blue-300/20 blur-3xl ambient-orb" />
      <div className="pointer-events-none absolute right-[-5rem] bottom-[8rem] h-72 w-72 rounded-full bg-violet-300/20 blur-3xl ambient-orb-slow" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-4">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-xs font-semibold text-[#4d5870] shadow-sm backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-soft" />
              OPEN TO OPPORTUNITIES
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .08 }} className="max-w-3xl text-[3.4rem] font-semibold leading-[.94] tracking-[-.065em] text-[#101426] sm:text-6xl md:text-7xl xl:text-[5.8rem]">
            Turning Ideas
            <br />
            <span className="shimmer bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">Into Reality.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .22 }} className="mt-7 max-w-xl text-lg leading-8 text-[#59627a] md:text-xl">
            I&apos;m Shishir Shetty, an AI &amp; Data Science engineer who enjoys building clean, scalable solutions and exploring new technologies to solve real-world problems.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .34 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-3 rounded-full bg-[#101426] px-6 py-3.5 text-sm font-semibold !text-white shadow-[0_14px_30px_rgba(16,20,38,.18)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,20,38,.23)]">
              View my work <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="mailto:shishirshetty945@gmail.com" className="group inline-flex items-center gap-2 rounded-full bg-[#101426] px-6 py-3.5 text-sm font-semibold !text-white shadow-[0_14px_30px_rgba(16,20,38,.16)] transition hover:-translate-y-1 hover:bg-[#05070d] hover:shadow-[0_18px_40px_rgba(16,20,38,.23)]">
              Let&apos;s talk <ArrowUpRight size={17} />
            </a>
            <a href="https://github.com/ShishirS-11" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/60 px-4 py-3.5 text-sm text-[#59627a] transition hover:bg-white hover:text-[#101426]"><FaGithub size={17} /> GitHub</a>
            <a href="https://linkedin.com/in/shishirshetty2004" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/60 px-4 py-3.5 text-sm text-[#59627a] transition hover:bg-white hover:text-[#101426]"><FaLinkedin size={17} /> LinkedIn</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .55 }} className="mt-12 grid max-w-xl grid-cols-4 border-t border-black/8 pt-6">
            <div><strong className="text-3xl tracking-tight">3+</strong><p className="mt-1 text-xs text-[#7b849a]">Projects</p></div>
            <div className="border-l border-black/7 pl-5"><strong className="text-3xl tracking-tight">30+</strong><p className="mt-1 text-xs text-[#7b849a]">Skills</p></div>
            <div className="border-l border-black/7 pl-5"><strong className="text-3xl tracking-tight">5+</strong><p className="mt-1 text-xs text-[#7b849a]">Domains</p></div>
            <div className="border-l border-black/7 pl-5"><strong className="text-3xl tracking-tight">∞</strong><p className="mt-1 text-xs text-[#7b849a]">Learning</p></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .92, x: 25 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: .15 }} className="relative mx-auto h-[470px] w-full max-w-[590px] lg:h-[560px]">
          <div className="absolute inset-[9%] rounded-full bg-gradient-to-br from-blue-300/25 via-violet-300/25 to-pink-200/20 blur-3xl pulse-soft" />
          <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-gradient-to-br from-white/75 via-blue-100/45 to-violet-100/55 shadow-[0_35px_90px_rgba(74,105,170,.18)] backdrop-blur-xl float-soft">
            <div className="absolute inset-7 rounded-full border border-blue-300/25" />
            <div className="absolute inset-14 rounded-full border border-violet-300/25 spin-slow" />
            <div className="absolute inset-[29%] rounded-[28%] bg-gradient-to-br from-[#18213c] via-[#303d70] to-[#6e58b8] shadow-2xl float-soft-delay">
              <div className="absolute inset-3 rounded-[22%] border border-white/20 bg-gradient-to-br from-blue-400/20 to-violet-500/10" />
              <Code2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200" size={68} strokeWidth={1.3} />
            </div>
            <div className="absolute -left-8 top-[37%] glass-illustration rounded-2xl p-3 float-soft-delay-2"><Database size={24} className="text-blue-600" /></div>
            <div className="absolute -right-8 top-[20%] glass-illustration rounded-2xl p-3 float-soft"><Lightbulb size={24} className="text-amber-500" /></div>
            <div className="absolute -right-2 bottom-[12%] glass-illustration rounded-2xl p-3 float-soft-delay"><Rocket size={24} className="text-violet-600" /></div>
            <div className="absolute -left-10 bottom-[20%] rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-semibold text-[#33405d] shadow-lg backdrop-blur-xl float-soft-delay-2">Build · Learn · Repeat</div>
          </div>
          <div className="absolute right-[7%] top-[10%] text-sm font-medium italic text-violet-500/75 float-soft">Ideas<br />Code<br />Impact ↓</div>
          <div className="absolute bottom-[4%] right-[4%] max-w-[145px] text-right text-sm font-medium italic text-violet-500/70 float-soft-delay-2">Better solutions<br />every day ↙</div>
          <div className="absolute left-[9%] top-[14%] h-3 w-3 rounded-full bg-blue-400 shadow-lg ambient-orb" />
          <div className="absolute right-[12%] bottom-[24%] h-4 w-4 rounded-full bg-pink-400 shadow-lg ambient-orb-slow" />
        </motion.div>
      </div>
    </section>
  );
}
