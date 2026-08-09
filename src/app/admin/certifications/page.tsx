"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
  },
  {
    id: 2,
    title: "Microsoft Azure Data Fundamentals",
    issuer: "Microsoft",
    code: "DP-900",
  },
  {
    id: 3,
    title: "Vertex AI / Prompt Design",
    issuer: "Google",
    code: "Training",
  },
];

export default function CertificationsAdmin() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">
            Content
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Certifications
          </h1>

          <p className="mt-2 text-sm text-white/30">
            Manage your credentials and certifications.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#04100b] transition hover:bg-emerald-300">
          <Plus size={17} />
          Add certificate
        </button>
      </div>

      <div className="mt-10 space-y-3">
        {certifications.map((certificate) => (
          <div
            key={certificate.id}
            className="flex flex-col justify-between gap-5 rounded-2xl border border-emerald-400/10 bg-[#0a100d] p-6 md:flex-row md:items-center"
          >
            <div>
              <h2 className="font-medium text-white/75">
                {certificate.title}
              </h2>

              <p className="mt-2 text-sm text-white/30">
                {certificate.issuer}
              </p>

              <span className="mt-3 inline-block rounded-full bg-emerald-400/[0.05] px-3 py-1 text-xs text-emerald-300/50">
                {certificate.code}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="rounded-lg border border-white/10 p-2 text-white/30 hover:text-emerald-300">
                <Pencil size={15} />
              </button>

              <button className="rounded-lg border border-white/10 p-2 text-white/30 hover:text-red-300">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}