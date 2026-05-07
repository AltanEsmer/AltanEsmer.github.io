import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}', './mdx-components.tsx'],
  theme: {
    extend: {
      colors: {
        // Semantic AlesSystems palette
        bg: '#0A0E27',
        'bg-2': '#0d1230',
        surface: '#1A1B3A',
        'surface-2': '#232450',
        line: '#2a2c5a',
        text: '#E8EAF6',
        muted: '#9aa0d4',
        dim: '#6e75a8',
        blue: '#3B82F6',
        violet: '#8B5CF6',
        teal: '#14B8A6',
        magenta: '#EC4899',
        green: '#10B981',
        amber: '#F59E0B',
        red: '#EF4444',

        // Legacy aliases — still used by Nav.tsx, etc.
        'accent-blue': '#3B82F6',
        'accent-purple': '#8B5CF6',
        'accent-teal': '#14B8A6',
        highlight: '#EC4899',
        'port-text': '#E8EAF6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        iri: 'iri 8s linear infinite',
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59,130,246,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(139,92,246,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        iri: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '300% 50%' },
        },
        pulse: { '50%': { opacity: '0.5' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grad-iri':
          'linear-gradient(120deg, #3B82F6, #8B5CF6, #EC4899, #14B8A6, #3B82F6)',
        'grad-soft':
          'linear-gradient(120deg, rgba(59,130,246,.18), rgba(139,92,246,.18), rgba(20,184,166,.18))',
        grad: 'linear-gradient(120deg, #3B82F6 0%, #8B5CF6 50%, #14B8A6 100%)',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
