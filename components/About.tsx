"use client";

import { GraduationCap, Languages as LanguagesIcon, MapPin, Briefcase } from "lucide-react";
import { education, languages, personalInfo } from "@/data/portfolio";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const focusAreas = [
  "Multi-tenant architecture",
  "Billing & payments",
  "Async pipelines & queues",
  "Cloud infrastructure",
  "Database performance",
];

export default function About() {
  return (
    <section id="about" className="relative section-anchor py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="01"
            label="About"
            title={
              <>
                I own the whole stack —
                <br className="hidden sm:block" /> schema to deploy.
              </>
            }
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---- Bio ---------------------------------------------------- */}
            <div className="lg:col-span-7">
              <RevealItem>
                <p className="text-xl leading-relaxed font-medium text-ink-800 text-pretty sm:text-2xl dark:text-ink-100">
                  I&apos;m a full stack developer in Cochabamba, Bolivia, working remotely with teams
                  in the US, Canada, and Mexico for the past four years.
                </p>
              </RevealItem>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600 text-pretty dark:text-ink-300">
                <RevealItem>
                  <p>
                    My core stack is{" "}
                    <strong className="font-semibold text-ink-900 dark:text-white">
                      React, Next.js, NestJS, and PostgreSQL
                    </strong>
                    , but the work I enjoy most sits behind the interface: designing schemas that
                    won&apos;t need rewriting, building billing engines that reconcile correctly, and
                    owning infrastructure end to end.
                  </p>
                </RevealItem>
                <RevealItem>
                  <p>
                    I&apos;ve shipped multi-tenant platforms, real-time systems, and cross-border
                    products for regulated markets. At my current role I was promoted to Tech Lead
                    after three months and now own the architecture of a compliance SaaS built from
                    scratch.
                  </p>
                </RevealItem>
              </div>

              {/* Focus areas */}
              <RevealItem>
                <div className="mt-10">
                  <p className="font-mono text-xs tracking-[0.24em] text-ink-400 uppercase dark:text-ink-500">
                    What I go deep on
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {focusAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-full border border-ink-900/10 px-3.5 py-1.5 text-sm font-medium text-ink-700 dark:border-white/12 dark:text-ink-200"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            </div>

            {/* ---- Profile card ------------------------------------------- */}
            <div className="lg:col-span-5">
              <RevealItem>
                <div className="lg:sticky lg:top-28">
                  <dl className="divide-y divide-ink-900/8 overflow-hidden rounded-2xl border border-ink-900/10 bg-white/70 backdrop-blur-sm dark:divide-white/8 dark:border-white/10 dark:bg-white/[0.03]">
                    <Row icon={<Briefcase size={15} />} label="Current role">
                      <span className="font-semibold text-ink-900 dark:text-white">
                        Tech Lead & Full Stack Developer
                      </span>
                      <span className="mt-0.5 block text-ink-500 dark:text-ink-400">
                        Redlizard Studioz Inc. · Canada
                      </span>
                    </Row>

                    <Row icon={<MapPin size={15} />} label="Based in">
                      <span className="font-semibold text-ink-900 dark:text-white">
                        {personalInfo.location}
                      </span>
                      <span className="mt-0.5 block text-ink-500 dark:text-ink-400">
                        {personalInfo.timezone} · remote since 2022
                      </span>
                    </Row>

                    <Row icon={<LanguagesIcon size={15} />} label="Languages">
                      <div className="space-y-1">
                        {languages.map((lang) => (
                          <div key={lang.name} className="flex items-baseline justify-between gap-3">
                            <span className="font-semibold text-ink-900 dark:text-white">
                              {lang.name}
                            </span>
                            <span className="font-mono text-xs text-ink-500 dark:text-ink-400">
                              {lang.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Row>

                    <Row icon={<GraduationCap size={15} />} label="Education" id="education">
                      <span className="font-semibold text-ink-900 dark:text-white">
                        {education.degree} · {education.field}
                      </span>
                      <span className="mt-0.5 block text-ink-500 dark:text-ink-400">
                        {education.institution}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-ink-400 dark:text-ink-500">
                        {education.period} · {education.location}
                      </span>
                    </Row>
                  </dl>
                </div>
              </RevealItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({
  icon,
  label,
  children,
  id,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="p-5 sm:p-6">
      <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink-400 uppercase dark:text-ink-500">
        <span className="text-brand-500 dark:text-brand-400">{icon}</span>
        {label}
      </dt>
      <dd className="mt-3 text-sm leading-relaxed">{children}</dd>
    </div>
  );
}
