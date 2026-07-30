import type { Config } from "tailwindcss";

// Paleta da marca Simple Acc (ver clientes/0-interno-simpleacc-inova/marca/brandbook.html):
// navy domina, branco abre respiro, azul aço só pontua.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A1626",
        "navy-2": "#122B4A",
        aco: "#3E5C8A",
        "aco-claro": "#8197B6",
        gelo: "#EEF3FA",
      },
    },
  },
  plugins: [],
};

export default config;
