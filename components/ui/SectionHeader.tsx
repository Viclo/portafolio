import type { ReactNode } from "react";
import { RevealItem } from "./Reveal";

/**
 * Every section opens the same way: a mono index chip, a rule that runs to the
 * edge, then the title. The index is what makes the page read as one document
 * rather than seven stacked templates.
 */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  tone = "light",
  align = "left",
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";

  return (
    <header className={align === "center" ? "text-center" : undefined}>
      <RevealItem>
        <div
          className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${
            dark ? "text-ink-400" : "text-ink-500 dark:text-ink-400"
          }`}
        >
          <span className="font-mono text-xs tabular-nums tracking-[0.2em]">{index}</span>
          <span
            className={`font-mono text-xs uppercase tracking-[0.28em] ${
              dark ? "text-gold-400" : "text-brand-600 dark:text-brand-300"
            }`}
          >
            {label}
          </span>
          <span
            aria-hidden
            className={`h-px flex-1 max-w-32 ${
              dark ? "bg-white/15" : "bg-ink-900/10 dark:bg-white/10"
            }`}
          />
        </div>
      </RevealItem>

      <RevealItem>
        <h2
          className={`mt-5 font-display text-title text-balance ${
            dark ? "text-white" : "text-ink-900 dark:text-white"
          }`}
        >
          {title}
        </h2>
      </RevealItem>

      {intro && (
        <RevealItem>
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed text-pretty ${
              align === "center" ? "mx-auto" : ""
            } ${dark ? "text-ink-300" : "text-ink-600 dark:text-ink-300"}`}
          >
            {intro}
          </p>
        </RevealItem>
      )}
    </header>
  );
}
