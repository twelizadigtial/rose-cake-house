import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currencyCode: string = "LKR") {
  const formatted = new Intl.NumberFormat("en-LK", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `Rs. ${formatted}`;
}
