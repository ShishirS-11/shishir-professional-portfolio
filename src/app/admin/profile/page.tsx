"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
};

export default function ProfilePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Profile error:", error);
    }

    if (data) {
      setProfile(data);
    } else {
      setProfile({
        id: user.id,
        email: user.email ?? null,
        full_name: null,
        role: "admin",
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-white/40">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-400/60">
          Account
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
          Profile
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-white/40">
          Manage the administrator profile connected to your
          portfolio dashboard.
        </p>
      </div>

      {/* Profile card */}
      <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.015]">
        <div className="border-b border-white/[0.07] p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-xl font-semibold text-emerald-400">
              {(profile?.full_name || "S")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-medium">
                {profile?.full_name || "Shishir Shetty"}
              </h2>

              <p className="mt-1 text-sm text-white/40">
                {profile?.email || "No email available"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">
          {/* Full name */}
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/35">
              Full name
            </label>

            <div className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white/70">
              {profile?.full_name || "Not set"}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/35">
              Email
            </label>

            <div className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white/70">
              {profile?.email || "Not available"}
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/35">
              Role
            </label>

            <div className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm capitalize text-emerald-300">
              {profile?.role || "admin"}
            </div>
          </div>

          {/* User ID */}
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/35">
              User ID
            </label>

            <div className="truncate rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white/35">
              {profile?.id || "Unavailable"}
            </div>
          </div>
        </div>
      </div>

      {/* Account information */}
      <div className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.015] p-8">
        <h2 className="text-lg font-medium">
          Account information
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/35">
          Your authentication is managed through Supabase
          Authentication. Portfolio content such as projects,
          skills, certifications and experience is managed
          separately through the sections in the sidebar.
        </p>
      </div>
    </div>
  );
}