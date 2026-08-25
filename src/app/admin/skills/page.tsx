"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
  Loader2,
  Eye,
  EyeOff,
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
  category_id: string | null;
  description: string | null;
  technologies: string[];
  proficiency: number;
  display_order: number;
  is_published: boolean;
  skill_categories?: {
    name: string;
  } | null;
};

export default function SkillsAdminPage() {
  const supabase = createClient();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] =
    useState(false);

  const [editingSkill, setEditingSkill] =
    useState<Skill | null>(null);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [skillToDelete, setSkillToDelete] =
    useState<Skill | null>(null);

  const [categoryToDelete, setCategoryToDelete] =
    useState<Category | null>(null);

  // Skill form
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] =
    useState("");
  const [skillDescription, setSkillDescription] =
    useState("");
  const [skillTechnologies, setSkillTechnologies] =
    useState("");
  const [skillProficiency, setSkillProficiency] =
    useState(80);
  const [skillOrder, setSkillOrder] = useState(0);
  const [skillPublished, setSkillPublished] =
    useState(true);

  // Category form
  const [categoryName, setCategoryName] =
    useState("");
  const [categoryDescription, setCategoryDescription] =
    useState("");
  const [categoryOrder, setCategoryOrder] =
    useState(0);
  const [categoryVisible, setCategoryVisible] =
    useState(true);

  async function loadData() {
    setLoading(true);
    setError("");

    const [
      { data: skillsData, error: skillsError },
      {
        data: categoriesData,
        error: categoriesError,
      },
    ] = await Promise.all([
      supabase
        .from("skills")
        .select(
          `
          *,
          skill_categories (
            name
          )
        `
        )
        .order("display_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("skill_categories")
        .select("*")
        .order("display_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        }),
    ]);

    if (skillsError) {
      console.error("SKILLS LOAD ERROR:", {
        code: skillsError.code,
        message: skillsError.message,
        details: skillsError.details,
        hint: skillsError.hint,
      });

      setError(
        skillsError.message ||
          "Unable to load skills."
      );
    }

    if (categoriesError) {
      console.error(
        "SKILL CATEGORIES LOAD ERROR:",
        {
          code: categoriesError.code,
          message: categoriesError.message,
          details: categoriesError.details,
          hint: categoriesError.hint,
        }
      );

      setError(
        categoriesError.message ||
          "Unable to load skill categories."
      );
    }

    setSkills(
      (skillsData as Skill[]) || []
    );

    setCategories(
      (categoriesData as Category[]) || []
    );

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetSkillForm() {
    setSkillName("");
    setSkillCategory("");
    setSkillDescription("");
    setSkillTechnologies("");
    setSkillProficiency(80);
    setSkillOrder(0);
    setSkillPublished(true);

    setEditingSkill(null);
    setShowSkillForm(false);
  }

  function resetCategoryForm() {
    setCategoryName("");
    setCategoryDescription("");
    setCategoryOrder(0);
    setCategoryVisible(true);

    setEditingCategory(null);
    setShowCategoryForm(false);
  }

  function openAddSkill() {
    resetSkillForm();
    setShowSkillForm(true);
    setShowCategoryForm(false);
    setError("");
    setSuccess("");
  }

  function openAddCategory() {
    resetCategoryForm();
    setShowCategoryForm(true);
    setShowSkillForm(false);
    setError("");
    setSuccess("");
  }

  function editSkill(skill: Skill) {
    setEditingSkill(skill);

    setSkillName(skill.name);
    setSkillCategory(skill.category_id || "");
    setSkillDescription(
      skill.description || ""
    );

    setSkillTechnologies(
      Array.isArray(skill.technologies)
        ? skill.technologies.join(", ")
        : ""
    );

    setSkillProficiency(skill.proficiency ?? 80);
    setSkillOrder(skill.display_order ?? 0);
    setSkillPublished(skill.is_published);

    setShowSkillForm(true);
    setShowCategoryForm(false);

    setError("");
    setSuccess("");
  }

  function editCategory(category: Category) {
    setEditingCategory(category);

    setCategoryName(category.name);
    setCategoryDescription(
      category.description || ""
    );
    setCategoryOrder(
      category.display_order ?? 0
    );
    setCategoryVisible(category.is_visible);

    setShowCategoryForm(true);
    setShowSkillForm(false);

    setError("");
    setSuccess("");
  }

  async function saveSkill() {
    setError("");
    setSuccess("");

    if (!skillName.trim()) {
      setError("Skill name is required.");
      return;
    }

    setSaving(true);

    const technologyList = skillTechnologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      name: skillName.trim(),
      category_id:
        skillCategory || null,
      description:
        skillDescription.trim() || null,
      technologies: technologyList,
      proficiency: Math.min(
        100,
        Math.max(0, Number(skillProficiency) || 0)
      ),
      display_order:
        Number(skillOrder) || 0,
      is_published: skillPublished,
    };

    if (editingSkill) {
      const { error: updateError } =
        await supabase
          .from("skills")
          .update(payload)
          .eq("id", editingSkill.id);

      if (updateError) {
        console.error(
          "SKILL UPDATE ERROR:",
          updateError
        );

        setError(
          updateError.message ||
            "Unable to update skill."
        );

        setSaving(false);
        return;
      }

      setSuccess(
        "Skill updated successfully."
      );
    } else {
      const { error: insertError } =
        await supabase
          .from("skills")
          .insert(payload);

      if (insertError) {
        console.error(
          "SKILL INSERT ERROR:",
          insertError
        );

        setError(
          insertError.message ||
            "Unable to create skill."
        );

        setSaving(false);
        return;
      }

      setSuccess(
        "Skill created successfully."
      );
    }

    await loadData();

    setSaving(false);

    setTimeout(() => {
      resetSkillForm();
    }, 500);
  }

  async function saveCategory() {
    setError("");
    setSuccess("");

    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: categoryName.trim(),
      description:
        categoryDescription.trim() || null,
      display_order:
        Number(categoryOrder) || 0,
      is_visible: categoryVisible,
    };

    if (editingCategory) {
      const { error: updateError } =
        await supabase
          .from("skill_categories")
          .update(payload)
          .eq("id", editingCategory.id);

      if (updateError) {
        console.error(
          "CATEGORY UPDATE ERROR:",
          updateError
        );

        setError(
          updateError.message ||
            "Unable to update category."
        );

        setSaving(false);
        return;
      }

      setSuccess(
        "Skill category updated successfully."
      );
    } else {
      const { error: insertError } =
        await supabase
          .from("skill_categories")
          .insert(payload);

      if (insertError) {
        console.error(
          "CATEGORY INSERT ERROR:",
          insertError
        );

        setError(
          insertError.message ||
            "Unable to create category."
        );

        setSaving(false);
        return;
      }

      setSuccess(
        "Skill category created successfully."
      );
    }

    await loadData();

    setSaving(false);

    setTimeout(() => {
      resetCategoryForm();
    }, 500);
  }

  async function deleteSkill(id: string) {
    setDeleting(id);
    setError("");

    const { error: deleteError } =
      await supabase
        .from("skills")
        .delete()
        .eq("id", id);

    if (deleteError) {
      console.error(
        "SKILL DELETE ERROR:",
        deleteError
      );

      setError(
        deleteError.message ||
          "Unable to delete skill."
      );

      setDeleting(null);
      return;
    }

    setSkills((current) =>
      current.filter(
        (skill) => skill.id !== id
      )
    );

    setSkillToDelete(null);
    setDeleting(null);
    setSuccess("Skill deleted successfully.");
  }

  async function deleteCategory(id: string) {
    setDeleting(id);
    setError("");

    const { error: deleteError } =
      await supabase
        .from("skill_categories")
        .delete()
        .eq("id", id);

    if (deleteError) {
      console.error(
        "CATEGORY DELETE ERROR:",
        deleteError
      );

      setError(
        deleteError.message ||
          "Unable to delete category."
      );

      setDeleting(null);
      return;
    }

    setCategories((current) =>
      current.filter(
        (category) => category.id !== id
      )
    );

    setCategoryToDelete(null);
    setDeleting(null);
    setSuccess(
      "Skill category deleted successfully."
    );

    await loadData();
  }

  async function toggleSkill(skill: Skill) {
    const newStatus = !skill.is_published;

    const { error: updateError } =
      await supabase
        .from("skills")
        .update({
          is_published: newStatus,
        })
        .eq("id", skill.id);

    if (updateError) {
      setError(
        updateError.message ||
          "Unable to update skill."
      );
      return;
    }

    setSkills((current) =>
      current.map((item) =>
        item.id === skill.id
          ? {
              ...item,
              is_published: newStatus,
            }
          : item
      )
    );
  }

  async function toggleCategory(
    category: Category
  ) {
    const newStatus = !category.is_visible;

    const { error: updateError } =
      await supabase
        .from("skill_categories")
        .update({
          is_visible: newStatus,
        })
        .eq("id", category.id);

    if (updateError) {
      setError(
        updateError.message ||
          "Unable to update category."
      );
      return;
    }

    setCategories((current) =>
      current.map((item) =>
        item.id === category.id
          ? {
              ...item,
              is_visible: newStatus,
            }
          : item
      )
    );
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
            Skills
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage your technical skills and
            skill categories.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openAddCategory}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
          >
            <Plus size={17} />
            Add Category
          </button>

          <button
            type="button"
            onClick={openAddSkill}
            className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
          >
            <Plus size={17} />
            Add Skill
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {/* Skill Form */}
      {showSkillForm && (
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/50">
                Skills
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editingSkill
                  ? "Edit Skill"
                  : "Add Skill"}
              </h2>
            </div>

            <button
              type="button"
              onClick={resetSkillForm}
              className="rounded-lg p-2 text-white/40 hover:bg-white/[0.05] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Skill name *
              </label>

              <input
                value={skillName}
                onChange={(e) =>
                  setSkillName(e.target.value)
                }
                placeholder="Python"
                className="input"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/40">
                Category
              </label>

              <select
                value={skillCategory}
                onChange={(e) =>
                  setSkillCategory(
                    e.target.value
                  )
                }
                className="input"
              >
                <option value="">
                  No category
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
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Description
              </label>

              <textarea
                value={skillDescription}
                onChange={(e) =>
                  setSkillDescription(
                    e.target.value
                  )
                }
                placeholder="Brief description of your skill"
                rows={3}
                className="input resize-y"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Technologies / Tools
              </label>

              <input
                value={skillTechnologies}
                onChange={(e) =>
                  setSkillTechnologies(
                    e.target.value
                  )
                }
                placeholder="Python, NumPy, Pandas"
                className="input"
              />

              <p className="mt-2 text-xs text-white/25">
                Separate values with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 flex justify-between text-xs text-white/40">
                <span>Proficiency</span>
                <span>
                  {skillProficiency}%
                </span>
              </label>

              <input
                type="range"
                min="0"
                max="100"
                value={skillProficiency}
                onChange={(e) =>
                  setSkillProficiency(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-emerald-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/40">
                Display order
              </label>

              <input
                type="number"
                min="0"
                value={skillOrder}
                onChange={(e) =>
                  setSkillOrder(
                    Number(e.target.value)
                  )
                }
                className="input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={skillPublished}
                  onChange={(e) =>
                    setSkillPublished(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-emerald-400"
                />

                <Eye size={16} />

                Show this skill on the
                public portfolio
              </label>
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={saveSkill}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-medium text-black hover:bg-emerald-300 disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : editingSkill
                  ? "Update Skill"
                  : "Save Skill"}
            </button>

            <button
              type="button"
              onClick={resetSkillForm}
              disabled={saving}
              className="rounded-xl border border-white/[0.08] px-6 py-3 text-sm text-white/50 hover:bg-white/[0.04]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category Form */}
      {showCategoryForm && (
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/50">
                Skill Categories
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h2>
            </div>

            <button
              type="button"
              onClick={resetCategoryForm}
              className="rounded-lg p-2 text-white/40 hover:bg-white/[0.05] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Category name *
              </label>

              <input
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(
                    e.target.value
                  )
                }
                placeholder="AI / Machine Learning"
                className="input"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/40">
                Display order
              </label>

              <input
                type="number"
                min="0"
                value={categoryOrder}
                onChange={(e) =>
                  setCategoryOrder(
                    Number(e.target.value)
                  )
                }
                className="input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs text-white/40">
                Description
              </label>

              <textarea
                value={categoryDescription}
                onChange={(e) =>
                  setCategoryDescription(
                    e.target.value
                  )
                }
                placeholder="Description of this skill category"
                rows={3}
                className="input resize-y"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
                <input
                  type="checkbox"
                  checked={categoryVisible}
                  onChange={(e) =>
                    setCategoryVisible(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-emerald-400"
                />

                <Eye size={16} />

                Show this category on the
                public portfolio
              </label>
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={saveCategory}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-medium text-black hover:bg-emerald-300 disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : editingCategory
                  ? "Update Category"
                  : "Save Category"}
            </button>

            <button
              type="button"
              onClick={resetCategoryForm}
              disabled={saving}
              className="rounded-xl border border-white/[0.08] px-6 py-3 text-sm text-white/50 hover:bg-white/[0.04]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Skill Categories
            </h2>

            <p className="mt-1 text-sm text-white/35">
              {categories.length} categories
            </p>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center text-sm text-white/30">
            No skill categories yet.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {categories.map((category) => (
              <article
                key={category.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">
                        {category.name}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] ${
                          category.is_visible
                            ? "bg-emerald-400/[0.08] text-emerald-300"
                            : "bg-white/[0.05] text-white/30"
                        }`}
                      >
                        {category.is_visible
                          ? "Visible"
                          : "Hidden"}
                      </span>
                    </div>

                    {category.description && (
                      <p className="mt-2 text-sm leading-6 text-white/35">
                        {category.description}
                      </p>
                    )}

                    <p className="mt-3 text-xs text-white/20">
                      Order:{" "}
                      {category.display_order}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        toggleCategory(
                          category
                        )
                      }
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 hover:bg-white/[0.04] hover:text-white"
                      title={
                        category.is_visible
                          ? "Hide"
                          : "Show"
                      }
                    >
                      {category.is_visible ? (
                        <Eye size={15} />
                      ) : (
                        <EyeOff size={15} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editCategory(
                          category
                        )
                      }
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 hover:bg-white/[0.04] hover:text-white"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCategoryToDelete(
                          category
                        )
                      }
                      className="rounded-lg border border-red-400/10 p-2 text-red-400/60 hover:bg-red-400/[0.05] hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Skills */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Skills
          </h2>

          <p className="mt-1 text-sm text-white/35">
            {skills.length} skills
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-white/[0.08]">
            <div className="flex items-center gap-3 text-sm text-white/40">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Loading skills...
            </div>
          </div>
        ) : skills.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
            <h3 className="text-lg font-medium">
              No skills yet
            </h3>

            <p className="mt-2 text-sm text-white/30">
              Add your first technical skill.
            </p>

            <button
              type="button"
              onClick={openAddSkill}
              className="mt-5 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black"
            >
              Add Skill
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {skills.map((skill) => (
              <article
                key={skill.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium">
                        {skill.name}
                      </h3>

                      {skill.skill_categories?.name && (
                        <span className="rounded-full bg-emerald-400/[0.06] px-2.5 py-1 text-[10px] text-emerald-300/70">
                          {
                            skill
                              .skill_categories
                              .name
                          }
                        </span>
                      )}

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] ${
                          skill.is_published
                            ? "bg-emerald-400/[0.08] text-emerald-300"
                            : "bg-white/[0.05] text-white/30"
                        }`}
                      >
                        {skill.is_published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    {skill.description && (
                      <p className="mt-2 text-sm text-white/35">
                        {skill.description}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {skill.technologies?.map(
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
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <div className="mr-3 text-right">
                      <p className="text-xs text-white/25">
                        Proficiency
                      </p>

                      <p className="mt-1 text-lg font-semibold text-emerald-300">
                        {skill.proficiency}%
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleSkill(skill)
                      }
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 hover:bg-white/[0.04] hover:text-white"
                      title={
                        skill.is_published
                          ? "Unpublish"
                          : "Publish"
                      }
                    >
                      {skill.is_published ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editSkill(skill)
                      }
                      className="rounded-lg border border-white/[0.08] p-2 text-white/40 hover:bg-white/[0.04] hover:text-white"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSkillToDelete(skill)
                      }
                      className="rounded-lg border border-red-400/10 p-2 text-red-400/60 hover:bg-red-400/[0.05] hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Delete Skill Modal */}
      {skillToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0d0c] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Delete skill?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Are you sure you want to delete{" "}
              <span className="text-white/70">
                "{skillToDelete.name}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setSkillToDelete(null)
                }
                disabled={deleting !== null}
                className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 hover:bg-white/[0.04]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteSkill(skillToDelete.id)
                }
                disabled={deleting !== null}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-50"
              >
                {deleting !== null && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {deleting !== null
                  ? "Deleting..."
                  : "Delete Skill"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0d0c] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Delete category?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Are you sure you want to delete{" "}
              <span className="text-white/70">
                "{categoryToDelete.name}"
              </span>
              ?
            </p>

            <p className="mt-2 text-xs text-amber-300/60">
              Skills using this category may be
              affected depending on your database
              relationship settings.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setCategoryToDelete(null)
                }
                disabled={deleting !== null}
                className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 hover:bg-white/[0.04]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteCategory(
                    categoryToDelete.id
                  )
                }
                disabled={deleting !== null}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-50"
              >
                {deleting !== null && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {deleting !== null
                  ? "Deleting..."
                  : "Delete Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}