"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-reveal primitives. Every section builds its entrance from these two so
 * the page shares one motion signature instead of each component inventing its own.
 */

/** Wraps a block so its `RevealItem` children animate in on first scroll-in. */
export function Reveal({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } } }}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** A single revealing element. Must be rendered inside a `Reveal`. */
export function RevealItem({
  children,
  className,
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      variants={
        reduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: distance },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
            }
      }
    >
      {children}
    </motion.div>
  );
}
