/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '82p': '81%',
      },
      screens:{
        ssm:"681px",
        slg:"915px",
      },
      colors:{
        "blue-sidebar":"#0E2E39",
        "blue-header":"#081B22",
        "dark-yellow":"#D4B258",
        "arrow-yellow":"#EBC351",
        "body-brown":"#1A1A1A",
        "card-header":"#1B5266"
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
}
