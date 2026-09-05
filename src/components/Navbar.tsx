"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav className="tech-card mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#101426]">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 shadow-[0_0_12px_rgba(20,126,251,.25)]" />
          SHISHIR SHETTY<span className="text-blue-600">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map(item => <a key={item.href} href={item.href} className="text-sm font-medium text-[#687187] transition hover:text-[#101426]">{item.label}</a>)}
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-[#101426] px-5 py-2.5 text-sm font-medium text-[#ffffff] shadow-[0_8px_22px_rgba(16,20,38,.16)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,20,38,.22)]">
            Let&apos;s talk <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-full p-2 text-[#101426] md:hidden" aria-label="Toggle navigation">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        {open && <div className="absolute left-4 right-4 top-[calc(100%+10px)] rounded-3xl border border-black/8 bg-white/95 p-3 shadow-[0_20px_60px_rgba(20,30,70,.14)] backdrop-blur-xl md:hidden"><div className="flex flex-col gap-1">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#687187] hover:bg-[#f4f6fb] hover:text-[#101426]">{item.label}</a>)}</div></div>}
      </nav>
    </header>
  );
}
