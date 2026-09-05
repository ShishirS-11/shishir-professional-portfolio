"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav className="tech-card mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          SHISHIR SHETTY<span className="text-emerald-600">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]">
              {item.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-[#1d1d1f] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#333336]">
            Let&apos;s talk
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-full p-2 text-[#1d1d1f] md:hidden" aria-label="Toggle navigation">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        {open && (
          <div className="absolute left-4 right-4 top-[calc(100%+10px)] rounded-3xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
