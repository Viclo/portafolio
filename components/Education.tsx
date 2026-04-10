"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { education } from "@/data/portfolio";
import { useHasMounted } from "@/hooks/useHasMounted";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Education() {
  const hasMounted = useHasMounted();
  return (
    <section id="education" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={hasMounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Education
            </span>
            <div className="h-px flex-1 max-w-12 bg-blue-600/30 dark:bg-blue-400/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-10"
          >
            Academic Background
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="max-w-2xl bg-white dark:bg-slate-800/60 rounded-2xl p-8 border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-5">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl shrink-0">
                <GraduationCap size={28} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {education.institution}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {education.degree} · {education.field}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{education.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{education.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
