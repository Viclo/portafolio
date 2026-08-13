"use client";

import { useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, Mail, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const FIELD =
  "w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500 focus:outline-none disabled:opacity-60 dark:border-white/12 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-ink-500 dark:focus:border-brand-400";

const LABEL =
  "mb-2 block font-mono text-[11px] tracking-[0.2em] text-ink-500 uppercase dark:text-ink-400";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY = { name: "", email: "", message: "", company: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please email me directly.");
        setStatus("error");
        return;
      }

      setSentTo(form.email);
      setForm(EMPTY);
      setStatus("success");
    } catch {
      /* Offline, DNS failure, request blocked — the message never left the browser */
      setErrorMessage("Couldn't reach the server. Check your connection, or email me directly.");
      setStatus("error");
    }
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

  const submitting = status === "submitting";

  return (
    <section id="contact" className="relative section-anchor py-28 sm:py-36">
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
                {status === "success" ? (
                  <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-8 sm:p-10">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check size={24} />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
                      Message sent.
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-600 dark:text-ink-300">
                      It landed in my inbox. I&apos;ll reply to{" "}
                      <span className="font-medium text-ink-900 dark:text-white">{sentTo}</span>{" "}
                      within 24 hours. If you don&apos;t hear back, check your spam folder.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="relative rounded-2xl border border-ink-900/10 bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]"
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
                          maxLength={100}
                          autoComplete="name"
                          disabled={submitting}
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
                          maxLength={254}
                          autoComplete="email"
                          disabled={submitting}
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
                        minLength={10}
                        maxLength={5000}
                        disabled={submitting}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about the role, the product, or the problem you're solving."
                        className={`${FIELD} resize-y`}
                      />
                    </div>

                    {/* Honeypot — off-screen rather than display:none, which some bots skip */}
                    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="company">Company (leave this empty)</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-600 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send message
                        </>
                      )}
                    </button>

                    <p aria-live="polite" className="mt-4">
                      {status === "error" ? (
                        <span className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                          <AlertCircle size={16} className="mt-0.5 shrink-0" />
                          {errorMessage}
                        </span>
                      ) : (
                        <span className="text-sm text-ink-500 dark:text-ink-400">
                          Goes straight to my inbox. No email app needed.
                        </span>
                      )}
                    </p>
                  </form>
                )}
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
                    {personalInfo.timezone}), and happy to overlap with North American hours.
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
