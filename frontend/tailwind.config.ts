import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lake: '#0F3B4A', deep: '#0A2733', glacier: '#DCEBEF', snow: '#F5F9FA',
        crocus: '#6B4FA0', saffron: '#D9A441', ink: '#12232B', mist: '#5C7480',
      },
      fontFamily: { display: ['var(--font-display)', 'system-ui', 'sans-serif'], body: ['var(--font-body)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
