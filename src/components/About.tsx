"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="border-t border-black/[0.07] px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">A little about me</p>
            <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">More than just <span className="text-[#86868b]">a tech stack.</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }} className="max-w-3xl">
            <p className="text-xl leading-9 text-[#3f3f44] md:text-2xl md:leading-10">I&apos;m Shishir Shetty, an Artificial Intelligence &amp; Data Science engineering student who enjoys turning ideas into things people can actually use.</p>
            <p className="mt-7 text-base leading-8 text-[#6e6e73] md:text-lg">I started with Python, machine learning and data, but became increasingly interested in everything around the model — software, APIs, databases, cloud platforms and deployment.</p>
            <p className="mt-6 text-base leading-8 text-[#6e6e73] md:text-lg">That&apos;s why I&apos;m building my career across software development, cloud, databases, data and AI/ML instead of putting myself into just one box.</p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Build", "Learn", "Experiment", "Deploy"].map((item, index) => <div key={item} className="rounded-2xl border border-black/[0.07] bg-white/65 px-4 py-4 shadow-sm"><span className="text-xs font-medium text-emerald-700">0{index + 1}</span><p className="mt-2 text-sm font-medium text-[#3f3f44]">{item}</p></div>)}
            </div>
            <a href="#projects" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-blue-700">See what I&apos;ve built<ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
