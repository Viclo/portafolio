import { ArrowUp, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-ink-400">
      <div
        aria-hidden
        className="grid-lines-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_top,black,transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a href="#top" className="group inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 font-display text-sm font-bold text-white transition-transform duration-300 group-hover:-rotate-6">
                IM
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                {personalInfo.name}
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {personalInfo.title}, building production SaaS remotely from {personalInfo.location}.
            </p>
          </div>

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
                className="grid h-10 w-10 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-white/8 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-500">
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-ink-500">Next.js · Tailwind · Framer Motion</p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-400 transition-colors hover:text-white"
            >
              Back to top
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
