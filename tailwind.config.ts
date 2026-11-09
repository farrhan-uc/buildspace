import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#f8f5f0',
        brass: '#b77d35',
        slate: '#dfe7ef',
        horizon: '#0b1d2d',
        accent: '#d9a95f',
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        blueprint: 'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
