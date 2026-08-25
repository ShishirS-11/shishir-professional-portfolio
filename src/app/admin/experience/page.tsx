"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  employment_type: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  responsibilities: string[];
  technologies: string[];
  company_url: string | null;
  display_order: number;
  is_published: boolean;
};

export default function ExperienceAdminPage() {
  const supabase = createClient();

  const [experiences, setExperiences] = useState<Experience[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(
    null
  );

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(
    null
  );
  const [experienceToDelete, setExperienceToDelete] =
    useState<Experience | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] =
    useState("");
  const [technologies, setTechnologies] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  async function loadExperiences() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("experience")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("EXPERIENCE LOAD ERROR:", {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
      });

      setError(
        fetchError.message ||
          "Unable to load experience."
      );

      setExperiences([]);
      setLoading(false);
      return;
    }

    setExperiences((data as Experience[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  function resetForm() {
    setCompany("");
    setRole("");
    setLocation("");
    setEmploymentType("");
    setStartDate("");
    setEndDate("");
    setIsCurrent(false);
    setDescription("");
    setResponsibilities("");
    setTechnologies("");
    setCompanyUrl("");
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

  function editExperience(experience: Experience) {
    setEditing(experience);

    setCompany(experience.company);
    setRole(experience.role);
    setLocation(experience.location || "");
    setEmploymentType(
      experience.employment_type || ""
    );

    setStartDate(experience.start_date || "");
    setEndDate(experience.end_date || "");
    setIsCurrent(experience.is_current);

    setDescription(experience.description || "");

    setResponsibilities(
      Array.isArray(experience.responsibilities)
        ? experience.responsibilities.join("\n")
        : ""
    );

    setTechnologies(
      Array.isArray(experience.technologies)
        ? experience.technologies.join(", ")
        : ""
    );

    setCompanyUrl(experience.company_url || "");
    setDisplayOrder(
      experience.display_order ?? 0
    );
    setIsPublished(experience.is_published);

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  async function saveExperience() {
    setError("");
    setSuccess("");

    if (!company.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!role.trim()) {
      setError("Role is required.");
      return;
    }

    if (!startDate) {
      setError("Start date is required.");
      return;
    }

    if (!isCurrent && !endDate) {
      setError(
        "Please provide an end date or select 'Currently working here'."
      );
      return;
    }

    setSaving(true);

    const responsibilityList = responsibilities
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const technologyList = technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || null,
      employment_type:
        employmentType.trim() || null,
      start_date: startDate || null,
      end_date: isCurrent
        ? null
        : endDate || null,
      is_current: isCurrent,
      description:
        description.trim() || null,
      responsibilities: responsibilityList,
      technologies: technologyList,
      company_url: companyUrl.trim() || null,
      display_order: Number(displayOrder) || 0,
      is_published: isPublished,
    };

    try {
      if (editing) {
        const { error: updateError } = await supabase
          .from("experience")
          .update(payload)
          .eq("id", editing.id);

        if (updateError) {
          console.error(
            "EXPERIENCE UPDATE ERROR:",
            {
              code: updateError.code,
              message: updateError.message,
              details: updateError.details,
              hint: updateError.hint,
            }
          );

          setError(
            updateError.message ||
              "Unable to update experience."
          );

          setSaving(false);
          return;
        }

        setSuccess(
          "Experience updated successfully."
        );
      } else {
        const { error: insertError } =
          await supabase
            .from("experience")
            .insert(payload);

        if (insertError) {
          console.error(
            "EXPERIENCE INSERT ERROR:",
            {
              code: insertError.code,
              message: insertError.message,
              details: insertError.details,
              hint: insertError.hint,
            }
          );

          setError(
            insertError.message ||
              "Unable to save experience."
          );

          setSaving(false);
          return;
        }

        setSuccess(
          "Experience created successfully."
        );
      }

      await loadExperiences();

      setSaving(false);

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (err) {
      console.error(
        "EXPERIENCE SAVE EXCEPTION:",
        err
      );

      setError(
        "Something went wrong while saving the experience."
      );

      setSaving(false);
    }
  }

  async function deleteExperience(id: string) {
    setDeleting(id);
    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("experience")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(
        "EXPERIENCE DELETE ERROR:",
        {
          code: deleteError.code,
          message: deleteError.message,
          details: deleteError.details,
          hint: deleteError.hint,
        }
      );

      setError(
        deleteError.message ||
          "Unable to delete experience."
      );

      setDeleting(null);
      return;
    }

    setExperiences((current) =>
      current.filter(
        (experience) => experience.id !== id
      )
    );

    setExperienceToDelete(null);
    setDeleting(null);

    setSuccess(
      "Experience deleted successfully."
    );
  }

  async function togglePublished(
    experience: Experience
  ) {
    setError("");
    setSuccess("");

    const newStatus = !experience.is_published;

    const { error: updateError } =
      await supabase
        .from("experience")
        .update({
          is_published: newStatus,
        })
        .eq("id", experience.id);

    if (updateError) {
      console.error(
        "EXPERIENCE PUBLISH ERROR:",
        updateError
      );

      setError(
        updateError.message ||
          "Unable to update publication status."
      );

      return;
    }

    setExperiences((current) =>
      current.map((item) =>
        item.id === experience.id
          ? {
              ...item,
              is_published: newStatus,
            }
          : item
      )
    );

    setSuccess(
      newStatus
        ? "Experience published."
        : "Experience unpublished."
    );
  }

  function formatDate(date: string | null) {
    if (!date) return "—";

    const parsed = new Date(
      `${date}T00:00:00`
    );

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
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
            Experience
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage your professional experience and
            career history.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
          <strong className="font-medium">
            Error:
          </strong>{" "}
          {error}
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
                Career
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editing
                  ? "Edit Experience"
                  : "Add Experience"}
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
            {/* COMPANY */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Company *
              </label>

              <input
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Company name"
                className="input"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Role *
              </label>

              <input
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                placeholder="AI/ML Intern"
                className="input"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Location
              </label>

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Bengaluru, India"
                className="input"
              />
            </div>

            {/* EMPLOYMENT TYPE */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Employment type
              </label>

              <select
                value={employmentType}
                onChange={(e) =>
                  setEmploymentType(
                    e.target.value
                  )
                }
                className="input"
              >
                <option value="">
                  Select employment type
                </option>
                <option value="Full-time">
                  Full-time
                </option>
                <option value="Part-time">
                  Part-time
                </option>
                <option value="Internship">
                  Internship
                </option>
                <option value="Contract">
                  Contract
                </option>
                <option value="Freelance">
                  Freelance
                </option>
                <option value="Apprenticeship">
                  Apprenticeship
                </option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Start date *
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="input"
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                End date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                disabled={isCurrent}
                className="input disabled:cursor-not-allowed disabled:opacity-40"
              />
            </div>

            {/* CURRENT */}
            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => {
                    setIsCurrent(
                      e.target.checked
                    );

                    if (e.target.checked) {
                      setEndDate("");
                    }
                  }}
                  className="h-4 w-4 accent-emerald-400"
                />

                I currently work here
              </label>
            </div>

            {/* COMPANY URL */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Company URL
              </label>

              <input
                value={companyUrl}
                onChange={(e) =>
                  setCompanyUrl(
                    e.target.value
                  )
                }
                placeholder="https://company.com"
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
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Brief overview of this experience..."
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* RESPONSIBILITIES */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Responsibilities
              </label>

              <textarea
                value={responsibilities}
                onChange={(e) =>
                  setResponsibilities(
                    e.target.value
                  )
                }
                placeholder={
                  "Developed ML models\nBuilt data pipelines\nWorked with deployment"
                }
                rows={6}
                className="input resize-y"
              />

              <p className="mt-2 text-xs text-white/25">
                Put each responsibility on a
                separate line.
              </p>
            </div>

            {/* TECHNOLOGIES */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Technologies
              </label>

              <textarea
                value={technologies}
                onChange={(e) =>
                  setTechnologies(
                    e.target.value
                  )
                }
                placeholder="Python, TensorFlow, SQL, AWS"
                rows={6}
                className="input resize-y"
              />

              <p className="mt-2 text-xs text-white/25">
                Separate technologies with commas.
              </p>
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
                  setDisplayOrder(
                    Number(e.target.value)
                  )
                }
                className="input"
              />
            </div>

            {/* PUBLISHED */}
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) =>
                    setIsPublished(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-emerald-400"
                />

                <Eye size={16} />

                Show on public portfolio
              </label>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveExperience}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-medium text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : editing
                  ? "Update Experience"
                  : "Save Experience"}
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

      {/* EXPERIENCE LIST */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-3 text-sm text-white/40">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading experience...
          </div>
        </div>
      ) : experiences.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08]">
            <Plus
              size={22}
              className="text-white/25"
            />
          </div>

          <h3 className="mt-5 text-lg font-medium">
            No experience yet
          </h3>

          <p className="mt-2 text-sm text-white/35">
            Add your first professional experience.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black"
          >
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.12]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-medium">
                      {experience.role}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                        experience.is_published
                          ? "bg-emerald-400/[0.08] text-emerald-300"
                          : "bg-white/[0.05] text-white/35"
                      }`}
                    >
                      {experience.is_published ? (
                        <Eye size={11} />
                      ) : (
                        <EyeOff size={11} />
                      )}

                      {experience.is_published
                        ? "Published"
                        : "Draft"}
                    </span>

                    {experience.is_current && (
                      <span className="rounded-full bg-emerald-400/[0.06] px-2 py-1 text-[10px] text-emerald-300/70">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-base text-white/50">
                    {experience.company}
                    {experience.location
                      ? ` · ${experience.location}`
                      : ""}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/30">
                    {experience.employment_type && (
                      <span>
                        {experience.employment_type}
                      </span>
                    )}

                    <span>
                      {formatDate(
                        experience.start_date
                      )}{" "}
                      —{" "}
                      {experience.is_current
                        ? "Present"
                        : formatDate(
                            experience.end_date
                          )}
                    </span>
                  </div>

                  {experience.description && (
                    <p className="mt-4 max-w-4xl text-sm leading-6 text-white/40">
                      {experience.description}
                    </p>
                  )}

                  {experience.responsibilities
                    ?.length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/40">
                        Responsibilities
                      </p>

                      <ul className="mt-3 space-y-2">
                        {experience.responsibilities.map(
                          (
                            responsibility,
                            index
                          ) => (
                            <li
                              key={`${responsibility}-${index}`}
                              className="flex gap-2 text-sm leading-6 text-white/35"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/50" />
                              {responsibility}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {experience.technologies
                    ?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/35"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {experience.company_url && (
                    <a
                      href={
                        experience.company_url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                      title="Company website"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      togglePublished(
                        experience
                      )
                    }
                    className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                    title={
                      experience.is_published
                        ? "Unpublish"
                        : "Publish"
                    }
                  >
                    {experience.is_published ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editExperience(
                        experience
                      )
                    }
                    className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setExperienceToDelete(
                        experience
                      )
                    }
                    disabled={
                      deleting === experience.id
                    }
                    className="rounded-lg border border-red-400/10 p-2 text-red-400/60 transition hover:bg-red-400/[0.05] hover:text-red-400 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === experience.id ? (
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

      {/* DELETE MODAL */}
      {experienceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0d0c] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Delete experience?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Are you sure you want to delete the{" "}
              <span className="font-medium text-white/70">
                "{experienceToDelete.role}"
              </span>{" "}
              position at{" "}
              <span className="font-medium text-white/70">
                "{experienceToDelete.company}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setExperienceToDelete(null)
                }
                disabled={deleting !== null}
                className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteExperience(
                    experienceToDelete.id
                  )
                }
                disabled={deleting !== null}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting !== null && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {deleting !== null
                  ? "Deleting..."
                  : "Delete Experience"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}