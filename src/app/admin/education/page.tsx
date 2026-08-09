"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
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

  const [items, setItems] =
    useState<Education[]>([]);
  const [editing, setEditing] =
    useState<Education | null>(null);
  const [showForm, setShowForm] =
    useState(false);

  const [institution, setInstitution] =
    useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] =
    useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] =
    useState("0");

  const [error, setError] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("display_order");

    if (error) {
      setError(error.message);
      return;
    }

    setItems((data as Education[]) || []);
  }

  useEffect(() => {
    load();
  }, []);

  function reset() {
    setInstitution("");
    setDegree("");
    setField("");
    setStart("");
    setEnd("");
    setGrade("");
    setDescription("");
    setUrl("");
    setDisplayOrder("0");
    setEditing(null);
    setShowForm(false);
  }

  function edit(item: Education) {
    setEditing(item);
    setInstitution(item.institution);
    setDegree(item.degree);
    setField(item.field_of_study || "");
    setStart(item.start_date || "");
    setEnd(item.end_date || "");
    setGrade(item.grade || "");
    setDescription(item.description || "");
    setUrl(item.institution_url || "");
    setDisplayOrder(
      String(item.display_order)
    );
    setShowForm(true);
  }

  async function save() {
    setError("");

    if (!institution.trim() || !degree.trim()) {
      setError(
        "Institution and degree are required."
      );
      return;
    }

    const payload = {
      institution: institution.trim(),
      degree: degree.trim(),
      field_of_study:
        field.trim() || null,
      start_date: start || null,
      end_date: end || null,
      grade: grade.trim() || null,
      description:
        description.trim() || null,
      institution_url:
        url.trim() || null,
      display_order:
        Number(displayOrder) || 0,
      is_published: true,
    };

    const result = editing
      ? await supabase
          .from("education")
          .update(payload)
          .eq("id", editing.id)
      : await supabase
          .from("education")
          .insert(payload);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    reset();
    await load();
  }

  async function remove(id: string) {
    if (
      !confirm(
        "Delete this education entry?"
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("education")
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
              Education
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
            Add Education
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
                  ? "Edit Education"
                  : "Add Education"}
              </h2>

              <button onClick={reset}>
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                className="input"
                placeholder="Institution"
                value={institution}
                onChange={(e) =>
                  setInstitution(
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                placeholder="Degree"
                value={degree}
                onChange={(e) =>
                  setDegree(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Field of study"
                value={field}
                onChange={(e) =>
                  setField(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Grade / CGPA"
                value={grade}
                onChange={(e) =>
                  setGrade(e.target.value)
                }
              />

              <input
                className="input"
                type="date"
                value={start}
                onChange={(e) =>
                  setStart(e.target.value)
                }
              />

              <input
                className="input"
                type="date"
                value={end}
                onChange={(e) =>
                  setEnd(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Institution URL"
                value={url}
                onChange={(e) =>
                  setUrl(e.target.value)
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
                ? "Update Education"
                : "Save Education"}
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
                  {item.degree}
                </h3>

                <p className="mt-1 text-sm text-emerald-400/60">
                  {item.institution}
                </p>

                {item.field_of_study && (
                  <p className="mt-1 text-sm text-zinc-500">
                    {item.field_of_study}
                  </p>
                )}

                {item.grade && (
                  <p className="mt-2 text-xs text-zinc-600">
                    {item.grade}
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