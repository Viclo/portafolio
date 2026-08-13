"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowUpRight, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Stack", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: highlight whichever section owns the upper third of the viewport */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    /* Track intersection state for every section, not just the ones in this
       batch of entries — otherwise a section that leaves while another is
       already inside the band never hands over, and the nav lags behind. */
    const intersecting = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => intersecting.set(e.target.id, e.isIntersecting));
        const current = navLinks.find((l) => intersecting.get(l.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll while the mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-ink-900/8 bg-paper/80 backdrop-blur-xl dark:border-white/8 dark:bg-ink-950/80"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Brand mark */}
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 font-display text-sm font-bold text-white transition-transform duration-300 group-hover:-rotate-6">
              IM
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink-900 sm:block dark:text-white">
              Ivan Martinez | Full Stack Developer
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-ink-900 dark:text-white"
                        : "text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={
                          reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                        }
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500 dark:bg-brand-400"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/8 dark:hover:text-white"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a
              href="#contact"
              className="ml-1 hidden items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500 sm:inline-flex dark:bg-white dark:text-ink-900 dark:hover:bg-brand-400 dark:hover:text-white"
            >
              Let&apos;s talk
              <ArrowUpRight size={15} />
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 transition-colors hover:bg-ink-900/5 md:hidden dark:text-ink-300 dark:hover:bg-white/8"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="fixed inset-0 z-60 bg-paper md:hidden dark:bg-ink-950"
          >
            <div className="flex h-18 items-center justify-between px-5">
              <span className="font-display text-[15px] font-semibold text-ink-900 dark:text-white">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-ink-900/5 dark:text-ink-300 dark:hover:bg-white/8"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-5 pt-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.06 + i * 0.05, duration: 0.35 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-ink-900/8 py-4 dark:border-white/8"
                    >
                      <span className="font-mono text-xs text-brand-500 dark:text-brand-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3.5 font-semibold text-white"
                >
                  Let&apos;s talk
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={personalInfo.cv}
                  download
                  className="flex items-center justify-center gap-2 rounded-full border border-ink-900/12 px-5 py-3.5 font-semibold text-ink-800 dark:border-white/15 dark:text-ink-100"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
