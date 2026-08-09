"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  short_description: string | null;
  description: string | null;
  problem: string | null;
  solution: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  display_order: number;
  is_published: boolean;
};

export default function ProjectsAdminPage() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] =
    useState<Project | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [technologies, setTechnologies] =
    useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] =
    useState(false);

  async function loadProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("display_order");

    setProjects((data as Project[]) || []);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function reset() {
    setTitle("");
    setSlug("");
    setCategory("");
    setShortDescription("");
    setDescription("");
    setProblem("");
    setSolution("");
    setTechnologies("");
    setGithubUrl("");
    setLiveUrl("");
    setImageUrl("");
    setFeatured(false);
    setEditing(null);
    setShowForm(false);
  }

  function edit(project: Project) {
    setEditing(project);
    setTitle(project.title);
    setSlug(project.slug);
    setCategory(project.category || "");
    setShortDescription(
      project.short_description || ""
    );
    setDescription(project.description || "");
    setProblem(project.problem || "");
    setSolution(project.solution || "");
    setTechnologies(
      project.technologies.join(", ")
    );
    setGithubUrl(project.github_url || "");
    setLiveUrl(project.live_url || "");
    setImageUrl(project.image_url || "");
    setFeatured(project.featured);
    setShowForm(true);
  }

  async function save() {
    if (!title.trim() || !slug.trim()) {
      alert("Title and slug are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || null,
      short_description:
        shortDescription.trim() || null,
      description: description.trim() || null,
      problem: problem.trim() || null,
      solution: solution.trim() || null,
      technologies: technologies
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      github_url: githubUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      image_url: imageUrl.trim() || null,
      featured,
    };

    if (editing) {
      await supabase
        .from("projects")
        .update(payload)
        .eq("id", editing.id);
    } else {
      await supabase
        .from("projects")
        .insert(payload);
    }

    reset();
    loadProjects();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;

    await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    loadProjects();
  }

  async function toggle(project: Project) {
    await supabase
      .from("projects")
      .update({
        is_published: !project.is_published,
      })
      .eq("id", project.id);

    loadProjects();
  }

  return (
    <main className="p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
              Portfolio Content
            </p>

            <h1 className="mt-2 text-4xl font-semibold">
              Projects
            </h1>

            <p className="mt-2 text-zinc-500">
              Showcase projects that demonstrate your skills.
            </p>
          </div>

          <button
            onClick={() => {
              reset();
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="mb-6 flex justify-between">
              <h2 className="text-xl font-semibold">
                {editing
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              <button onClick={reset}>
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Project title"
                className="input"
              />

              <input
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                placeholder="project-slug"
                className="input"
              />

              <input
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                placeholder="Category"
                className="input"
              />

              <input
                value={shortDescription}
                onChange={(e) =>
                  setShortDescription(e.target.value)
                }
                placeholder="Short description"
                className="input"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Full description"
                rows={4}
                className="input md:col-span-2"
              />

              <textarea
                value={problem}
                onChange={(e) =>
                  setProblem(e.target.value)
                }
                placeholder="Problem"
                rows={3}
                className="input"
              />

              <textarea
                value={solution}
                onChange={(e) =>
                  setSolution(e.target.value)
                }
                placeholder="Solution"
                rows={3}
                className="input"
              />

              <input
                value={technologies}
                onChange={(e) =>
                  setTechnologies(e.target.value)
                }
                placeholder="Python, Next.js, Supabase"
                className="input md:col-span-2"
              />

              <input
                value={githubUrl}
                onChange={(e) =>
                  setGithubUrl(e.target.value)
                }
                placeholder="GitHub URL"
                className="input"
              />

              <input
                value={liveUrl}
                onChange={(e) =>
                  setLiveUrl(e.target.value)
                }
                placeholder="Live URL"
                className="input"
              />

              <input
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(e.target.value)
                }
                placeholder="Image URL"
                className="input md:col-span-2"
              />

              <label className="flex items-center gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) =>
                    setFeatured(e.target.checked)
                  }
                />
                Featured project
              </label>
            </div>

            <button
              onClick={save}
              className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-medium text-black"
            >
              {editing
                ? "Update Project"
                : "Save Project"}
            </button>
          </div>
        )}

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-medium">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {project.short_description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-500"
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggle(project)}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs"
                >
                  {project.is_published
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <button
                  onClick={() => edit(project)}
                  className="rounded-lg border border-white/10 p-2"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => remove(project.id)}
                  className="rounded-lg border border-white/10 p-2 text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="rounded-2xl border border-white/10 p-10 text-center text-zinc-500">
              No projects yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}