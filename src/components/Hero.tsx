"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pt-40">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="hero-orb hero-orb-three" />
      <div className="hero-noise" />
      <div className="hero-line hero-line-one" />
      <div className="hero-line hero-line-two" />

      <div className="relative mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-4 py-2 text-xs font-medium text-[#55555a] shadow-sm backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Open to opportunities
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#86868b]"><Sparkles size={13} /> AI · Data · Software</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .08 }} className="max-w-4xl text-[3.6rem] font-semibold leading-[.94] tracking-[-.065em] text-[#1d1d1f] sm:text-6xl md:text-8xl lg:text-[7.6rem]">
            I build things
            <br />
            <span className="hero-gradient-text">that actually work.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .22 }} className="mt-8 max-w-2xl text-lg leading-8 text-[#6e6e73] md:text-xl">
            I&apos;m Shishir Shetty — an AI &amp; Data Science engineer building across software development, cloud, databases, data and AI/ML.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .34 }} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex items-center gap-3 rounded-full bg-[#1d1d1f] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,.12)] transition hover:-translate-y-0.5 hover:bg-[#303033]">
              See my work <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a href="https://github.com/ShishirS-11" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/65 px-5 py-3.5 text-sm font-medium text-[#4b4b50] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
              <FaGithub size={17} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a href="https://linkedin.com/in/shishirshetty2004" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/65 px-5 py-3.5 text-sm font-medium text-[#4b4b50] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
              <FaLinkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .82, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease: "easeOut", delay: .15 }} className="relative mx-auto hidden h-[500px] w-full max-w-[520px] lg:block">
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-blue-200/70 via-violet-200/60 to-emerald-200/60 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400 via-violet-400 to-pink-300 opacity-85 shadow-[0_35px_100px_rgba(91,110,240,.25)] animate-float" />
          <div className="absolute left-1/2 top-1/2 h-80 w-32 -translate-x-1/2 -translate-y-1/2 rotate-[38deg] rounded-[50%] border-2 border-white/80 shadow-[0_0_50px_rgba(124,92,255,.18)] animate-spin-slow" />
          <div className="absolute left-1/2 top-1/2 h-80 w-32 -translate-x-1/2 -translate-y-1/2 -rotate-[38deg] rounded-[50%] border border-white/75 animate-spin-slow-reverse" />
          <div className="absolute left-[17%] top-[19%] rounded-2xl border border-white/70 bg-white/65 px-4 py-3 text-xs font-medium text-[#45454a] shadow-lg backdrop-blur-xl animate-float-slow">⚡ Turn ideas into reality</div>
          <div className="absolute bottom-[18%] right-[4%] rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-xs font-medium text-[#45454a] shadow-lg backdrop-blur-xl animate-float-reverse">↗ Always learning</div>
          <div className="absolute bottom-[4%] left-[10%] text-sm italic text-violet-500/70">Ideas · Code · Impact</div>
          <div className="absolute right-[10%] top-[8%] h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_25px_rgba(59,130,246,.5)] animate-ping" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .65 }} className="relative mx-auto mt-14 max-w-7xl border-t border-black/[0.07] pt-6">
        <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium text-[#86868b]">
          <span>Software Development</span><span>Cloud</span><span>Data</span><span>AI / ML</span><span>GenAI</span>
        </div>
      </motion.div>
    </section>
  );
}
