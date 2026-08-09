"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
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

  const [items, setItems] = useState<Certification[]>([]);
  const [editing, setEditing] =
    useState<Certification | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [credentialId, setCredentialId] =
    useState("");
  const [credentialUrl, setCredentialUrl] =
    useState("");
  const [issueDate, setIssueDate] =
    useState("");
  const [expiryDate, setExpiryDate] =
    useState("");
  const [doesNotExpire, setDoesNotExpire] =
    useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] =
    useState("");
  const [displayOrder, setDisplayOrder] =
    useState("0");

  const [error, setError] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("display_order");

    if (error) {
      setError(error.message);
      return;
    }

    setItems((data as Certification[]) || []);
  }

  useEffect(() => {
    load();
  }, []);

  function reset() {
    setName("");
    setIssuer("");
    setCredentialId("");
    setCredentialUrl("");
    setIssueDate("");
    setExpiryDate("");
    setDoesNotExpire(true);
    setImageUrl("");
    setDescription("");
    setDisplayOrder("0");
    setEditing(null);
    setShowForm(false);
  }

  function edit(item: Certification) {
    setEditing(item);
    setName(item.name);
    setIssuer(item.issuer);
    setCredentialId(item.credential_id || "");
    setCredentialUrl(item.credential_url || "");
    setIssueDate(item.issue_date || "");
    setExpiryDate(item.expiry_date || "");
    setDoesNotExpire(item.does_not_expire);
    setImageUrl(item.image_url || "");
    setDescription(item.description || "");
    setDisplayOrder(
      String(item.display_order)
    );
    setShowForm(true);
  }

  async function save() {
    setError("");

    if (!name.trim() || !issuer.trim()) {
      setError(
        "Certification name and issuer are required."
      );
      return;
    }

    const payload = {
      name: name.trim(),
      issuer: issuer.trim(),
      credential_id:
        credentialId.trim() || null,
      credential_url:
        credentialUrl.trim() || null,
      issue_date: issueDate || null,
      expiry_date:
        doesNotExpire ? null : expiryDate || null,
      does_not_expire: doesNotExpire,
      image_url: imageUrl.trim() || null,
      description:
        description.trim() || null,
      display_order:
        Number(displayOrder) || 0,
      is_published: true,
    };

    const result = editing
      ? await supabase
          .from("certifications")
          .update(payload)
          .eq("id", editing.id)
      : await supabase
          .from("certifications")
          .insert(payload);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    reset();
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this certification?"))
      return;

    const { error } = await supabase
      .from("certifications")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    await load();
  }

  return (
    <main className="min-h-screen p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
              Portfolio Content
            </p>

            <h1 className="mt-2 text-4xl font-semibold">
              Certifications
            </h1>
          </div>

          <button
            onClick={() => {
              reset();
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black"
          >
            <Plus size={18} />
            Add Certification
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <div className="mb-6 flex justify-between">
              <h2 className="text-xl font-semibold">
                {editing
                  ? "Edit Certification"
                  : "Add Certification"}
              </h2>

              <button onClick={reset}>
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                className="input"
                placeholder="Certification name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Issuer"
                value={issuer}
                onChange={(e) =>
                  setIssuer(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Credential ID"
                value={credentialId}
                onChange={(e) =>
                  setCredentialId(
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                placeholder="Credential URL"
                value={credentialUrl}
                onChange={(e) =>
                  setCredentialUrl(
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                type="date"
                value={issueDate}
                onChange={(e) =>
                  setIssueDate(e.target.value)
                }
              />

              <input
                className="input"
                type="date"
                value={expiryDate}
                disabled={doesNotExpire}
                onChange={(e) =>
                  setExpiryDate(
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(e.target.value)
                }
              />

              <input
                className="input"
                type="number"
                placeholder="Display order"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(
                    e.target.value
                  )
                }
              />

              <label className="flex items-center gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={doesNotExpire}
                  onChange={(e) =>
                    setDoesNotExpire(
                      e.target.checked
                    )
                  }
                />
                Does not expire
              </label>

              <textarea
                className="input md:col-span-2"
                rows={4}
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />
            </div>

            <button
              onClick={save}
              className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-medium text-black"
            >
              {editing
                ? "Update Certification"
                : "Save Certification"}
            </button>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:flex-row md:items-center"
            >
              <div>
                <h3 className="font-medium">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {item.issuer}
                </p>

                {item.credential_id && (
                  <p className="mt-2 text-xs text-emerald-400/60">
                    {item.credential_id}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => edit(item)}
                  className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-emerald-300"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() =>
                    remove(item.id)
                  }
                  className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}