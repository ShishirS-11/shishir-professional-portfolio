"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
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

  const [items, setItems] =
    useState<Experience[]>([]);
  const [editing, setEditing] =
    useState<Experience | null>(null);
  const [showForm, setShowForm] =
    useState(false);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] =
    useState("");
  const [employmentType, setEmploymentType] =
    useState("");
  const [startDate, setStartDate] =
    useState("");
  const [endDate, setEndDate] =
    useState("");
  const [isCurrent, setIsCurrent] =
    useState(false);
  const [description, setDescription] =
    useState("");
  const [responsibilities, setResponsibilities] =
    useState("");
  const [technologies, setTechnologies] =
    useState("");
  const [companyUrl, setCompanyUrl] =
    useState("");
  const [displayOrder, setDisplayOrder] =
    useState("0");

  const [error, setError] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("display_order");

    if (error) {
      setError(error.message);
      return;
    }

    setItems((data as Experience[]) || []);
  }

  useEffect(() => {
    load();
  }, []);

  function reset() {
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
    setDisplayOrder("0");
    setEditing(null);
    setShowForm(false);
  }

  function edit(item: Experience) {
    setEditing(item);
    setCompany(item.company);
    setRole(item.role);
    setLocation(item.location || "");
    setEmploymentType(
      item.employment_type || ""
    );
    setStartDate(item.start_date || "");
    setEndDate(item.end_date || "");
    setIsCurrent(item.is_current);
    setDescription(item.description || "");
    setResponsibilities(
      (item.responsibilities || []).join("\n")
    );
    setTechnologies(
      (item.technologies || []).join(", ")
    );
    setCompanyUrl(item.company_url || "");
    setDisplayOrder(
      String(item.display_order)
    );
    setShowForm(true);
  }

  async function save() {
    setError("");

    if (!company.trim() || !role.trim()) {
      setError(
        "Company and role are required."
      );
      return;
    }

    const payload = {
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || null,
      employment_type:
        employmentType.trim() || null,
      start_date: startDate || null,
      end_date:
        isCurrent ? null : endDate || null,
      is_current: isCurrent,
      description:
        description.trim() || null,
      responsibilities:
        responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      technologies:
        technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      company_url:
        companyUrl.trim() || null,
      display_order:
        Number(displayOrder) || 0,
      is_published: true,
    };

    const result = editing
      ? await supabase
          .from("experience")
          .update(payload)
          .eq("id", editing.id)
      : await supabase
          .from("experience")
          .insert(payload);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    reset();
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this experience?"))
      return;

    const { error } = await supabase
      .from("experience")
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
              Experience
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
            Add Experience
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
                  ? "Edit Experience"
                  : "Add Experience"}
              </h2>

              <button onClick={reset}>
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                className="input"
                placeholder="Company"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Employment type"
                value={employmentType}
                onChange={(e) =>
                  setEmploymentType(
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />

              <input
                className="input"
                type="date"
                disabled={isCurrent}
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />

              <label className="flex items-center gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) =>
                    setIsCurrent(
                      e.target.checked
                    )
                  }
                />
                Currently working here
              </label>

              <input
                className="input"
                placeholder="Company URL"
                value={companyUrl}
                onChange={(e) =>
                  setCompanyUrl(e.target.value)
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

              <textarea
                className="input"
                rows={5}
                placeholder={"Responsibilities\nOne responsibility per line"}
                value={responsibilities}
                onChange={(e) =>
                  setResponsibilities(
                    e.target.value
                  )
                }
              />

              <textarea
                className="input"
                rows={5}
                placeholder="Technologies (comma separated)"
                value={technologies}
                onChange={(e) =>
                  setTechnologies(
                    e.target.value
                  )
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
            </div>

            <button
              onClick={save}
              className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-medium text-black"
            >
              {editing
                ? "Update Experience"
                : "Save Experience"}
            </button>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h3 className="text-lg font-medium">
                    {item.role}
                  </h3>

                  <p className="mt-1 text-sm text-emerald-400/60">
                    {item.company}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {item.location || "Location not specified"}
                  </p>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}