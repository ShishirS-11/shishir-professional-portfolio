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
      <nav className="tech-card mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-4">
        <a
          href="#top"
          className="group flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          SHISHIR<span className="text-emerald-400">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/50 transition hover:text-emerald-300"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm font-medium text-emerald-300 transition hover:border-emerald-400/50 hover:bg-emerald-400/15"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-white/70 transition hover:text-emerald-300 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-emerald-400/10 bg-[#09100d] p-4 shadow-2xl md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-emerald-400/5 hover:text-emerald-300"
                >
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