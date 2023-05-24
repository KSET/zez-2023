import daisyui from "daisyui";
import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
  plugins: [
    daisyui,
    plugin((api) => {
      api.addVariant("pointer-coarse", "@media (pointer: coarse)");
      api.addVariant("pointer-fine", "@media (pointer: fine)");
      api.addVariant("pointer-none", "@media (pointer: none)");
      api.addVariant("hover-hover", "@media (hover: hover)");
      api.addVariant("hover-none", "@media (hover: none)");
    }),
  ],

  daisyui: {
    themes: false,
    base: false,
    logs: false,
  },
} satisfies Config;
