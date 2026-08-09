"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AchievementsAdmin() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">
            Content
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Achievements
          </h1>

          <p className="mt-2 text-sm text-white/30">
            Manage awards, competitions and recognition.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#04100b] transition hover:bg-emerald-300">
          <Plus size={17} />
          Add achievement
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-emerald-400/10 bg-[#0a100d] p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
              2025
            </p>

            <h2 className="mt-3 text-2xl font-medium">
              First Prize — Agri Vision
            </h2>

            <p className="mt-2 text-sm text-white/35">
              RNSIT Intra-Department Project Exhibition
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
          Recognized for the Agri Vision soil monitoring and crop
          recommendation system.
        </p>
      </div>
    </div>
  );
}