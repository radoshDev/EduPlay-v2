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
        /(alert|btn|text|ring|badge|checkbox)-(primary|secondary|neutral|error|success|warning|info)/
    },
    {
      pattern: /(btn|badge|loading)-(lg|sm|xs)/
    },
    {
      pattern: /!?(object)-(cover|fill|contain|none|scale-down)/
    },
    'w-[40px]',
    'w-[60px]',
    'w-[80px]',
    'w-[100px]'
  ],
  daisyui: {
    themes: [
      'light',
      'night',
      {
        custom: {
          primary: '#93c5fd',
          secondary: '#e879f9',
          accent: '#a78bfa',
          neutral: '#120c12',
          'base-100': '#dcfce7',
          info: '#a5f3fc',
          success: '#34d399',
          warning: '#ffd261',
          error: '#fc9783'
        }
      }
    ],
    darkTheme: 'night'
  }
}
