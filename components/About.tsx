"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-800/40">
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
              About
            </span>
            <div className="h-px flex-1 max-w-12 bg-blue-600/30 dark:bg-blue-400/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-10"
          >
            Who I Am
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <motion.div variants={fadeUp} className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                I&apos;m a <strong className="text-slate-800 dark:text-slate-100">Full Stack Developer & Tech Lead</strong> based
                in Cochabamba, Bolivia, with 4+ years of experience building production-grade SaaS platforms
                for companies in the US, Canada, and beyond — fully remote.
              </p>
              <p>
                My core stack is <strong className="text-slate-800 dark:text-slate-100">React, Next.js, NestJS, and PostgreSQL</strong>,
                but I&apos;m comfortable owning the full stack — from database schema design and backend architecture
                to frontend UX and cloud infrastructure.
              </p>
              <p>
                I&apos;ve worked on multi-tenant platforms, real-time systems, complex billing engines, and
                cross-border products serving US & Canadian markets. I take pride in writing clean, maintainable
                code and in delivering systems that scale.
              </p>
              <p>
                Native Spanish speaker with professional English proficiency, used daily in remote teams.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 text-center hover:border-blue-300 dark:hover:border-blue-600/60 transition-colors"
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
