"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  /* Entrance is time-based rather than scroll-based — it runs once, on load */
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* ---- Backdrop ---------------------------------------------------- */}
      <div
        aria-hidden
        className="grid-lines dark:grid-lines-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[38rem] w-[64rem] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[120px] dark:bg-brand-500/20"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-24 -z-10 h-96 w-96 rounded-full bg-gold-400/12 blur-[100px] dark:bg-gold-400/8"
      />

      <div className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Availability */}
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/10 bg-white/60 px-3.5 py-1.5 text-[13px] font-medium text-ink-700 backdrop-blur-sm dark:border-white/12 dark:bg-white/5 dark:text-ink-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {personalInfo.availability}
            </span>
          </motion.div>

          {/* Name — small, mono, acts as a kicker above the headline */}
          <motion.p
            {...rise(0.08)}
            className="mt-9 font-mono text-xs tracking-[0.32em] text-brand-600 uppercase dark:text-brand-300"
          >
            {personalInfo.name}
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...rise(0.14)}
            className="mt-5 font-display text-display text-ink-900 text-balance dark:text-white"
          >
            {personalInfo.headline.lead}{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              {/* Gold marker rides behind the word in both themes */}
              <span
                aria-hidden
                className="absolute inset-x-[-0.05em] bottom-[0.04em] -z-10 h-[0.15em] rounded-xs bg-gold-400"
              />
              {personalInfo.headline.accent}
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.22)}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-600 text-pretty sm:text-xl dark:text-ink-300"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30"
            >
              See what I&apos;ve shipped
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={personalInfo.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-white/50 px-6 py-3.5 font-semibold text-ink-800 backdrop-blur-sm transition-colors hover:border-ink-900/25 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-ink-100 dark:hover:border-white/30 dark:hover:bg-white/10"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Meta row */}
          <motion.div
            {...rise(0.38)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500 dark:text-ink-400"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-brand-500 dark:text-brand-400" />
              {personalInfo.location}
              <span className="font-mono text-xs text-ink-400 dark:text-ink-500">
                · {personalInfo.timezone}
              </span>
            </span>

            <span aria-hidden className="hidden h-4 w-px bg-ink-900/10 sm:block dark:bg-white/12" />

            <div className="flex items-center gap-1">
              {[
                { href: personalInfo.github, label: "GitHub", Icon: GithubIcon },
                { href: personalInfo.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: `mailto:${personalInfo.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-brand-600 dark:text-ink-400 dark:hover:bg-white/8 dark:hover:text-brand-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---- Stats band -------------------------------------------------- */}
        <motion.dl
          {...rise(0.48)}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/8 bg-ink-900/8 lg:grid-cols-4 dark:border-white/8 dark:bg-white/8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-paper px-5 py-6 transition-colors hover:bg-white sm:px-6 dark:bg-ink-950 dark:hover:bg-ink-900"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold tracking-tight text-ink-900 tabular-nums dark:text-white">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm font-semibold text-ink-800 dark:text-ink-100">
                  {stat.label}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-ink-400 dark:text-ink-500">
                  {stat.detail}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-400 transition-colors hover:text-brand-500 lg:block dark:text-ink-500"
      >
        <motion.span
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
