import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0b1220', 800: '#101827', 700: '#172133', 900: '#0b1220', 950: '#070c16' },
        paper: '#f5f1ea',
        brass: { DEFAULT: '#d3a15f', light: '#ecc58f', dark: '#a8783c' },
        slate: { DEFAULT: '#dfe7ef' },
        muted: '#b0becb',
        horizon: '#0b1d2d',
        accent: '#d9a95f',
        success: '#78c4a0',
        warning: '#f9b15d',
        danger: '#e76f6a',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(4, 8, 16, 0.35)',
        lift: '0 18px 32px rgba(11, 18, 32, 0.13)',
        glow: '0 0 0 1px rgba(211,161,95,0.25), 0 20px 50px -10px rgba(211,161,95,0.35)',
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
