"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

const initialProjects = [
  {
    id: 1,
    title: "Agri Vision",
    category: "AI / ML · IoT",
    status: "Published",
  },
  {
    id: 2,
    title: "Lyrical Link",
    category: "AI / ML · Computer Vision",
    status: "Published",
  },
  {
    id: 3,
    title: "Shoe Store Management System",
    category: "Software · Database",
    status: "Published",
  },
];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState(initialProjects);

  const removeProject = (id: number) => {
    setProjects((items) =>
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
            Projects
          </h1>

          <p className="mt-2 text-sm text-white/30">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#04100b] transition hover:bg-emerald-300">
          <Plus size={17} />
          Add project
        </button>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-400/10 bg-[#0a100d]">
        <div className="hidden grid-cols-[1fr_220px_130px_120px] border-b border-emerald-400/10 px-6 py-4 text-[10px] uppercase tracking-[0.18em] text-white/20 md:grid">
          <span>Project</span>
          <span>Category</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {projects.map((project) => (
          <div
            key={project.id}
            className="grid gap-4 border-b border-emerald-400/[0.07] px-6 py-5 last:border-0 md:grid-cols-[1fr_220px_130px_120px] md:items-center"
          >
            <div>
              <p className="font-medium text-white/80">
                {project.title}
              </p>

              <p className="mt-1 text-xs text-white/25 md:hidden">
                {project.category}
              </p>
            </div>

            <p className="hidden text-sm text-white/35 md:block">
              {project.category}
            </p>

            <span className="w-fit rounded-full bg-emerald-400/[0.06] px-3 py-1 text-xs text-emerald-300/60">
              {project.status}
            </span>

            <div className="flex justify-start gap-2 md:justify-end">
              <button
                className="rounded-lg border border-white/10 p-2 text-white/35 transition hover:border-emerald-400/20 hover:text-emerald-300"
                title="Edit"
              >
                <Pencil size={15} />
              </button>

              <button
                onClick={() => removeProject(project.id)}
                className="rounded-lg border border-white/10 p-2 text-white/35 transition hover:border-red-400/20 hover:text-red-300"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>

              <a
                href="#projects"
                className="rounded-lg border border-white/10 p-2 text-white/35 transition hover:border-emerald-400/20 hover:text-emerald-300"
                title="View"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-white/20">
        Current actions are local UI only. Azure persistence and
        authentication will be connected next.
      </p>
    </div>
  );
}