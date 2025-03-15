/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // SOLUCIÓN PARA CLASES DINAMICAS????
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-violet-500",
    "bg-cyan-500",
    // Agrega aquí todas las clases que podrías usar dinámicamente
  ],
};
