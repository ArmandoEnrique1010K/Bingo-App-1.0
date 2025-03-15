/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // INVESTIGAR ESTO: SOLUCIÓN PARA CLASES DINAMICAS????
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-violet-500",
    "bg-cyan-500",

    "bg-violet-600",
    "bg-blue-600",
    "bg-blue-700",

    "text-blue-500",
    "text-violet-500",
    "text-green-500",
    "text-yellow-500",
    "text-orange-500",
    "text-red-500",

    // Agrega aquí todas las clases que podrías usar dinámicamente
  ],
};
