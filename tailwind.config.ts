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
      colors: {
        green: "#00CC00",
        orange: "#F47920",
        pink: "#FF3399",
        purple: "#A010FD",
        blue: "#001CCE",
        "off-black": "#322F31",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: false,
    base: false,
    logs: false,
  },
} satisfies Config;
