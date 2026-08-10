"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
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
  const [editing, setEditing] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  async function loadProjects() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("PROJECT LOAD ERROR:", {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
      });

      setError(fetchError.message || "Unable to load projects.");
      setProjects([]);
      setLoading(false);
      return;
    }

    setProjects((data as Project[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function resetForm() {
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
    setDisplayOrder(0);
    setIsPublished(true);

    setEditing(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  }

  function openAddForm() {
    resetForm();
    setShowForm(true);
  }

  function editProject(project: Project) {
    setEditing(project);

    setTitle(project.title);
    setSlug(project.slug);
    setCategory(project.category || "");
    setShortDescription(project.short_description || "");
    setDescription(project.description || "");
    setProblem(project.problem || "");
    setSolution(project.solution || "");

    setTechnologies(
      Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : ""
    );

    setGithubUrl(project.github_url || "");
    setLiveUrl(project.live_url || "");
    setImageUrl(project.image_url || "");

    setFeatured(project.featured);
    setDisplayOrder(project.display_order ?? 0);
    setIsPublished(project.is_published);

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!editing) {
      setSlug(generateSlug(value));
    }
  }

  async function saveProject() {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!slug.trim()) {
      setError("Project slug is required.");
      return;
    }

    setSaving(true);

    const technologyList = technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || null,
      short_description: shortDescription.trim() || null,
      description: description.trim() || null,
      problem: problem.trim() || null,
      solution: solution.trim() || null,
      technologies: technologyList,
      github_url: githubUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      image_url: imageUrl.trim() || null,
      featured,
      display_order: Number(displayOrder) || 0,
      is_published: isPublished,
    };

    try {
      if (editing) {
        const { error: updateError } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editing.id);

        if (updateError) {
          console.error("PROJECT UPDATE ERROR:", {
            code: updateError.code,
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint,
          });

          setError(updateError.message || "Unable to update project.");
          setSaving(false);
          return;
        }

        setSuccess("Project updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("projects")
          .insert(payload);

        if (insertError) {
          console.error("PROJECT INSERT ERROR:", {
            code: insertError.code,
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
          });

          setError(insertError.message || "Unable to save project.");
          setSaving(false);
          return;
        }

        setSuccess("Project created successfully.");
      }

      await loadProjects();

      setSaving(false);

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (err) {
      console.error("PROJECT SAVE EXCEPTION:", err);

      setError("Something went wrong while saving the project.");
      setSaving(false);
    }
  }

  async function removeProject(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setDeleting(id);
    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("PROJECT DELETE ERROR:", {
        code: deleteError.code,
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint,
      });

      setError(deleteError.message || "Unable to delete project.");
      setDeleting(null);
      return;
    }

    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );

    setSuccess("Project deleted successfully.");
    setDeleting(null);
  }

  async function togglePublished(project: Project) {
    setError("");
    setSuccess("");

    const newStatus = !project.is_published;

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        is_published: newStatus,
      })
      .eq("id", project.id);

    if (updateError) {
      console.error("PROJECT PUBLISH ERROR:", {
        code: updateError.code,
        message: updateError.message,
        details: updateError.details,
        hint: updateError.hint,
      });

      setError(
        updateError.message || "Unable to update publication status."
      );

      return;
    }

    setProjects((current) =>
      current.map((item) =>
        item.id === project.id
          ? {
              ...item,
              is_published: newStatus,
            }
          : item
      )
    );

    setSuccess(
      newStatus ? "Project published." : "Project unpublished."
    );
  }

  return (
    <main>
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/60">
            Portfolio Content
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
          <strong className="font-medium">Error:</strong> {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/50">
                {editing ? "Edit existing project" : "New portfolio project"}
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editing ? "Edit Project" : "Add Project"}
              </h2>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg p-2 text-white/40 transition hover:bg-white/[0.05] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Project title *
              </label>

              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Agri Vision"
                className="input"
              />
            </div>

            {/* SLUG */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Slug *
              </label>

              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="agri-vision"
                className="input"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Category
              </label>

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="AI / ML · IoT"
                className="input"
              />
            </div>

            {/* SHORT DESCRIPTION */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Short description
              </label>

              <input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A short summary of the project"
                className="input"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed project description"
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* PROBLEM */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Problem
              </label>

              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What problem does this project solve?"
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* SOLUTION */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Solution
              </label>

              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How does your project solve it?"
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* TECHNOLOGIES */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Technologies
              </label>

              <input
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, TensorFlow, Raspberry Pi, Supabase"
                className="input"
              />

              <p className="mt-2 text-xs text-white/25">
                Separate technologies with commas.
              </p>
            </div>

            {/* GITHUB */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                GitHub URL
              </label>

              <input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="input"
              />
            </div>

            {/* LIVE URL */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Live URL
              </label>

              <input
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="input"
              />
            </div>

            {/* IMAGE */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Image URL
              </label>

              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="input"
              />
            </div>

            {/* DISPLAY ORDER */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Display order
              </label>

              <input
                type="number"
                min="0"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(Number(e.target.value))
                }
                className="input"
              />
            </div>

            {/* OPTIONS */}
            <div className="flex flex-col justify-end gap-3">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 accent-emerald-400"
                />

                <Star size={15} />

                Featured project
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 accent-emerald-400"
                />

                <Eye size={15} />

                Published on portfolio
              </label>
            </div>
          </div>

          {/* FORM BUTTONS */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveProject}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-medium text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && (
                <Loader2 size={17} className="animate-spin" />
              )}

              {saving
                ? "Saving..."
                : editing
                  ? "Update Project"
                  : "Save Project"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="rounded-xl border border-white/[0.08] px-6 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PROJECT LIST */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-3 text-sm text-white/40">
            <Loader2 size={18} className="animate-spin" />
            Loading projects...
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <Plus size={22} className="text-white/25" />
          </div>

          <h3 className="mt-5 text-lg font-medium">
            No projects yet
          </h3>

          <p className="mt-2 text-sm text-white/35">
            Add your first project to start building your portfolio.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black"
          >
            Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.12]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-medium">
                      {project.title}
                    </h3>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/[0.08] px-2 py-1 text-[10px] text-amber-300">
                        <Star size={11} />
                        Featured
                      </span>
                    )}

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                        project.is_published
                          ? "bg-emerald-400/[0.08] text-emerald-300"
                          : "bg-white/[0.05] text-white/35"
                      }`}
                    >
                      {project.is_published ? (
                        <Eye size={11} />
                      ) : (
                        <EyeOff size={11} />
                      )}

                      {project.is_published
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-white/25">
                    /{project.slug}
                    {project.category
                      ? ` · ${project.category}`
                      : ""}
                  </p>

                  {project.short_description && (
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-white/40">
                      {project.short_description}
                    </p>
                  )}

                  {project.technologies?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/35"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                      title="GitHub"
                    >
                      <FaGithub size={16} />
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                      title="Live project"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => togglePublished(project)}
                    className="rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/45 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {project.is_published
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    type="button"
                    onClick={() => editProject(project)}
                    className="rounded-lg border border-white/[0.08] p-2 text-white/45 transition hover:bg-white/[0.04] hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    disabled={deleting === project.id}
                    className="rounded-lg border border-red-400/10 p-2 text-red-400/60 transition hover:bg-red-400/[0.05] hover:text-red-400 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === project.id ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}