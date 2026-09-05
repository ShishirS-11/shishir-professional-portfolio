"use client";

import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div><p className="text-lg font-semibold tracking-tight text-[#1d1d1f]">SHISHIR SHETTY<span className="text-emerald-600">.</span></p><p className="mt-2 text-sm text-[#86868b]">Software · Cloud · Data · AI/ML</p></div>
        <div className="flex items-center gap-5">
          <a href="https://github.com/ShishirS-11" target="_blank" rel="noreferrer" className="text-[#86868b] transition hover:text-[#1d1d1f]" aria-label="GitHub"><FaGithub size={19} /></a>
          <a href="https://linkedin.com/in/shishirshetty2004" target="_blank" rel="noreferrer" className="text-[#86868b] transition hover:text-blue-600" aria-label="LinkedIn"><FaLinkedin size={19} /></a>
          <a href="#top" className="group flex items-center gap-2 text-sm text-[#86868b] transition hover:text-[#1d1d1f]">Back to top<ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-black/[0.07] pt-6"><p className="text-xs text-[#a1a1a6]">© {new Date().getFullYear()} Shishir Shetty. Built with Next.js.</p></div>
    </footer>
  );
}
