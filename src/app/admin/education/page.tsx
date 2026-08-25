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

type Education = {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  grade: string | null;
  description: string | null;
  institution_url: string | null;
  display_order: number;
  is_published: boolean;
};

export default function EducationAdminPage() {
  const supabase = createClient();

  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [educationToDelete, setEducationToDelete] =
    useState<Education | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [institutionUrl, setInstitutionUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  async function loadEducation() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("education")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("EDUCATION LOAD ERROR:", {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
      });

      setError(
        fetchError.message || "Unable to load education."
      );

      setEducation([]);
      setLoading(false);
      return;
    }

    setEducation((data as Education[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadEducation();
  }, []);

  function resetForm() {
    setInstitution("");
    setDegree("");
    setFieldOfStudy("");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setDescription("");
    setInstitutionUrl("");
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

  function editEducation(item: Education) {
    setEditing(item);

    setInstitution(item.institution);
    setDegree(item.degree);
    setFieldOfStudy(item.field_of_study || "");
    setStartDate(item.start_date || "");
    setEndDate(item.end_date || "");
    setGrade(item.grade || "");
    setDescription(item.description || "");
    setInstitutionUrl(item.institution_url || "");
    setDisplayOrder(item.display_order ?? 0);
    setIsPublished(item.is_published);

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  async function saveEducation() {
    setError("");
    setSuccess("");

    if (!institution.trim()) {
      setError("Institution is required.");
      return;
    }

    if (!degree.trim()) {
      setError("Degree is required.");
      return;
    }

    if (!startDate) {
      setError("Start date is required.");
      return;
    }

    setSaving(true);

    const payload = {
      institution: institution.trim(),
      degree: degree.trim(),
      field_of_study: fieldOfStudy.trim() || null,
      start_date: startDate || null,
      end_date: endDate || null,
      grade: grade.trim() || null,
      description: description.trim() || null,
      institution_url: institutionUrl.trim() || null,
      display_order: Number(displayOrder) || 0,
      is_published: isPublished,
    };

    try {
      if (editing) {
        const { error: updateError } = await supabase
          .from("education")
          .update(payload)
          .eq("id", editing.id);

        if (updateError) {
          console.error("EDUCATION UPDATE ERROR:", {
            code: updateError.code,
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint,
          });

          setError(
            updateError.message ||
              "Unable to update education."
          );

          setSaving(false);
          return;
        }

        setSuccess("Education updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("education")
          .insert(payload);

        if (insertError) {
          console.error("EDUCATION INSERT ERROR:", {
            code: insertError.code,
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
          });

          setError(
            insertError.message ||
              "Unable to save education."
          );

          setSaving(false);
          return;
        }

        setSuccess("Education created successfully.");
      }

      await loadEducation();

      setSaving(false);

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (err) {
      console.error("EDUCATION SAVE EXCEPTION:", err);

      setError(
        "Something went wrong while saving the education."
      );

      setSaving(false);
    }
  }

  async function deleteEducation(id: string) {
    setDeleting(id);
    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("education")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("EDUCATION DELETE ERROR:", {
        code: deleteError.code,
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint,
      });

      setError(
        deleteError.message ||
          "Unable to delete education."
      );

      setDeleting(null);
      return;
    }

    setEducation((current) =>
      current.filter((item) => item.id !== id)
    );

    setEducationToDelete(null);
    setDeleting(null);

    setSuccess("Education deleted successfully.");
  }

  async function togglePublished(item: Education) {
    setError("");
    setSuccess("");

    const newStatus = !item.is_published;

    const { error: updateError } = await supabase
      .from("education")
      .update({
        is_published: newStatus,
      })
      .eq("id", item.id);

    if (updateError) {
      console.error(
        "EDUCATION PUBLISH ERROR:",
        updateError
      );

      setError(
        updateError.message ||
          "Unable to update publication status."
      );

      return;
    }

    setEducation((current) =>
      current.map((educationItem) =>
        educationItem.id === item.id
          ? {
              ...educationItem,
              is_published: newStatus,
            }
          : educationItem
      )
    );

    setSuccess(
      newStatus
        ? "Education published."
        : "Education unpublished."
    );
  }

  function formatDate(date: string | null) {
    if (!date) return "—";

    const parsed = new Date(`${date}T00:00:00`);

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
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/60">
            Portfolio Content
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Education
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage your academic background and qualifications.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
          <strong className="font-medium">Error:</strong>{" "}
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/50">
                Academic Background
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editing ? "Edit Education" : "Add Education"}
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
            {/* Institution */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Institution *
              </label>

              <input
                value={institution}
                onChange={(e) =>
                  setInstitution(e.target.value)
                }
                placeholder="R. V. College of Engineering"
                className="input"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Degree *
              </label>

              <input
                value={degree}
                onChange={(e) =>
                  setDegree(e.target.value)
                }
                placeholder="Bachelor of Engineering"
                className="input"
              />
            </div>

            {/* Field */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Field of study
              </label>

              <input
                value={fieldOfStudy}
                onChange={(e) =>
                  setFieldOfStudy(e.target.value)
                }
                placeholder="Artificial Intelligence & Machine Learning"
                className="input"
              />
            </div>

            {/* Start */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Start date *
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="input"
              />
            </div>

            {/* End */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                End date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
                className="input"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Grade / CGPA
              </label>

              <input
                value={grade}
                onChange={(e) =>
                  setGrade(e.target.value)
                }
                placeholder="8.5 CGPA"
                className="input"
              />
            </div>

            {/* Institution URL */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Institution URL
              </label>

              <input
                value={institutionUrl}
                onChange={(e) =>
                  setInstitutionUrl(e.target.value)
                }
                placeholder="https://college.edu"
                className="input"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Brief description of your education..."
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* Display order */}
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

            {/* Published */}
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) =>
                    setIsPublished(e.target.checked)
                  }
                  className="h-4 w-4 accent-emerald-400"
                />

                <Eye size={16} />

                Show on public portfolio
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveEducation}
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
                  ? "Update Education"
                  : "Save Education"}
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

      {/* List */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-3 text-sm text-white/40">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading education...
          </div>
        </div>
      ) : education.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08]">
            <Plus
              size={22}
              className="text-white/25"
            />
          </div>

          <h3 className="mt-5 text-lg font-medium">
            No education yet
          </h3>

          <p className="mt-2 text-sm text-white/35">
            Add your academic background.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black"
          >
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.12]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-medium">
                      {item.degree}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                        item.is_published
                          ? "bg-emerald-400/[0.08] text-emerald-300"
                          : "bg-white/[0.05] text-white/35"
                      }`}
                    >
                      {item.is_published ? (
                        <Eye size={11} />
                      ) : (
                        <EyeOff size={11} />
                      )}

                      {item.is_published
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>

                  <p className="mt-1 text-base text-white/50">
                    {item.institution}
                  </p>

                  {item.field_of_study && (
                    <p className="mt-1 text-sm text-white/35">
                      {item.field_of_study}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/30">
                    <span>
                      {formatDate(item.start_date)} —{" "}
                      {formatDate(item.end_date)}
                    </span>

                    {item.grade && (
                      <span>
                        Grade: {item.grade}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-4 max-w-4xl text-sm leading-6 text-white/40">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {item.institution_url && (
                    <a
                      href={item.institution_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                      title="Institution website"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => togglePublished(item)}
                    className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                    title={
                      item.is_published
                        ? "Unpublish"
                        : "Publish"
                    }
                  >
                    {item.is_published ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => editEducation(item)}
                    className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setEducationToDelete(item)
                    }
                    disabled={deleting === item.id}
                    className="rounded-lg border border-red-400/10 p-2 text-red-400/60 transition hover:bg-red-400/[0.05] hover:text-red-400 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === item.id ? (
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

      {/* Delete Modal */}
      {educationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0d0c] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Delete education?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white/70">
                "{educationToDelete.degree}"
              </span>{" "}
              from{" "}
              <span className="font-medium text-white/70">
                "{educationToDelete.institution}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEducationToDelete(null)}
                disabled={deleting !== null}
                className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteEducation(educationToDelete.id)
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
                  : "Delete Education"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}