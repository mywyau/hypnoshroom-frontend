import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#242620',
        paper: '#f5f2ea',
        moss: '#315948',
        plum: '#65506d',
        clay: '#9a684e',
        line: '#d8d3c7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(36, 38, 32, 0.08)',
      },
    },
  },
}
