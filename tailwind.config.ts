import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
