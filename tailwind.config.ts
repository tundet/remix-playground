import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@remix-run/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#eef2c0',
        'green': '#34bab7'
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
