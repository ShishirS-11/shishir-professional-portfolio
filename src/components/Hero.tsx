"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-10">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-28 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-[#3f3f44] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open to opportunities
          </span>
          <span className="hidden text-black/20 sm:block">/</span>
          <span className="flex items-center gap-2 text-xs text-[#86868b]"><Terminal size={13} /> software.engineer</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-6xl md:text-8xl">
          I build things
          <br />
          <span className="text-[#86868b]">that actually </span>
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">work.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-8 max-w-2xl text-lg leading-8 text-[#6e6e73] md:text-xl">
          I&apos;m Shishir Shetty — an AI &amp; Data Science engineer building across software development, cloud, databases, data and AI/ML.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#projects" className="group flex items-center gap-3 rounded-full bg-[#1d1d1f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#333336] hover:-translate-y-0.5">
            See my work
            <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
          <a href="https://github.com/ShishirS-11" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-5 py-3.5 text-sm text-[#515156] transition hover:border-black/20 hover:bg-white hover:text-[#1d1d1f]">
            <FaGithub size={17} /> GitHub
          </a>
          <a href="https://linkedin.com/in/shishirshetty2004" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-5 py-3.5 text-sm text-[#515156] transition hover:border-black/20 hover:bg-white hover:text-[#1d1d1f]">
            <FaLinkedin size={17} /> LinkedIn
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-24 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/10 pt-6 text-sm text-[#86868b]">
          <span>Software Development</span><span>Cloud</span><span>Data</span><span>AI / ML</span><span>GenAI</span>
        </motion.div>
      </div>
    </section>
  );
}
