import type { Metadata, Viewport } from "next";
import { Geist, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

/* Display face — carries the personality the page was missing */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

/* Mono is reserved for metadata: section indices, dates, stack tags */
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Full Stack Developer & Tech Lead with 4+ years building production-grade SaaS platforms, covering multi-tenant architecture, billing engines, and cloud infrastructure with React, Next.js, NestJS and PostgreSQL.";

export const metadata: Metadata = {
  title: {
    default: "Ivan Martinez | Full Stack Developer & Tech Lead",
    template: "%s | Ivan Martinez",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Full Stack Developer",
    "Tech Lead",
    "React",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "Bolivia",
    "Remote",
  ],
  authors: [{ name: "Ivan Martinez" }],
  creator: "Ivan Martinez",
  openGraph: {
    type: "profile",
    locale: "en_US",
    title: "Ivan Martinez | Full Stack Developer & Tech Lead",
    description: SITE_DESCRIPTION,
    siteName: "Ivan Martinez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Martinez | Full Stack Developer & Tech Lead",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#070915" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${display.variable} ${mono.variable} antialiased bg-paper dark:bg-ink-950 text-ink-700 dark:text-ink-200 selection:bg-brand-500 selection:text-white`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
