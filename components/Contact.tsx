"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const FIELD =
  "w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500 focus:outline-none dark:border-white/12 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-ink-500 dark:focus:border-brand-400";

const LABEL =
  "mb-2 block font-mono text-[11px] tracking-[0.2em] text-ink-500 uppercase dark:text-ink-400";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [handedOff, setHandedOff] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setHandedOff(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked — the address is visible on screen anyway */
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="05"
            label="Contact"
            title={
              <>
                Let&apos;s build something
                <br className="hidden sm:block" /> that holds up.
              </>
            }
            intro="Open to remote roles, contract work, and interesting collaborations. I usually reply within 24 hours."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ---- Form ---------------------------------------------------- */}
            <div className="lg:col-span-7">
              <RevealItem>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-ink-900/10 bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={LABEL}>
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Cooper"
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={LABEL}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className={LABEL}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the role, the product, or the problem you're solving."
                      className={`${FIELD} resize-y`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
                  >
                    <Send size={16} />
                    Compose email
                  </button>

                  {/* Honest about what the button actually does */}
                  <p aria-live="polite" className="mt-4 text-sm text-ink-500 dark:text-ink-400">
                    {handedOff ? (
                      <span className="inline-flex items-start gap-2 text-ink-700 dark:text-ink-200">
                        <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                        Your email app should have opened with the message ready to send. If it
                        didn&apos;t, copy the address below instead.
                      </span>
                    ) : (
                      "This opens your own email client with the message pre-filled — nothing is sent from this page."
                    )}
                  </p>
                </form>
              </RevealItem>
            </div>

            {/* ---- Direct channels ----------------------------------------- */}
            <div className="lg:col-span-5">
              <RevealItem>
                <p className="font-mono text-[11px] tracking-[0.24em] text-ink-400 uppercase dark:text-ink-500">
                  Or reach me directly
                </p>

                {/* Email + copy */}
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group flex flex-1 items-center gap-4 rounded-xl border border-ink-900/10 bg-white/70 p-4 transition-colors hover:border-brand-500/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/40"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300">
                      <Mail size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase dark:text-ink-500">
                        Email
                      </span>
                      <span className="block truncate text-sm font-semibold text-ink-900 dark:text-white">
                        {personalInfo.email}
                      </span>
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email address copied" : "Copy email address"}
                    className="grid h-[68px] w-12 shrink-0 place-items-center rounded-xl border border-ink-900/10 bg-white/70 text-ink-500 transition-colors hover:border-brand-500/40 hover:text-brand-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-ink-400 dark:hover:border-brand-400/40 dark:hover:text-brand-300"
                  >
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Social */}
                <div className="mt-3 space-y-3">
                  {[
                    {
                      href: personalInfo.linkedin,
                      label: "LinkedIn",
                      value: personalInfo.linkedinHandle,
                      Icon: LinkedinIcon,
                    },
                    {
                      href: personalInfo.github,
                      label: "GitHub",
                      value: personalInfo.githubHandle,
                      Icon: GithubIcon,
                    },
                  ].map(({ href, label, value, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-ink-900/10 bg-white/70 p-4 transition-colors hover:border-brand-500/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/40"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase dark:text-ink-500">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink-900 dark:text-white">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-ink-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>

                {/* Availability note */}
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Available
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    Currently open to remote opportunities. Based in {personalInfo.location} (
                    {personalInfo.timezone}) — comfortable overlapping with North American hours.
                  </p>
                </div>
              </RevealItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
