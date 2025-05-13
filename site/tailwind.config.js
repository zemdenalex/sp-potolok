/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xxs': '512px',
        'xs': '588px',
      },
      gridTemplateColumns: {
        '3/2': '3fr, 2fr',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(#092363, #0F3DAC)'
      },
      colors: {
        primary: "#1C1C1C",
        secondary: "#0F3DAC",
        main: "#092363",
        gradient: "#0F3DAC",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '3rem',
          sm: '5rem',
        }
      },
      boxShadow: {
        'xl': '0 4px 24px rgba(0, 0, 0, 0.15)',
        '2xl': '0 4px 24px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

