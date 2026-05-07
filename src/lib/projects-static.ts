// src/lib/projects-static.ts
//
// Bento data for the homepage projects section. Pulls real repo
// metadata (description, URL) from src/lib/projects.generated.json
// and overlays a hand-curated bento layout (span / preview gradient /
// chip variants / featured live preview).
//
// Re-run `node scripts/fetch-projects.mjs` whenever the upstream
// repo set changes — the JSON is committed so the static export
// stays offline-clean.

import generated from './projects.generated.json';

export type ChipVariant = 'fe' | 'be' | 'de' | 'ds';
export type FilterTag = 'fe' | 'be' | 'ds' | 'oss';
export type Preview =
  | 'pv-grad-1'
  | 'pv-grad-2'
  | 'pv-grad-3'
  | 'pv-grad-4'
  | 'pv-grad-5'
  | 'pv-grad-6'
  | 'pv-grad-7';
export type Span = 'c-2x2' | 'c-2x1' | 'c-1x1' | 'c-1x2';

export interface BentoProject {
  num: string;
  title: string;
  description: string;
  stack: { label: string; variant: ChipVariant }[];
  tags: FilterTag[];
  preview: Preview;
  span: Span;
  href: string;
  featured?: boolean;
  live?: {
    stats: { value: string; label: string; up?: boolean }[];
    deployUrl: string;
    deployedAgo: string;
  };
}

interface GeneratedRepo {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  topics: string[];
  stars: number;
  url: string;
  homepageUrl: string | null;
  pushedAt: string;
  createdAt: string;
}

const REPOS: Record<string, GeneratedRepo> = Object.fromEntries(
  (generated.repos as GeneratedRepo[]).map((r) => [r.fullName, r]),
);

function repo(fullName: string): GeneratedRepo {
  const r = REPOS[fullName];
  if (!r) {
    // Build-time guard: if a curated repo disappears upstream, fail loudly.
    throw new Error(
      `[projects-static] missing repo "${fullName}" in projects.generated.json — re-run scripts/fetch-projects.mjs`,
    );
  }
  return r;
}

// ── Curation ───────────────────────────────────────────────────────
// Order here = render order in the bento. Override only the visual
// + tagging metadata; title / description / href come from real data.
interface Curation {
  num: string;
  fullName: string;
  titleOverride?: string; // optional friendlier display title
  descriptionOverride?: string;
  span: Span;
  preview: Preview;
  tags: FilterTag[];
  stack: { label: string; variant: ChipVariant }[];
  featured?: boolean;
  live?: BentoProject['live'];
}

const CURATION: Curation[] = [
  {
    num: '01',
    fullName: 'AlesSystems/System-Health-Dashboard',
    titleOverride: 'System Health Dashboard',
    descriptionOverride:
      'Real-time desktop monitor for CPU, memory, disk, and network with historical trends and alerting.',
    span: 'c-2x2',
    preview: 'pv-grad-3',
    tags: ['fe', 'ds'],
    stack: [
      { label: 'C#', variant: 'be' },
      { label: 'WPF', variant: 'fe' },
      { label: '.NET', variant: 'be' },
    ],
    featured: true,
    live: {
      stats: [
        { value: '23%', label: 'CPU', up: true },
        { value: '4.1G', label: 'MEM' },
        { value: '128ms', label: 'I/O p95' },
      ],
      deployUrl: 'localhost:5173/dashboard',
      deployedAgo: 'live',
    },
  },
  {
    num: '02',
    fullName: 'AltanEsmer/tutoria-mobile-app',
    titleOverride: 'Tutoria — phygital learning for dyslexia',
    descriptionOverride:
      'React Native app helping children with dyslexia through phygital (physical + digital) interactions.',
    span: 'c-2x1',
    preview: 'pv-grad-1',
    tags: ['fe', 'ds'],
    stack: [
      { label: 'React Native', variant: 'fe' },
      { label: 'TypeScript', variant: 'fe' },
      { label: 'a11y', variant: 'ds' },
    ],
  },
  {
    num: '03',
    fullName: 'AltanEsmer/KMP-Weather-App',
    titleOverride: 'KMP Weather',
    descriptionOverride:
      'Kotlin Multiplatform weather app — Room, Koin, Ktor, single codebase for Android and iOS.',
    span: 'c-1x1',
    preview: 'pv-grad-2',
    tags: ['fe'],
    stack: [
      { label: 'Kotlin', variant: 'be' },
      { label: 'KMP', variant: 'be' },
    ],
  },
  {
    num: '04',
    fullName: 'AlesSystems/Link-Safety-Checker-URL-Security-Analyzer',
    titleOverride: 'Link Safety Checker',
    descriptionOverride:
      'URL safety analyzer — pattern + heuristic risk scoring for suspicious links.',
    span: 'c-1x1',
    preview: 'pv-grad-4',
    tags: ['be', 'oss'],
    stack: [
      { label: 'Python', variant: 'be' },
      { label: 'security', variant: 'be' },
    ],
  },
  {
    num: '05',
    fullName: 'AlesSystems/gym-progress-app',
    titleOverride: 'gym-progress',
    descriptionOverride:
      'Progress tracker for gym rats — sets, reps, plate maths, weekly trend.',
    span: 'c-2x1',
    preview: 'pv-grad-6',
    tags: ['fe'],
    stack: [
      { label: 'TypeScript', variant: 'fe' },
      { label: 'React', variant: 'fe' },
    ],
  },
  {
    num: '06',
    fullName: 'AltanEsmer/To-Do-App',
    titleOverride: 'To-Do',
    descriptionOverride: 'Compact React + TypeScript to-do app — local-first, fast, no fluff.',
    span: 'c-1x1',
    preview: 'pv-grad-5',
    tags: ['fe'],
    stack: [
      { label: 'TypeScript', variant: 'fe' },
      { label: 'React', variant: 'fe' },
    ],
  },
  {
    num: '07',
    fullName: 'AltanEsmer/LocationSaverApp',
    titleOverride: 'LocationSaver',
    descriptionOverride: 'Kotlin Android app to drop and label location pins for a small business.',
    span: 'c-1x1',
    preview: 'pv-grad-7',
    tags: ['fe'],
    stack: [
      { label: 'Kotlin', variant: 'be' },
      { label: 'Android', variant: 'fe' },
    ],
  },
  {
    num: '08',
    fullName: 'AltanEsmer/Web-Technologies',
    titleOverride: 'Music Library',
    descriptionOverride:
      'Music library website built for an SDU web-tech course — PHP backend, classic LAMP stack.',
    span: 'c-1x1',
    preview: 'pv-grad-1',
    tags: ['fe', 'be'],
    stack: [
      { label: 'PHP', variant: 'be' },
      { label: 'MySQL', variant: 'be' },
    ],
  },
  {
    num: '09',
    fullName: 'AlesSystems/assault-cube-reversed',
    titleOverride: 'AssaultCube · reversed',
    descriptionOverride:
      'Reverse-engineering guide and notes for low-level systems exploration.',
    span: 'c-1x1',
    preview: 'pv-grad-3',
    tags: ['be', 'oss'],
    stack: [
      { label: 'C++', variant: 'be' },
      { label: 'low-level', variant: 'be' },
    ],
  },
];

export const PROJECTS: BentoProject[] = CURATION.map((c) => {
  const r = repo(c.fullName);
  return {
    num: c.num,
    title: c.titleOverride ?? r.name,
    description: c.descriptionOverride ?? r.description,
    stack: c.stack,
    tags: c.tags,
    preview: c.preview,
    span: c.span,
    href: r.homepageUrl ?? r.url,
    featured: c.featured,
    live: c.live,
  };
});
