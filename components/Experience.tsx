"use client";

import { MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-y border-ink-900/8 bg-ink-50/60 py-28 sm:py-36 dark:border-white/8 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="02"
            label="Experience"
            title="Four years, four teams, one throughline."
            intro="Every role has meant owning a system end to end — not just the feature in front of me."
          />

          <div className="mt-16">
            {experience.map((job, i) => (
              <RevealItem key={job.company}>
                <Job job={job} isLast={i === experience.length - 1} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Job({ job, isLast }: { job: (typeof experience)[number]; isLast: boolean }) {
  return (
    <article className="grid gap-y-4 lg:grid-cols-12 lg:gap-x-10">
      {/* ---- Period rail (left column on desktop) --------------------------- */}
      <div className="lg:col-span-3 lg:pt-1">
        <p className="font-mono text-sm text-ink-700 tabular-nums dark:text-ink-200">{job.period}</p>
        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-ink-500 dark:text-ink-400">
          <MapPin size={13} className="mt-px shrink-0" />
          {job.location}
        </p>
      </div>

      {/* ---- Body ---------------------------------------------------------- */}
      <div
        className={`relative border-l border-ink-900/12 pl-7 sm:pl-9 lg:col-span-9 dark:border-white/12 ${
          isLast ? "pb-0" : "pb-14 sm:pb-16"
        }`}
      >
        {/* Timeline node */}
        <span
          aria-hidden
          className={`absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full ${
            job.current
              ? "bg-brand-500 ring-4 ring-brand-500/20 dark:bg-brand-400 dark:ring-brand-400/20"
              : "bg-ink-300 dark:bg-ink-600"
          }`}
        />

        <div
          className={
            job.current
              ? "rounded-2xl border border-brand-500/20 bg-white p-6 shadow-sm shadow-brand-500/5 sm:p-7 dark:border-brand-400/20 dark:bg-white/[0.04]"
              : ""
          }
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3
              className={`font-display font-semibold tracking-tight text-ink-900 dark:text-white ${
                job.current ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              }`}
            >
              {job.role}
            </h3>
            {job.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-brand-700 uppercase dark:bg-brand-400/15 dark:text-brand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                Current
              </span>
            )}
          </div>

          <p className="mt-1.5 font-medium text-brand-600 dark:text-brand-300">{job.company}</p>

          <p className="mt-4 leading-relaxed text-ink-600 text-pretty dark:text-ink-300">
            {job.summary}
          </p>

          <ul className="mt-5 space-y-3">
            {job.achievements.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300"
              >
                <span
                  aria-hidden
                  className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand-500/60 dark:bg-brand-400/60"
                />
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
            {job.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-ink-900/10 bg-white px-2 py-1 font-mono text-[11px] text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
