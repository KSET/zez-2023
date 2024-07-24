import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue } from "clsx";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
const rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
const fcssescape = (ch: string, asCodePoint: boolean) => {
  if (asCodePoint) {
    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
    if (ch === "\0") {
      return "\uFFFD";
    }

    // Control characters and (dependent upon position) numbers get escaped as code points
    return `${ch.slice(0, -1)}\\${ch.charCodeAt(ch.length - 1).toString(16)} `;
  }

  // Other potentially-special ASCII characters get backslash-escaped
  return `\\${ch}`;
};
export const escapeSelector = (selector: string) =>
  selector.replace(rcssescape, fcssescape);
