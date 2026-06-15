export const personalInfo = {
  name: "Ivan Martinez",
  title: "Full Stack Developer",
  tagline:
    "4+ years building production-grade SaaS platforms. Specialized in scalable backend systems, complex third-party API integrations, and full infrastructure ownership — from database design to cloud deployment.",
  location: "Cochabamba, Bolivia",
  availability: "Open to remote opportunities",
  email: "ivangra85@gmail.com",
  github: "https://github.com/Viclo",
  linkedin: "https://linkedin.com/in/ivan-martinez-fullstack",
};

export const stats = [
  { value: "4+", label: "Years of Experience" },
  { value: "4", label: "Companies" },
  { value: "1", label: "Tech Lead Role" },
  { value: "2", label: "Countries Served" },
];

export const experience = [
  {
    company: "Redlizard Studioz Inc.",
    location: "Canada (Remote)",
    role: "Tech Lead & Full Stack Developer",
    period: "Sep 2025 – Present",
    current: true,
    achievements: [
      "Promoted to Tech Lead after 3 months; led full architecture of a multi-tenant SaaS for document and compliance management in heavy transport, built from scratch with subdomain-based tenant isolation via Cloudflare.",
      "Engineered dynamic Stripe billing engine: tier-based pricing algorithm driven by active/new/archived driver counts, T+3 invoice scheduling, payment method management, and DB invoice snapshots.",
      "Implemented async notification pipeline (Twilio SMS + Postmark email) with Redis-backed queues and retry logic; led legacy data migration from monolithic to modular schema.",
    ],
    stack: [
      "React",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "Stripe",
      "Twilio",
      "Postmark",
      "Keycloak",
      "Cloudflare",
      "Docker",
      "Linux",
      "CI/CD",
    ],
  },
  {
    company: "Nacer Digital",
    location: "Mexico (Remote)",
    role: "Full Stack Developer",
    period: "Feb 2025 – Jan 2026",
    current: false,
    achievements: [
      "Built real-time persistent chat (Firestore) with full conversation continuity across workflow stages (bid → contract → active work) on a multi-role freelance marketplace; designed a multi-role rating system with star-distribution chart.",
      "Replicated full AWS production environment for staging from scratch: Amplify (frontend), Elastic Beanstalk (backend), RDS, SSL certificates, and DNS routing.",
      "Implemented event-sourcing table pattern as a domain-agnostic action queue; developed dispute resolution flows, milestones, time logs, and service provider profiles.",
    ],
    stack: [
      "React",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "BullMQ",
      "Firestore",
      "Stripe",
      "AWS",
      "Docker",
      "Bitbucket Pipelines",
      "CI/CD",
    ],
  },
  {
    company: "Iventiva",
    location: "Cochabamba, Bolivia · Client: Alberta, Canada",
    role: "Software Engineer",
    period: "Apr 2023 – Feb 2025",
    current: false,
    achievements: [
      "Designed automated email notification pipeline: 3 flows × 3 retries = up to 9 scheduled emails per user, covering identity verification, bank authentication, and mortgage assessment for a cross-border real estate SaaS.",
      "Reduced a critical DB query from 28s → 3.5s (~87% improvement) via schema redesign, N+1 ORM elimination, and materialized views on a Ruby on Rails application.",
      "Integrated third-party services for identity verification, bank data validation, and creditworthiness evaluation; managed Heroku deployments and production incident response.",
    ],
    stack: [
      "React",
      "Next.js",
      "Gatsby",
      "NestJS",
      "GraphQL",
      "PostgreSQL",
      "Sequelize",
      "Ruby on Rails",
      "Heroku",
    ],
  },
  {
    company: "Fundación Jala",
    location: "Cochabamba, Bolivia",
    role: "Full Stack Developer, Intern",
    period: "Jan 2022 – Jan 2023",
    current: false,
    achievements: [
      "Built full-stack features across internal projects applying SOLID principles, design patterns, and clean architecture in Agile/Scrum teams.",
    ],
    stack: [
      "JavaScript",
      "React",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "GitLab CI/CD",
    ],
  },
];

export const skills: Record<string, string[]> = {
  Frontend: [
    "React",
    "Next.js",
    "Gatsby",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS",
  ],
  Backend: ["Node.js", "NestJS", "GraphQL", "REST APIs", "Ruby on Rails"],
  Databases: ["PostgreSQL", "Redis", "Prisma ORM", "TypeORM", "Sequelize"],
  "DevOps & Cloud": [
    "AWS",
    "Docker",
    "Linux",
    "pm2",
    "Heroku",
    "CI/CD",
    "Bitbucket Pipelines",
    "Cloudflare",
  ],
  Integrations: [
    "Stripe",
    "Twilio",
    "Postmark",
    "Keycloak",
    "Firestore",
    "BullMQ",
    "Google OAuth",
  ],
};

export const projects = [
  {
    name: "ComplyDQ",
    url: "https://my.complydq.com",
    description:
      "Document management SaaS for heavy transport companies built from scratch. Multi-tenant architecture with per-company subdomain isolation via Cloudflare, a dynamic Stripe billing engine with tier-based driver-count pricing and 3-day deferred scheduling, and a Twilio/Postmark notification pipeline queued via Redis. Deployed on a bare Linux server with pm2 and Keycloak for identity management.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Redis", "Cloudflare"],
    company: "Redlizard Studioz Inc.",
    accent: "blue" as const,
  },
  {
    name: "ProtoCall",
    url: "https://protocall.pro",
    description:
      "Freelance marketplace where companies and individuals post projects and freelancers apply to them. Supports multi-role workflows, real-time persistent chat, milestones, time logs, and dispute resolution with an admin decision panel. The rating system mirrors Upwork's model: star distribution, weighted average, and last-5-reviews. Deployed on a self-hosted server via a CI/CD pipeline.",
    stack: ["Next.js", "NestJS", "Firestore", "PostgreSQL", "Stripe", "AWS"],
    company: "Nacer Digital",
    accent: "violet" as const,
  },
  {
    name: "ManoTécnica",
    url: "https://www.manotecnica.com",
    description:
      "SaaS platform that field-service companies (plumbers, electricians, masons, and similar trades) subscribe to for managing their technicians. Features a Google Calendar-style scheduler visible to both technicians and company admins, real-time GPS tracking via Google Maps, and media uploads for work verification. Payments are handled through Stripe with country-specific product configurations. Full AWS staging environment set up from scratch: Amplify, Elastic Beanstalk, RDS, SSL, and DNS routing.",
    stack: ["React", "NestJS", "GraphQL", "PostgreSQL", "Heroku"],
    company: "Iventiva",
    accent: "emerald" as const,
  },
  {
    name: "Ownly",
    url: "https://www.ownly.re",
    description:
      "Real estate SaaS built for the Canadian and US markets, where agencies list land and buyers can design their future home through an interactive, Minecraft-style house builder. It integrates third-party services for identity verification (US/CA providers), bank authentication, and mortgage capacity evaluation, supported by an automated multi-stage email pipeline and significant DB query optimizations.",
    stack: ["React", "Next.js", "Ruby on Rails", "PostgreSQL", "Sequelize"],
    company: "Iventiva",
    accent: "amber" as const,
  },
];

export const education = {
  institution: "Universidad Mayor de San Simón",
  location: "Cochabamba, Bolivia",
  degree: "Bachelor's Degree",
  field: "Computer Science / Informatics Engineering",
  period: "2017 – 2022",
};
