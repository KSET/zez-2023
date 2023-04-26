export type ClassValue = string | boolean | null | undefined;

export const cn = (...classes: (ClassValue | ClassValue[])[]) =>
  classes.flat().filter(Boolean).join(" ") || undefined;
