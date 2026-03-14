/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        accent: '#00ff9d',
        'accent-2': '#ff6b35',
        'bg': '#0a0a0f',
        'bg-2': '#111118',
        'bg-3': '#1a1a24',
        border: 'rgba(255,255,255,0.07)',
        text: '#e8e8f0',
        muted: '#6b6b80',
        // Phase colors
        'phase-1': '#00ff9d',
        'phase-2': '#00ccff',
        'phase-3': '#ffbe00',
        'phase-4': '#b855ff',
        'phase-5': '#ff6b35',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundColor: {
        DEFAULT: '#0a0a0f',
      },
      textColor: {
        DEFAULT: '#e8e8f0',
      },
    },
  },
  plugins: [],
}
