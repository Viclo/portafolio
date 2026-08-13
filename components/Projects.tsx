"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectAccent } from "@/data/portfolio";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

/* The band is dark in both themes, so accents are tuned for a dark surface only.
   All four sit adjacent to the brand blue — differentiation without a rainbow. */
const accents: Record<ProjectAccent, { text: string; rule: string; glow: string }> = {
  blue: { text: "text-brand-300", rule: "bg-brand-400", glow: "bg-brand-500/25" },
  indigo: { text: "text-indigo-300", rule: "bg-indigo-400", glow: "bg-indigo-500/25" },
  violet: { text: "text-violet-300", rule: "bg-violet-400", glow: "bg-violet-500/25" },
  cyan: { text: "text-cyan-300", rule: "bg-cyan-400", glow: "bg-cyan-500/25" },
};

export default function Projects() {
  return (
    /* Always dark, in both themes — this band is the page's chapter break. The
       hairlines keep it delineated once the page around it is dark too. */
    <section
      id="projects"
      className="relative isolate section-anchor overflow-hidden border-y border-white/8 bg-ink-950 py-28 text-ink-300 sm:py-36"
    >
      <div
        aria-hidden
        className="grid-lines-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-600/20 blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="03"
            label="Selected work"
            tone="dark"
            title="Four products, live in production."
            intro="Platforms I designed, built, and shipped — each one is running today with real customers on it."
          />

          <div className="mt-16 border-t border-white/10">
            {projects.map((project, i) => (
              <RevealItem key={project.url}>
                <ProjectRow project={project} index={i + 1} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const accent = accents[project.accent];
  const hostname = new URL(project.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border-b border-white/10 py-10 transition-colors sm:py-14"
    >
      {/* Accent wash on hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -inset-x-6 inset-y-0 -z-10 rounded-3xl ${accent.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* ---- Identity ---------------------------------------------------- */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className={`font-mono text-xs tabular-nums ${accent.text}`}>
              {String(index).padStart(2, "0")}
            </span>
            <span aria-hidden className={`h-px w-8 ${accent.rule} opacity-60`} />
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink-400 uppercase">
              {project.kind}
            </span>
          </div>

          <h3 className="mt-5 font-display text-heading text-white transition-colors duration-300 group-hover:text-brand-200">
            {project.name}
          </h3>

          <p className="mt-2 text-sm text-ink-400">{project.company}</p>

          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-ink-300 transition-colors group-hover:text-white">
            {hostname}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>

        {/* ---- Detail ------------------------------------------------------ */}
        <div className="lg:col-span-8">
          <p className="text-lg leading-relaxed text-ink-200 text-pretty">{project.summary}</p>

          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-400">
                <span aria-hidden className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accent.rule}`} />
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-ink-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </a>
  );
}
