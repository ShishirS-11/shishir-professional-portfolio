"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="tech-grid border-t border-black/[0.07] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Let&apos;s connect</p>
          <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">Have an opportunity?<br /><span className="text-[#86868b]">Let&apos;s talk.</span></h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6e6e73] md:text-xl">I&apos;m interested in opportunities across software development, cloud, data, AI/ML and GenAI.</p>
        </motion.div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <a href="mailto:shishirshetty945@gmail.com" className="tech-card group rounded-[2rem] p-7"><Mail size={21} className="text-emerald-700" /><p className="mt-10 text-sm font-medium text-emerald-700">Email</p><p className="mt-2 break-all text-sm text-[#515156]">shishirshetty945@gmail.com</p><ArrowUpRight size={17} className="mt-6 text-[#a1a1a6] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700" /></a>
          <a href="https://github.com/ShishirS-11" target="_blank" rel="noreferrer" className="tech-card group rounded-[2rem] p-7"><FaGithub size={21} className="text-[#1d1d1f]" /><p className="mt-10 text-sm font-medium text-emerald-700">GitHub</p><p className="mt-2 text-sm text-[#515156]">ShishirS-11</p><ArrowUpRight size={17} className="mt-6 text-[#a1a1a6] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700" /></a>
          <a href="https://linkedin.com/in/shishirshetty2004" target="_blank" rel="noreferrer" className="tech-card group rounded-[2rem] p-7"><FaLinkedin size={21} className="text-blue-600" /><p className="mt-10 text-sm font-medium text-emerald-700">LinkedIn</p><p className="mt-2 text-sm text-[#515156]">shishirshetty2004</p><ArrowUpRight size={17} className="mt-6 text-[#a1a1a6] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700" /></a>
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm text-[#86868b]"><MapPin size={15} className="text-emerald-700" /> Karnataka, India</div>
      </div>
    </section>
  );
}
