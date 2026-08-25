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

type Certification = {
  id: string;
  name: string;
  issuer: string;
  credential_id: string | null;
  credential_url: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  does_not_expire: boolean;
  image_url: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
};

export default function CertificationsAdminPage() {
  const supabase = createClient();

  const [certifications, setCertifications] = useState<
    Certification[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(
    null
  );

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] =
    useState<Certification | null>(null);
  const [certificationToDelete, setCertificationToDelete] =
    useState<Certification | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [doesNotExpire, setDoesNotExpire] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  async function loadCertifications() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("certifications")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("CERTIFICATIONS LOAD ERROR:", {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
      });

      setError(
        fetchError.message ||
          "Unable to load certifications."
      );

      setCertifications([]);
      setLoading(false);
      return;
    }

    setCertifications(
      (data as Certification[]) || []
    );

    setLoading(false);
  }

  useEffect(() => {
    loadCertifications();
  }, []);

  function resetForm() {
    setName("");
    setIssuer("");
    setCredentialId("");
    setCredentialUrl("");
    setIssueDate("");
    setExpiryDate("");
    setDoesNotExpire(true);
    setImageUrl("");
    setDescription("");
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

  function editCertification(
    certification: Certification
  ) {
    setEditing(certification);

    setName(certification.name);
    setIssuer(certification.issuer);
    setCredentialId(
      certification.credential_id || ""
    );
    setCredentialUrl(
      certification.credential_url || ""
    );

    setIssueDate(
      certification.issue_date || ""
    );

    setExpiryDate(
      certification.expiry_date || ""
    );

    setDoesNotExpire(
      certification.does_not_expire
    );

    setImageUrl(certification.image_url || "");

    setDescription(
      certification.description || ""
    );

    setDisplayOrder(
      certification.display_order ?? 0
    );

    setIsPublished(
      certification.is_published
    );

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  async function saveCertification() {
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Certification name is required.");
      return;
    }

    if (!issuer.trim()) {
      setError("Issuer is required.");
      return;
    }

    if (!doesNotExpire && !expiryDate) {
      setError(
        "Please provide an expiry date or select 'Does not expire'."
      );
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      issuer: issuer.trim(),
      credential_id:
        credentialId.trim() || null,
      credential_url:
        credentialUrl.trim() || null,
      issue_date: issueDate || null,
      expiry_date: doesNotExpire
        ? null
        : expiryDate || null,
      does_not_expire: doesNotExpire,
      image_url: imageUrl.trim() || null,
      description:
        description.trim() || null,
      display_order: Number(displayOrder) || 0,
      is_published: isPublished,
    };

    try {
      if (editing) {
        const { error: updateError } =
          await supabase
            .from("certifications")
            .update(payload)
            .eq("id", editing.id);

        if (updateError) {
          console.error(
            "CERTIFICATION UPDATE ERROR:",
            {
              code: updateError.code,
              message: updateError.message,
              details: updateError.details,
              hint: updateError.hint,
            }
          );

          setError(
            updateError.message ||
              "Unable to update certification."
          );

          setSaving(false);
          return;
        }

        setSuccess(
          "Certification updated successfully."
        );
      } else {
        const { error: insertError } =
          await supabase
            .from("certifications")
            .insert(payload);

        if (insertError) {
          console.error(
            "CERTIFICATION INSERT ERROR:",
            {
              code: insertError.code,
              message: insertError.message,
              details: insertError.details,
              hint: insertError.hint,
            }
          );

          setError(
            insertError.message ||
              "Unable to save certification."
          );

          setSaving(false);
          return;
        }

        setSuccess(
          "Certification created successfully."
        );
      }

      await loadCertifications();

      setSaving(false);

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (err) {
      console.error(
        "CERTIFICATION SAVE EXCEPTION:",
        err
      );

      setError(
        "Something went wrong while saving the certification."
      );

      setSaving(false);
    }
  }

  async function deleteCertification(id: string) {
    setDeleting(id);
    setError("");
    setSuccess("");

    const { error: deleteError } =
      await supabase
        .from("certifications")
        .delete()
        .eq("id", id);

    if (deleteError) {
      console.error(
        "CERTIFICATION DELETE ERROR:",
        {
          code: deleteError.code,
          message: deleteError.message,
          details: deleteError.details,
          hint: deleteError.hint,
        }
      );

      setError(
        deleteError.message ||
          "Unable to delete certification."
      );

      setDeleting(null);
      return;
    }

    setCertifications((current) =>
      current.filter(
        (certification) =>
          certification.id !== id
      )
    );

    setCertificationToDelete(null);
    setDeleting(null);

    setSuccess(
      "Certification deleted successfully."
    );
  }

  async function togglePublished(
    certification: Certification
  ) {
    setError("");
    setSuccess("");

    const newStatus =
      !certification.is_published;

    const { error: updateError } =
      await supabase
        .from("certifications")
        .update({
          is_published: newStatus,
        })
        .eq("id", certification.id);

    if (updateError) {
      console.error(
        "CERTIFICATION PUBLISH ERROR:",
        updateError
      );

      setError(
        updateError.message ||
          "Unable to update publication status."
      );

      return;
    }

    setCertifications((current) =>
      current.map((item) =>
        item.id === certification.id
          ? {
              ...item,
              is_published: newStatus,
            }
          : item
      )
    );

    setSuccess(
      newStatus
        ? "Certification published."
        : "Certification unpublished."
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
      day: "2-digit",
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
            Certifications
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage your professional certifications and
            credentials.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add Certification
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
          <strong className="font-medium">
            Error:
          </strong>{" "}
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
                Credentials
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editing
                  ? "Edit Certification"
                  : "Add Certification"}
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
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Certification name *
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="AWS Certified Cloud Practitioner"
                className="input"
              />
            </div>

            {/* Issuer */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Issuer *
              </label>

              <input
                value={issuer}
                onChange={(e) =>
                  setIssuer(e.target.value)
                }
                placeholder="Amazon Web Services"
                className="input"
              />
            </div>

            {/* Credential ID */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Credential ID
              </label>

              <input
                value={credentialId}
                onChange={(e) =>
                  setCredentialId(
                    e.target.value
                  )
                }
                placeholder="ABC123XYZ"
                className="input"
              />
            </div>

            {/* Credential URL */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Credential URL
              </label>

              <input
                value={credentialUrl}
                onChange={(e) =>
                  setCredentialUrl(
                    e.target.value
                  )
                }
                placeholder="https://..."
                className="input"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Issue date
              </label>

              <input
                type="date"
                value={issueDate}
                onChange={(e) =>
                  setIssueDate(
                    e.target.value
                  )
                }
                className="input"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Expiry date
              </label>

              <input
                type="date"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(
                    e.target.value
                  )
                }
                disabled={doesNotExpire}
                className="input disabled:cursor-not-allowed disabled:opacity-40"
              />
            </div>

            {/* Does not expire */}
            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={doesNotExpire}
                  onChange={(e) => {
                    setDoesNotExpire(
                      e.target.checked
                    );

                    if (e.target.checked) {
                      setExpiryDate("");
                    }
                  }}
                  className="h-4 w-4 accent-emerald-400"
                />

                This certification does not expire
              </label>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
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

            {/* Description */}
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
                placeholder="Brief description of the certification..."
                rows={4}
                className="input resize-y"
              />
            </div>

            {/* Display Order */}
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

            {/* Published */}
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

          {/* Form Actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveCertification}
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
                  ? "Update Certification"
                  : "Save Certification"}
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
            Loading certifications...
          </div>
        </div>
      ) : certifications.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08]">
            <Plus
              size={22}
              className="text-white/25"
            />
          </div>

          <h3 className="mt-5 text-lg font-medium">
            No certifications yet
          </h3>

          <p className="mt-2 text-sm text-white/35">
            Add your first certification to your
            portfolio.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black"
          >
            Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map(
            (certification) => (
              <article
                key={certification.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.12]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium">
                        {certification.name}
                      </h3>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                          certification.is_published
                            ? "bg-emerald-400/[0.08] text-emerald-300"
                            : "bg-white/[0.05] text-white/35"
                        }`}
                      >
                        {certification.is_published ? (
                          <Eye size={11} />
                        ) : (
                          <EyeOff size={11} />
                        )}

                        {certification.is_published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-white/40">
                      {certification.issuer}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/30">
                      <span>
                        Issued:{" "}
                        {formatDate(
                          certification.issue_date
                        )}
                      </span>

                      <span>
                        {certification.does_not_expire
                          ? "Does not expire"
                          : `Expires: ${formatDate(
                              certification.expiry_date
                            )}`}
                      </span>

                      {certification.credential_id && (
                        <span>
                          ID:{" "}
                          {
                            certification.credential_id
                          }
                        </span>
                      )}
                    </div>

                    {certification.description && (
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/35">
                        {certification.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {certification.credential_url && (
                      <a
                        href={
                          certification.credential_url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/45 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <ExternalLink size={14} />
                        Credential
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        togglePublished(
                          certification
                        )
                      }
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 transition hover:bg-white/[0.04] hover:text-white"
                      title={
                        certification.is_published
                          ? "Unpublish"
                          : "Publish"
                      }
                    >
                      {certification.is_published ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editCertification(
                          certification
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
                        setCertificationToDelete(
                          certification
                        )
                      }
                      disabled={
                        deleting ===
                        certification.id
                      }
                      className="rounded-lg border border-red-400/10 p-2 text-red-400/60 transition hover:bg-red-400/[0.05] hover:text-red-400 disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting ===
                      certification.id ? (
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
            )
          )}
        </div>
      )}

      {/* Delete Modal */}
      {certificationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0d0c] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Delete certification?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white/70">
                "{certificationToDelete.name}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setCertificationToDelete(
                    null
                  )
                }
                disabled={deleting !== null}
                className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteCertification(
                    certificationToDelete.id
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
                  : "Delete Certification"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}