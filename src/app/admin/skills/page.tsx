"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  is_visible: boolean;
};

type Skill = {
  id: string;
  name: string;
  category_id: string;
  description: string | null;
  technologies: string[];
  proficiency: number | null;
  display_order: number;
  is_published: boolean;
  skill_categories?: {
    name: string;
  };
};

export default function SkillsAdminPage() {
  const supabase = createClient();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] =
    useState(false);

  const [editing, setEditing] =
    useState<Skill | null>(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] =
    useState("");
  const [technologies, setTechnologies] =
    useState("");
  const [proficiency, setProficiency] =
    useState("");
  const [displayOrder, setDisplayOrder] =
    useState("0");

  const [newCategory, setNewCategory] =
    useState("");
  const [newCategoryDescription, setNewCategoryDescription] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    const [skillsResult, categoriesResult] =
      await Promise.all([
        supabase
          .from("skills")
          .select("*, skill_categories(name)")
          .order("display_order"),
        supabase
          .from("skill_categories")
          .select("*")
          .order("display_order"),
      ]);

    if (skillsResult.error) {
      setError(skillsResult.error.message);
    }

    if (categoriesResult.error) {
      setError(categoriesResult.error.message);
    }

    setSkills(
      (skillsResult.data as Skill[]) || []
    );

    setCategories(
      (categoriesResult.data as Category[]) || []
    );

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setName("");
    setCategoryId("");
    setDescription("");
    setTechnologies("");
    setProficiency("");
    setDisplayOrder("0");
    setEditing(null);
    setShowForm(false);
  }

  function editSkill(skill: Skill) {
    setEditing(skill);
    setName(skill.name);
    setCategoryId(skill.category_id);
    setDescription(skill.description || "");
    setTechnologies(
      (skill.technologies || []).join(", ")
    );
    setProficiency(
      skill.proficiency?.toString() || ""
    );
    setDisplayOrder(
      skill.display_order.toString()
    );
    setShowForm(true);
  }

  async function createCategory() {
    if (!newCategory.trim()) {
      setError("Category name is required.");
      return;
    }

    const { data, error } = await supabase
      .from("skill_categories")
      .insert({
        name: newCategory.trim(),
        description:
          newCategoryDescription.trim() || null,
        display_order: categories.length,
        is_visible: true,
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    if (data) {
      setCategories((current) => [
        ...current,
        data as Category,
      ]);

      setCategoryId(data.id);
    }

    setNewCategory("");
    setNewCategoryDescription("");
    setShowCategoryForm(false);
  }

  async function saveSkill() {
    setError("");

    if (!name.trim()) {
      setError("Skill name is required.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    const payload = {
      name: name.trim(),
      category_id: categoryId,
      description:
        description.trim() || null,
      technologies: technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      proficiency:
        proficiency === ""
          ? null
          : Number(proficiency),
      display_order:
        Number(displayOrder) || 0,
      is_published: true,
    };

    const result = editing
      ? await supabase
          .from("skills")
          .update(payload)
          .eq("id", editing.id)
      : await supabase
          .from("skills")
          .insert(payload);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    resetForm();
    await loadData();
  }

  async function deleteSkill(id: string) {
    if (!confirm("Delete this skill?")) return;

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadData();
  }

  async function togglePublished(
    skill: Skill
  ) {
    const { error } = await supabase
      .from("skills")
      .update({
        is_published: !skill.is_published,
      })
      .eq("id", skill.id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadData();
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
              Skills
            </h1>

            <p className="mt-2 text-zinc-500">
              Manage skills and technical categories.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-black"
          >
            <Plus size={18} />
            Add Skill
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
                  ? "Edit Skill"
                  : "Add Skill"}
              </h2>

              <button onClick={resetForm}>
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                className="input"
                placeholder="Skill name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <div>
                <select
                  className="input"
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(e.target.value)
                  }
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() =>
                    setShowCategoryForm(
                      !showCategoryForm
                    )
                  }
                  className="mt-2 text-sm text-emerald-400 hover:text-emerald-300"
                >
                  + Create new category
                </button>
              </div>

              {showCategoryForm && (
                <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4 md:col-span-2">
                  <p className="mb-3 text-sm font-medium text-emerald-300">
                    New Category
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      className="input"
                      placeholder="Category name"
                      value={newCategory}
                      onChange={(e) =>
                        setNewCategory(
                          e.target.value
                        )
                      }
                    />

                    <input
                      className="input"
                      placeholder="Category description"
                      value={newCategoryDescription}
                      onChange={(e) =>
                        setNewCategoryDescription(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <button
                    type="button"
                    onClick={createCategory}
                    className="mt-3 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-medium text-black"
                  >
                    Create Category
                  </button>
                </div>
              )}

              <textarea
                className="input md:col-span-2"
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <input
                className="input"
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
                min="0"
                max="100"
                placeholder="Proficiency"
                value={proficiency}
                onChange={(e) =>
                  setProficiency(
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
              onClick={saveSkill}
              className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-medium text-black"
            >
              {editing
                ? "Update Skill"
                : "Save Skill"}
            </button>
          </div>
        )}

        <div className="space-y-3">
          {loading ? (
            <div className="p-10 text-center text-zinc-500">
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="rounded-2xl border border-white/10 p-10 text-center text-zinc-500">
              No skills found.
            </div>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium">
                        {skill.name}
                      </h3>

                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                        {skill.skill_categories?.name ||
                          "Uncategorized"}
                      </span>
                    </div>

                    {skill.description && (
                      <p className="mt-2 text-sm text-zinc-500">
                        {skill.description}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(skill.technologies || []).map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-500"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        togglePublished(skill)
                      }
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400 hover:text-emerald-300"
                    >
                      {skill.is_published
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() =>
                        editSkill(skill)
                      }
                      className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-emerald-300"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        deleteSkill(skill.id)
                      }
                      className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}