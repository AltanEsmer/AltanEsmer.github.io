import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}', './mdx-components.tsx'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: '#faf8f4',
        surface: '#ffffff',
        placeholder: '#f3efe7',

        // Text
        ink: '#1c1a17',
        prose: '#3f3b35',
        secondary: '#57534e',
        muted: '#8a8377',
        faint: '#a8a195',

        // Borders & dividers
        border: '#e9e4da',
        'border-strong': '#ddd6c9',
        'border-light': '#ece7dd',
        divider: '#f0ece3',
        'divider-2': '#f6f3ec',

        // Accents
        blue: '#2563eb',
        'blue-hover': '#1d4ed8',
        amber: '#d97706',
        'amber-code': '#b45309',
        green: '#16a34a',
        red: '#dc2626',

        // Tints
        'tag-bg': '#f6f3ec',
        'code-bg': '#f5f2ea',
        'code-ink': '#2b2823',
        'code-inline-bg': '#f0ece3',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(28,26,23,.04)',
        card: '0 1px 2px rgba(28,26,23,.04)',
        'card-hover': '0 20px 40px -24px rgba(28,26,23,.3)',
        hero: '0 1px 2px rgba(28,26,23,.04), 0 16px 36px -22px rgba(28,26,23,.22)',
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [],
};

export default config;
