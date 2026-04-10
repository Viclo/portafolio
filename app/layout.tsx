import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ivan Martinez — Full Stack Developer & Tech Lead",
  description:
    "Full Stack Developer & Tech Lead with 4+ years building production-grade SaaS platforms using React, Node.js, NestJS, and Next.js.",
  keywords: ["Full Stack Developer", "Tech Lead", "React", "NestJS", "Next.js", "Bolivia", "Remote"],
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
      <body className={`${geist.variable} antialiased bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
