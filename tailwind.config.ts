import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        honey: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f6c342',
          500: '#e8a820',
          600: '#d97706',
          700: '#b45309',
        },
        sand: {
          50: '#fdfaf5',
          100: '#f9f3e8',
          200: '#f0e6d0',
          300: '#e3d0b5',
          400: '#c9b08a',
        },
        stone: {
          warm: '#8b7355',
        },
        // Text
        ink: {
          DEFAULT: '#1a1714',
          muted: '#6b6560',
          light: '#9b9490',
        },
      },
      fontFamily: {
        sans: ['Evolventa', 'system-ui', 'sans-serif'],
        display: ['Evolventa', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(0,0,0,0.06)',
        card: '0 4px 30px rgba(0,0,0,0.08)',
        warm: '0 8px 40px rgba(232, 168, 32, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
}

export default config
