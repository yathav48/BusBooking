// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#ea2a33",
//         "background-light": "#f8f6f6",
//         "background-dark": "#211111",
//       },
//       fontFamily: {
//         display: ["Plus Jakarta Sans", "sans-serif"],
//       },
//     }
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/react-day-picker/dist/**/*.css",
  ],
  theme: {
    extend: {
      color: {
            primary: "#000"
    }
  },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}

