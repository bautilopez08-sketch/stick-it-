import { clsx, type ClassValue } from "clsx";

import { fontOptions } from "@/lib/data";
import { FontKey } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getFontFamily(font: FontKey) {
  return fontOptions.find((option) => option.key === font)?.family ?? "var(--font-space-grotesk)";
}
