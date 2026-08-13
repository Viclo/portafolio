"use client";

import { skills } from "@/data/portfolio";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="relative section-anchor py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="04"
            label="Stack"
            title="Tools I reach for."
            intro="Grouped by where they sit in the system, not by how well I know them — everything listed here has run in production."
          />

          <div className="mt-16 border-t border-ink-900/10 dark:border-white/10">
            {groups.map(([category, items]) => (
              <RevealItem key={category}>
                <div className="grid gap-y-4 border-b border-ink-900/10 py-8 lg:grid-cols-12 lg:gap-x-10 dark:border-white/10">
                  <div className="lg:col-span-3">
                    <h3 className="font-mono text-xs tracking-[0.24em] text-ink-700 uppercase dark:text-ink-200">
                      {category}
                    </h3>
                    <p className="mt-1.5 font-mono text-[11px] text-ink-400 tabular-nums dark:text-ink-500">
                      {String(items.length).padStart(2, "0")} tools
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2 lg:col-span-9">
                    {items.map((tech) => (
                      <li key={tech}>
                        <span className="inline-block rounded-lg border border-ink-900/10 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-500/40 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-200 dark:hover:border-brand-400/40 dark:hover:bg-brand-400/10 dark:hover:text-brand-200">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
