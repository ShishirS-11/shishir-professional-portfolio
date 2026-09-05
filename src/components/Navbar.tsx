"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-black/[0.07] bg-white/75 px-4 py-2.5 shadow-[0_8px_35px_rgba(0,0,0,.06)] backdrop-blur-2xl md:px-5">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#1d1d1f]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,.35)]" />
          SHISHIR SHETTY<span className="text-emerald-600">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-[13px] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]">
              {item.label}
            </a>
          ))}
          <a href="#contact" className="group flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2 text-[13px] font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#303033]">
            Let&apos;s talk <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-full p-2 text-[#1d1d1f] md:hidden" aria-label="Toggle navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {open && (
          <div className="absolute left-2 right-2 top-[calc(100%+10px)] rounded-3xl border border-black/[0.07] bg-white/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,.12)] backdrop-blur-2xl md:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-sm text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
