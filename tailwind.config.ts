import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#f7f1e6', 800: '#fffaf1', 700: '#efe5d4', 900: '#f7f1e6', 950: '#e9deca' },
        paper: '#30291f',
        brass: { DEFAULT: '#a96f35', light: '#c28b50', dark: '#865323' },
        slate: { DEFAULT: '#473d31', 100: '#473d31', 200: '#554938', 300: '#665844', 400: '#786b59', 500: '#8a7a65', 600: '#a3937d', 700: '#c1b49e', 800: '#ded3c1', 900: '#efe5d4', 950: '#f7f1e6' },
        muted: '#786b59',
        horizon: '#e9deca',
        accent: '#a96f35',
        success: '#34775a',
        warning: '#f9b15d',
        danger: '#e76f6a',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(91, 67, 37, 0.12)',
        lift: '0 18px 32px rgba(91, 67, 37, 0.09)',
        glow: '0 0 0 1px rgba(194,139,80,0.28), 0 20px 50px -10px rgba(194,139,80,0.24)',
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
