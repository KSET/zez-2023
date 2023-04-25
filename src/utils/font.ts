import { Calistoga } from "next/font/google";

export const fontDisplay = Calistoga({
  subsets: ["latin-ext"],
  weight: ["400"],
  fallback: [
    "ui-serif",
    "Georgia",
    "Cambria",
    '"Times New Roman"',
    "Times",
    "serif",
  ],
  variable: "--font-family-ui",
});
