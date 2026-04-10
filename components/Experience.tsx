"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import { useHasMounted } from "@/hooks/useHasMounted";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Experience() {
  const hasMounted = useHasMounted();
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-900">
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
              Experience
            </span>
            <div className="h-px flex-1 max-w-12 bg-blue-600/30 dark:bg-blue-400/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12"
          >
            Work History
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-blue-200 dark:bg-blue-800/50" />

            <div className="space-y-10">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="relative pl-12 sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-2.5 sm:left-4 top-6 w-3 h-3 rounded-full border-2 ${
                      job.current
                        ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/40"
                        : "bg-white dark:bg-slate-900 border-blue-400 dark:border-blue-600"
                    }`}
                  />

                  {/* Card */}
                  <div className="bg-white dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md transition-all">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase size={15} className="text-blue-500 dark:text-blue-400" />
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {job.role}
                          </h3>
                          {job.current && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-sm text-slate-500 dark:text-slate-400 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          <span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-5">
                      {job.achievements.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
