import daisyui from "daisyui";
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-family-display)"],
      },
      container: {
        center: true,
        padding: "3rem",
      },
      screens: {
        br: "1024px",
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
