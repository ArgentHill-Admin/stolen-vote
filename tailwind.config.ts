import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        parchment: '#F0EFEB',
        ink:       '#1C1C1C',
        crimson:   '#9F2236',
        steel:     '#495772',
        'gray-rule':  '#D5D5D7',
        'gray-meta':  '#646667',
      },
    },
  },
  plugins: [],
}

export default config
