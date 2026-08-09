"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="tech-grid border-t border-emerald-400/10 px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 text-sm uppercase tracking-[0.2em] text-emerald-400/50">
            Let&apos;s connect
          </p>

          <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Have an opportunity?
            <br />

            <span className="text-white/25">
              Let&apos;s talk.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/40 md:text-xl">
            I&apos;m interested in opportunities across software
            development, cloud, data, AI/ML and GenAI.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <a
            href="mailto:shishirshetty945@gmail.com"
            className="tech-card group rounded-3xl p-7 transition hover:bg-[#0c1511]"
          >
            <Mail
              size={21}
              className="text-emerald-300/60"
            />

            <p className="mt-10 text-sm text-emerald-400/40">
              Email
            </p>

            <p className="mt-2 break-all text-sm text-white/60">
              shishirshetty945@gmail.com
            </p>

            <ArrowUpRight
              size={17}
              className="mt-6 text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300"
            />
          </a>

          <a
            href="https://github.com/ShishirS-11"
            target="_blank"
            rel="noreferrer"
            className="tech-card group rounded-3xl p-7 transition hover:bg-[#0c1511]"
          >
            <FaGithub
              size={21}
              className="text-emerald-300/60"
            />

            <p className="mt-10 text-sm text-emerald-400/40">
              GitHub
            </p>

            <p className="mt-2 text-sm text-white/60">
              ShishirS-11
            </p>

            <ArrowUpRight
              size={17}
              className="mt-6 text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300"
            />
          </a>

          <a
            href="https://linkedin.com/in/shishirshetty2004"
            target="_blank"
            rel="noreferrer"
            className="tech-card group rounded-3xl p-7 transition hover:bg-[#0c1511]"
          >
            <FaLinkedin
              size={21}
              className="text-emerald-300/60"
            />

            <p className="mt-10 text-sm text-emerald-400/40">
              LinkedIn
            </p>

            <p className="mt-2 text-sm text-white/60">
              shishirshetty2004
            </p>

            <ArrowUpRight
              size={17}
              className="mt-6 text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300"
            />
          </a>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-white/25">
          <MapPin size={15} className="text-emerald-400/40" />
          Karnataka, India
        </div>
      </div>
    </section>
  );
}