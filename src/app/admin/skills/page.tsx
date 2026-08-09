"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

const initialSkills = [
  { id: 1, name: "Python", category: "Software" },
  { id: 2, name: "JavaScript", category: "Software" },
  { id: 3, name: "Microsoft Azure", category: "Cloud" },
  { id: 4, name: "AWS", category: "Cloud" },
  { id: 5, name: "SQL", category: "Database" },
  { id: 6, name: "MySQL", category: "Database" },
  { id: 7, name: "Pandas", category: "Data" },
  { id: 8, name: "NumPy", category: "Data" },
  { id: 9, name: "TensorFlow", category: "AI / ML" },
  { id: 10, name: "Scikit-learn", category: "AI / ML" },
  { id: 11, name: "OpenCV", category: "AI / ML" },
  { id: 12, name: "Git", category: "Tools" },
];

export default function SkillsAdmin() {
  const [skills, setSkills] = useState(initialSkills);

  const removeSkill = (id: number) => {
    setSkills((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">
            Content
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Skills
          </h1>

          <p className="mt-2 text-sm text-white/30">
            Control the technologies shown on your portfolio.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#04100b] transition hover:bg-emerald-300">
          <Plus size={17} />
          Add skill
        </button>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group rounded-2xl border border-emerald-400/10 bg-[#0a100d] p-5 transition hover:border-emerald-400/20"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-medium text-white/75">
                  {skill.name}
                </h2>

                <p className="mt-1 text-xs text-emerald-300/40">
                  {skill.category}
                </p>
              </div>

              <div className="flex gap-1 opacity-60 transition group-hover:opacity-100">
                <button className="rounded-lg p-2 text-white/30 hover:text-emerald-300">
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => removeSkill(skill.id)}
                  className="rounded-lg p-2 text-white/30 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}