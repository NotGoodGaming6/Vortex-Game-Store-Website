/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#0f111a', // Arxa fon tünd rəng
        brandPurple: '#6366f1', // Düymə rəngi
      },
    },
  },
  plugins: [],
}