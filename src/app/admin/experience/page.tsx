"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ExperienceAdmin() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">
            Content
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Experience
          </h1>

          <p className="mt-2 text-sm text-white/30">
            Manage internships, work experience and roles.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#04100b] transition hover:bg-emerald-300">
          <Plus size={17} />
          Add experience
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-emerald-400/10 bg-[#0a100d] p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <p className="text-xs text-emerald-300/40">
              Experience 01
            </p>

            <h2 className="mt-3 text-xl font-medium">
              Artificial Intelligence &amp; Generative AI
            </h2>

            <p className="mt-2 text-sm text-white/35">
              15-week internship
            </p>
          </div>

          <div className="flex gap-2">
            <button className="rounded-lg border border-white/10 p-2 text-white/30 hover:text-emerald-300">
              <Pencil size={15} />
            </button>

            <button className="rounded-lg border border-white/10 p-2 text-white/30 hover:text-red-300">
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        <p className="mt-7 max-w-3xl text-sm leading-7 text-white/35">
          Machine learning, deep learning, NLP, model evaluation,
          generative AI, prompt engineering and responsible AI.
        </p>
      </div>
    </div>
  );
}