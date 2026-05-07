export type ChipVariant = 'fe' | 'be' | 'de' | 'ds';
export type FilterTag = 'fe' | 'be' | 'ds' | 'oss';

export interface BentoProject {
  num: string;
  title: string;
  description: string;
  stack: { label: string; variant: ChipVariant }[];
  tags: FilterTag[];
  preview:
    | 'pv-grad-1'
    | 'pv-grad-2'
    | 'pv-grad-3'
    | 'pv-grad-4'
    | 'pv-grad-5'
    | 'pv-grad-6'
    | 'pv-grad-7';
  span: 'c-2x2' | 'c-2x1' | 'c-1x1' | 'c-1x2';
  href: string;
  featured?: boolean;
  live?: {
    stats: { value: string; label: string; up?: boolean }[];
    deployUrl: string;
    deployedAgo: string;
  };
}

export const PROJECTS: BentoProject[] = [
  {
    num: '01',
    title: 'ales-trading — CS2 Trading Intelligence',
    description:
      'Real-time intelligence platform for CS2 in-game item trading. Statistical signal generation and PnL tracking.',
    stack: [
      { label: 'TypeScript', variant: 'fe' },
      { label: 'Python', variant: 'be' },
      { label: 'Postgres', variant: 'be' },
    ],
    tags: ['fe', 'ds'],
    preview: 'pv-grad-3',
    span: 'c-2x2',
    href: '#',
    featured: true,
    live: {
      stats: [
        { value: '42.8k', label: 'DAU', up: true },
        { value: '99.97', label: 'uptime %', up: true },
        { value: '128ms', label: 'p95 latency' },
      ],
      deployUrl: 'ales-trading.dev/dashboard',
      deployedAgo: '2m ago',
    },
  },
  {
    num: '02',
    title: 'Event-Management-System',
    description:
      'Multi-tenant event platform with check-in flows and real-time attendance.',
    stack: [
      { label: 'Node', variant: 'be' },
      { label: 'TypeScript', variant: 'fe' },
      { label: 'Postgres', variant: 'be' },
    ],
    tags: ['be'],
    preview: 'pv-grad-1',
    span: 'c-2x1',
    href: '#',
  },
  {
    num: '03',
    title: 'tutoria-mobile-app',
    description:
      'React Native app helping children with dyslexia via phygital interactions.',
    stack: [
      { label: 'ReactNative', variant: 'fe' },
      { label: 'TypeScript', variant: 'fe' },
    ],
    tags: ['fe', 'oss'],
    preview: 'pv-grad-2',
    span: 'c-1x1',
    href: '#',
  },
  {
    num: '04',
    title: 'EsmerMarketWebsite',
    description:
      'B2B catalog and accounting front-end for a regional market chain.',
    stack: [
      { label: 'Next.js', variant: 'fe' },
      { label: 'Tailwind', variant: 'ds' },
    ],
    tags: ['ds'],
    preview: 'pv-grad-4',
    span: 'c-1x1',
    href: '#',
  },
  {
    num: '05',
    title: 'KMP-Weather-App',
    description:
      'Kotlin Multiplatform weather app — Room, Koin, Ktor, single-codebase Android/iOS.',
    stack: [
      { label: 'Kotlin', variant: 'be' },
      { label: 'KMP', variant: 'be' },
      { label: 'Compose', variant: 'fe' },
    ],
    tags: ['fe', 'be'],
    preview: 'pv-grad-6',
    span: 'c-2x1',
    href: '#',
  },
  {
    num: '06',
    title: 'autonomous-collector',
    description:
      'Headless data collector for trade platforms — async pipelines + dedupe.',
    stack: [{ label: 'Python', variant: 'be' }],
    tags: ['oss'],
    preview: 'pv-grad-5',
    span: 'c-1x1',
    href: '#',
  },
  {
    num: '07',
    title: 'System-Health-Dashboard',
    description:
      'Real-time desktop monitor for CPU/mem/disk/network with historical trends.',
    stack: [
      { label: 'C#', variant: 'be' },
      { label: 'WPF', variant: 'fe' },
    ],
    tags: ['ds', 'fe'],
    preview: 'pv-grad-7',
    span: 'c-1x1',
    href: '#',
  },
  {
    num: '08',
    title: 'Link-Safety-Checker',
    description: 'URL safety analyzer — pattern + heuristic risk scoring.',
    stack: [
      { label: 'Python', variant: 'be' },
      { label: 'security', variant: 'be' },
    ],
    tags: ['be', 'oss'],
    preview: 'pv-grad-1',
    span: 'c-1x1',
    href: '#',
  },
  {
    num: '09',
    title: 'gym-progress-app',
    description:
      'Progress tracker for gym rats — sets, reps, plate maths, weekly trend.',
    stack: [
      { label: 'TypeScript', variant: 'fe' },
      { label: 'React', variant: 'fe' },
    ],
    tags: ['fe'],
    preview: 'pv-grad-3',
    span: 'c-1x1',
    href: '#',
  },
];
