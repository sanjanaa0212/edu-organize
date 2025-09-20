import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    currency: "INR",
    maximumFractionDigits: 1,
  }).format(n);
}

export function formatPrice(price?: number): string {
  if (price) {
    return `₹${formatNumber(price / 100)}`;
  }
  return `0`;
}

export function throwError(error: unknown, message?: string): never {
  const errorMessage = error instanceof Error ? error.message : (message ?? "❌ An unexpected error occurred");
  throw new Error(errorMessage);
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function obscredEmail(email: string) {
  const [username, domain] = email.split("@");
  const obscredUsername = username && username.slice(0, 2) + "*".repeat(username.length - 2);
  return `${obscredUsername}@${domain}`;
}

export function getUsernameFromEmail(email: string) {
  // Split by common delimiters: `.`, `_`, `-`
  const username = email?.split("@")[0];
  const nameParts = username?.split(/[\._\-]/); // regex to split on dot, underscore, or hyphen

  // Fallback if nameParts is empty or malformed
  if (nameParts?.length && nameParts?.[0]?.length) {
    // Capitalize each segment (e.g., john.doe -> John Doe)
    const formattedName = nameParts?.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
    return formattedName;
  }

  return "";
}
