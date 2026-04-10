"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  Frontend: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/40",
  Backend: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/40",
  Databases: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800/40",
  "DevOps & Cloud": "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-800/40",
  Integrations: "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-800/40",
};

const categoryHeaderColors: Record<string, string> = {
  Frontend: "text-violet-600 dark:text-violet-400",
  Backend: "text-emerald-600 dark:text-emerald-400",
  Databases: "text-amber-600 dark:text-amber-400",
  "DevOps & Cloud": "text-sky-600 dark:text-sky-400",
  Integrations: "text-pink-600 dark:text-pink-400",
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Skills
            </span>
            <div className="h-px flex-1 max-w-12 bg-blue-600/30 dark:bg-blue-400/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12"
          >
            Tech Stack
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div
                key={category}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md transition-all"
              >
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${categoryHeaderColors[category]}`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-medium rounded-lg border ${categoryColors[category]}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Languages card */}
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md transition-all"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-blue-600 dark:text-blue-400">
                Languages
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Spanish</span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    Native
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">English</span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    Professional
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
