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

type Achievement = {
  id: string;
  title: string;
  organization: string;
  achievement_date: string | null;
  description: string | null;
  proof_url: string | null;
  image_url: string | null;
  display_order: number;
  is_published: boolean;
};

export default function AchievementsAdminPage() {
  const supabase = createClient();

  const [achievements, setAchievements] = useState<
    Achievement[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(
    null
  );

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] =
    useState<Achievement | null>(null);

  const [achievementToDelete, setAchievementToDelete] =
    useState<Achievement | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [achievementDate, setAchievementDate] =
    useState("");
  const [description, setDescription] = useState("");
  const [proofUrl, setProofUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  async function loadAchievements() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("achievements")
      .select("*")
      .order("display_order", {
        ascending: true,
      })
      .order("created_at", {
        ascending: false,
      });

    if (fetchError) {
      console.error("ACHIEVEMENTS LOAD ERROR:", {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
      });

      setError(
        fetchError.message ||
          "Unable to load achievements."
      );

      setAchievements([]);
      setLoading(false);
      return;
    }

    setAchievements(
      (data as Achievement[]) || []
    );

    setLoading(false);
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  function resetForm() {
    setTitle("");
    setOrganization("");
    setAchievementDate("");
    setDescription("");
    setProofUrl("");
    setImageUrl("");
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

  function editAchievement(
    achievement: Achievement
  ) {
    setEditing(achievement);

    setTitle(achievement.title);
    setOrganization(
      achievement.organization
    );

    setAchievementDate(
      achievement.achievement_date || ""
    );

    setDescription(
      achievement.description || ""
    );

    setProofUrl(
      achievement.proof_url || ""
    );

    setImageUrl(
      achievement.image_url || ""
    );

    setDisplayOrder(
      achievement.display_order ?? 0
    );

    setIsPublished(
      achievement.is_published
    );

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  async function saveAchievement() {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Achievement title is required.");
      return;
    }

    if (!organization.trim()) {
      setError("Organization is required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: title.trim(),
      organization: organization.trim(),
      achievement_date:
        achievementDate || null,
      description:
        description.trim() || null,
      proof_url:
        proofUrl.trim() || null,
      image_url:
        imageUrl.trim() || null,
      display_order:
        Number(displayOrder) || 0,
      is_published: isPublished,
    };

    try {
      if (editing) {
        const { error: updateError } =
          await supabase
            .from("achievements")
            .update(payload)
            .eq("id", editing.id);

        if (updateError) {
          console.error(
            "ACHIEVEMENT UPDATE ERROR:",
            {
              code: updateError.code,
              message: updateError.message,
              details: updateError.details,
              hint: updateError.hint,
            }
          );

          setError(
            updateError.message ||
              "Unable to update achievement."
          );

          setSaving(false);
          return;
        }

        setSuccess(
          "Achievement updated successfully."
        );
      } else {
        const { error: insertError } =
          await supabase
            .from("achievements")
            .insert(payload);

        if (insertError) {
          console.error(
            "ACHIEVEMENT INSERT ERROR:",
            {
              code: insertError.code,
              message: insertError.message,
              details: insertError.details,
              hint: insertError.hint,
            }
          );

          setError(
            insertError.message ||
              "Unable to save achievement."
          );

          setSaving(false);
          return;
        }

        setSuccess(
          "Achievement created successfully."
        );
      }

      await loadAchievements();

      setSaving(false);

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (err) {
      console.error(
        "ACHIEVEMENT SAVE EXCEPTION:",
        err
      );

      setError(
        "Something went wrong while saving the achievement."
      );

      setSaving(false);
    }
  }

  async function deleteAchievement(id: string) {
    setDeleting(id);
    setError("");
    setSuccess("");

    const { error: deleteError } =
      await supabase
        .from("achievements")
        .delete()
        .eq("id", id);

    if (deleteError) {
      console.error(
        "ACHIEVEMENT DELETE ERROR:",
        {
          code: deleteError.code,
          message: deleteError.message,
          details: deleteError.details,
          hint: deleteError.hint,
        }
      );

      setError(
        deleteError.message ||
          "Unable to delete achievement."
      );

      setDeleting(null);
      return;
    }

    setAchievements((current) =>
      current.filter(
        (achievement) =>
          achievement.id !== id
      )
    );

    setAchievementToDelete(null);
    setDeleting(null);

    setSuccess(
      "Achievement deleted successfully."
    );
  }

  async function togglePublished(
    achievement: Achievement
  ) {
    setError("");
    setSuccess("");

    const newStatus =
      !achievement.is_published;

    const { error: updateError } =
      await supabase
        .from("achievements")
        .update({
          is_published: newStatus,
        })
        .eq("id", achievement.id);

    if (updateError) {
      console.error(
        "ACHIEVEMENT PUBLISH ERROR:",
        updateError
      );

      setError(
        updateError.message ||
          "Unable to update publication status."
      );

      return;
    }

    setAchievements((current) =>
      current.map((item) =>
        item.id === achievement.id
          ? {
              ...item,
              is_published: newStatus,
            }
          : item
      )
    );

    setSuccess(
      newStatus
        ? "Achievement published."
        : "Achievement unpublished."
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

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
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
            Achievements
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage awards, recognitions, competitions,
            and other achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add Achievement
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
                Recognition
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editing
                  ? "Edit Achievement"
                  : "Add Achievement"}
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
                Achievement title *
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="First Prize - Project Exhibition"
                className="input"
              />
            </div>

            {/* ORGANIZATION */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Organization *
              </label>

              <input
                value={organization}
                onChange={(e) =>
                  setOrganization(
                    e.target.value
                  )
                }
                placeholder="RNSIT"
                className="input"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Achievement date
              </label>

              <input
                type="date"
                value={achievementDate}
                onChange={(e) =>
                  setAchievementDate(
                    e.target.value
                  )
                }
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
                  setDisplayOrder(
                    Number(e.target.value)
                  )
                }
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
                placeholder="Describe the achievement..."
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* PROOF URL */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Proof URL
              </label>

              <input
                value={proofUrl}
                onChange={(e) =>
                  setProofUrl(
                    e.target.value
                  )
                }
                placeholder="https://..."
                className="input"
              />
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Image URL
              </label>

              <input
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(
                    e.target.value
                  )
                }
                placeholder="https://..."
                className="input"
              />
            </div>

            {/* PUBLISHED */}
            <div className="md:col-span-2">
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

          {/* ACTIONS */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveAchievement}
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
                  ? "Update Achievement"
                  : "Save Achievement"}
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

      {/* LIST */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-3 text-sm text-white/40">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading achievements...
          </div>
        </div>
      ) : achievements.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08]">
            <Plus
              size={22}
              className="text-white/25"
            />
          </div>

          <h3 className="mt-5 text-lg font-medium">
            No achievements yet
          </h3>

          <p className="mt-2 text-sm text-white/35">
            Add your first achievement.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black"
          >
            Add Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <article
              key={achievement.id}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.12]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-medium">
                      {achievement.title}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                        achievement.is_published
                          ? "bg-emerald-400/[0.08] text-emerald-300"
                          : "bg-white/[0.05] text-white/35"
                      }`}
                    >
                      {achievement.is_published ? (
                        <Eye size={11} />
                      ) : (
                        <EyeOff size={11} />
                      )}

                      {achievement.is_published
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>

                  <p className="mt-1 text-base text-white/50">
                    {achievement.organization}
                  </p>

                  <p className="mt-2 text-xs text-white/30">
                    {formatDate(
                      achievement.achievement_date
                    )}
                  </p>

                  {achievement.description && (
                    <p className="mt-4 max-w-4xl text-sm leading-6 text-white/40">
                      {achievement.description}
                    </p>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {achievement.proof_url && (
                    <a
                      href={achievement.proof_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/45 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <ExternalLink size={14} />
                      Proof
                    </a>
                  )}

                  {achievement.image_url && (
                    <a
                      href={achievement.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/45 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      Image
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      togglePublished(
                        achievement
                      )
                    }
                    className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                    title={
                      achievement.is_published
                        ? "Unpublish"
                        : "Publish"
                    }
                  >
                    {achievement.is_published ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editAchievement(
                        achievement
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
                      setAchievementToDelete(
                        achievement
                      )
                    }
                    disabled={
                      deleting === achievement.id
                    }
                    className="rounded-lg border border-red-400/10 p-2 text-red-400/60 transition hover:bg-red-400/[0.05] hover:text-red-400 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === achievement.id ? (
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
      {achievementToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0d0c] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Delete achievement?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white/70">
                "{achievementToDelete.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setAchievementToDelete(null)
                }
                disabled={deleting !== null}
                className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteAchievement(
                    achievementToDelete.id
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
                  : "Delete Achievement"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}