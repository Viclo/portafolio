"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useHasMounted } from "@/hooks/useHasMounted";

type Accent = "blue" | "violet" | "emerald" | "amber";

const accentMap: Record<Accent, {
  gradient: string;
  glow: string;
  badge: string;
  tag: string;
  dot: string;
  bar: string;
  icon: string;
  border: string;
  hoverBorder: string;
}> = {
  blue: {
    gradient: "from-blue-500/20 via-blue-400/10 to-sky-400/20",
    glow: "bg-blue-500/10",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",
    tag: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800/50",
    dot: "bg-blue-500",
    bar: "bg-blue-100 dark:bg-blue-900/50",
    icon: "text-blue-400 dark:text-blue-500",
    border: "border-slate-200 dark:border-slate-700/60",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600/50",
  },
  violet: {
    gradient: "from-violet-500/20 via-purple-400/10 to-indigo-400/20",
    glow: "bg-violet-500/10",
    badge: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700/50",
    tag: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/50",
    dot: "bg-violet-500",
    bar: "bg-violet-100 dark:bg-violet-900/50",
    icon: "text-violet-400 dark:text-violet-500",
    border: "border-slate-200 dark:border-slate-700/60",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-600/50",
  },
  emerald: {
    gradient: "from-emerald-500/20 via-green-400/10 to-teal-400/20",
    glow: "bg-emerald-500/10",
    badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50",
    tag: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
    bar: "bg-emerald-100 dark:bg-emerald-900/50",
    icon: "text-emerald-400 dark:text-emerald-500",
    border: "border-slate-200 dark:border-slate-700/60",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-600/50",
  },
  amber: {
    gradient: "from-amber-500/20 via-yellow-400/10 to-orange-400/20",
    glow: "bg-amber-500/10",
    badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50",
    tag: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800/50",
    dot: "bg-amber-500",
    bar: "bg-amber-100 dark:bg-amber-900/50",
    icon: "text-amber-400 dark:text-amber-500",
    border: "border-slate-200 dark:border-slate-700/60",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-600/50",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function BrowserCard({ project }: { project: (typeof projects)[number] }) {
  const colors = accentMap[project.accent];
  const hostname = new URL(project.url).hostname;

  return (
    <motion.a
      variants={fadeUp}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-2xl border ${colors.border} ${colors.hoverBorder} hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800/60`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {/* URL bar */}
        <div className={`flex-1 flex items-center gap-1.5 px-2.5 py-1 rounded-md ${colors.bar} text-xs text-slate-500 dark:text-slate-400 font-mono truncate`}>
          <Globe size={10} className="shrink-0" />
          <span className="truncate">{hostname}</span>
        </div>
        {/* External link icon — animates in on hover */}
        <ExternalLink
          size={13}
          className="shrink-0 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Preview area */}
      <div className={`relative h-44 bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            color: "rgb(148 163 184 / 0.5)",
          }}
        />
        {/* Glow circle */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className={`w-24 h-24 rounded-full ${colors.glow} blur-2xl`} />
        </div>
        {/* Globe icon + domain */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Globe size={36} className={`${colors.icon} opacity-60 group-hover:opacity-90 transition-all duration-300 group-hover:scale-110`} />
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 opacity-70">{hostname}</span>
        </div>
        {/* Hover overlay CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/10 dark:bg-slate-900/30 backdrop-blur-[1px]">
          <span className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-semibold rounded-xl shadow-md border border-slate-200 dark:border-slate-600">
            Visit Live Site
            <ExternalLink size={13} />
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{project.name}</h3>
          <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded-full border ${colors.badge}`}>
            {project.company}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`px-2.5 py-0.5 text-xs font-medium rounded-lg border ${colors.tag}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const hasMounted = useHasMounted();

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial={hasMounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Projects
            </span>
            <div className="h-px flex-1 max-w-12 bg-blue-600/30 dark:bg-blue-400/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
          >
            Live Products
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-slate-500 dark:text-slate-400 mb-12 max-w-xl"
          >
            Production applications I helped design, build, and ship at previous companies.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <BrowserCard key={project.url} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
