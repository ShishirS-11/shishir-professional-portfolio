"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="top"
      className="tech-grid relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-emerald-400/[0.045] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-2 text-xs text-emerald-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            Open to opportunities
          </span>

          <span className="hidden text-white/20 sm:block">
            /
          </span>

          <span className="flex items-center gap-2 text-xs text-white/30">
            <Terminal size={13} />
            software.engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-8xl"
        >
          I build things
          <br />
          <span className="text-white/30">
            that actually{" "}
          </span>
          <span className="text-emerald-300">
            work.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-white/45 md:text-xl"
        >
          I&apos;m Shishir Shetty — an AI &amp; Data Science engineer
          building across software development, cloud, databases,
          data and AI/ML.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group flex items-center gap-3 rounded-full bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-[#04100b] transition hover:bg-emerald-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
          >
            See my work

            <ArrowDownRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
            />
          </a>

          <a
            href="https://github.com/ShishirS-11"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm text-white/55 transition hover:border-emerald-400/25 hover:text-emerald-300"
          >
            <FaGithub size={17} />
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/shishirshetty2004"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm text-white/55 transition hover:border-emerald-400/25 hover:text-emerald-300"
          >
            <FaLinkedin size={17} />
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-24 flex flex-wrap gap-x-8 gap-y-3 border-t border-emerald-400/10 pt-6 text-sm text-white/25"
        >
          <span>Software Development</span>
          <span>Cloud</span>
          <span>Data</span>
          <span>AI / ML</span>
          <span>GenAI</span>
        </motion.div>
      </div>
    </section>
  );
}