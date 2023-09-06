/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  safelist: [
    {
      pattern:
        /(alert|btn|text|ring|badge)-(primary|secondary|neutral|error|success|warning|info)/
    },
    {
      pattern: /(btn|badge|loading)-(lg|sm|xs)/
    },
    'w-[40px]',
    'w-[60px]',
    'w-[80px]',
    'w-[100px]'
  ],
  daisyui: {
    themes: ['corporate', 'night'],
    darkTheme: 'night'
  }
}
